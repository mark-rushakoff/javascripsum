describe("Javascripsum.Util.Generator", function() {
    var generator, model;
    beforeEach(function() {
        model = new Javascripsum.Models.PhraseList();
        generator = new Javascripsum.Util.Generator(model);
    });

    it("initializes with a model", function() {
        expect(generator.model).toBe(model);
    });

    describe("#sentence", function() {
        beforeEach(function() {
            spyOn(model, "phrases").andReturn([{phrase: "blah"}]);
        });

        it("accepts a parameter for the number of phrases", function() {
            expect(generator.sentence(4)).toEqual("Blah blah blah blah.");
        });

        it("defaults to 3-6 phrases", function() {
            var makeSentence = function() { return generator.sentence().split(" "); };
            var sentenceLengths = _.chain(_.range(100)).map(makeSentence).pluck("length").uniq().sort().value();

            expect(sentenceLengths).toEqual([3, 4, 5, 6]);
        });

        it("will pick random words", function() {
            model.phrases.andReturn([{phrase: "boo"}, {phrase: "hoo"}]);
            var sentence = generator.sentence(50);
            expect(sentence.indexOf("boo")).toBeGreaterThan(3);
            expect(sentence.indexOf("hoo")).toBeGreaterThan(3);
        });
    });

    describe("#paragraph", function() {
        beforeEach(function() {
            spyOn(generator, "sentence").andReturn("Foo bar.");
        });

        it("accepts a length parameter", function() {
            expect(generator.paragraph(2)).toEqual("Foo bar. Foo bar.");
        });

        it("defaults to 2-7 sentences", function() {
            var getSentencesInParagraph = function() {
                return _.compact(generator.paragraph().split("Foo bar.")).length + 1;
            };
            var sentenceLengths = _.chain(_.range(100)).map(getSentencesInParagraph).uniq().sort().value();

            expect(sentenceLengths).toEqual([2, 3, 4, 5, 6, 7]);
        });
    });
});
