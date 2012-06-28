describe("Javascripsum.Views.IpsumView", function() {
    var view, model;
    beforeEach(function() {
        model = new Javascripsum.Models.PhraseList();
        view = new Javascripsum.Views.IpsumView();
    });

    it("renders the given number of paragraphs", function() {
        var counter = 0;
        spyOn(view.generator, "paragraph").andCallFake(function() {
            counter++;
            if (counter === 1) {
                return "Once upon a time...";
            } else if (counter === 2) {
                return "Someone needed filler text...";
            } else {
                return "And they got it."
            }
        });

        view.numParagraphs = 3;
        view.render();

        expect(view.$("p").length).toBe(3);
        expect(view.$("p:eq(0)").text()).toBe("Once upon a time...");
        expect(view.$("p:eq(1)").text()).toBe("Someone needed filler text...");
        expect(view.$("p:eq(2)").text()).toBe("And they got it.");
    });
});
