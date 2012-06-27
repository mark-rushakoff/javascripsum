describe("Javascripsum.Views.GlossaryView", function() {
    var view, model;
    beforeEach(function() {
        model = new Javascripsum.Models.PhraseList();
        view = new Javascripsum.Views.GlossaryView({model: model});
    });

    it("generates a dl with a dd for each item", function() {
        model.set("phrases", [{phrase: "foo"}, {phrase: "bar"}]);
        view.render();
        expect(view.$("dd dl").length).toBe(2);
    });
});
