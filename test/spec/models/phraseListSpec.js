describe("Javascripsum.Models.PhraseList", function() {
    var model;

    beforeEach(function() {
        model = new Javascripsum.Models.PhraseList({id: "fruit"});
    });

    describe("fetching", function() {
        beforeEach(function() {
            model.fetch();
        });

        it("fetches from the right url", function() {
            expect(mostRecentAjaxRequest().url).toBe("topics/fruit.json");
        });

        describe("once the fetch completes", function() {
            beforeEach(function() {
                var response = {
                    phrases: [
                        { phrase: "apple"},
                        { phrase: "banana", definition: 'A slightly radioactive fruit', url: 'http://en.wikipedia.org/wiki/Banana'},
                        { phrase: "cherry", definition: 'A fruit often found in slot machines' },
                        { phrase: "durian", url: 'http://en.wikipedia.org/wiki/Durian' }
                    ],
                    authors: [
                        { name: "Orange Pineapple", url: "http://www.orangepineapple.com" },
                        { name: "Lemon Mango" }
                    ]
                };
                mostRecentAjaxRequest().response({status: 200, responseText: JSON.stringify(response)});
            });

            it("can return the phrases", function() {
                expect(model.phrases()).toEqual([
                    { phrase: "apple"},
                    { phrase: "banana", definition: 'A slightly radioactive fruit', url: 'http://en.wikipedia.org/wiki/Banana'},
                    { phrase: "cherry", definition: 'A fruit often found in slot machines' },
                    { phrase: "durian", url: 'http://en.wikipedia.org/wiki/Durian' }
                ]);
            });

            it("can return the authors", function() {
                expect(model.authors()).toEqual([
                    { name: "Orange Pineapple", url: "http://www.orangepineapple.com" },
                    { name: "Lemon Mango" }
                ]);
            });
        });
    });
});
