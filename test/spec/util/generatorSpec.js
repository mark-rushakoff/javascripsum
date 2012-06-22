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
            spyOn(model, "phrases").andReturn(["blah"]);
        });

        it("accepts a parameter for the number of phrases", function() {
            expect(generator.sentence(4)).toEqual("Blah blah blah blah.");
        });

        it("defaults to a variable number of phrases", function() {
            var sentence = generator.sentence();
            expect(_.string.startsWith(sentence, "Blah ")).toBeTruthy();
            expect(_.string.endsWith(sentence, " blah.")).toBeTruthy();
        });

        it("will pick random words", function() {
            model.phrases.andReturn(["boo", "hoo"]);
            var sentence = generator.sentence(50);
            expect(sentence.indexOf("boo")).toBeGreaterThan(3);
            expect(sentence.indexOf("hoo")).toBeGreaterThan(3);
        });
    });
});
