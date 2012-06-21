describe("Javascripsum.Models.WordList", function() {
    var model;

    beforeEach(function() {
        model = new Javascripsum.Models.WordList({id: "fruit"});
    });

    describe("url", function() {
        it("is relative and contains the topic name", function() {
            expect(model.url()).toBe("topics/fruit.json");
        });
    });
});
