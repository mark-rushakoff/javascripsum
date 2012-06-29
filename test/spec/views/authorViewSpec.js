describe("Javascripsum.Views.AuthorView", function() {
    var view, model;
    beforeEach(function() {
        model = new Javascripsum.Models.PhraseList();
        view = new Javascripsum.Views.AuthorView({model: model});
    });

    describe("#render", function() {
        describe("when there are no listed authors (for some reason)", function() {
            it("adds the empty class to the empty element", function() {
                spyOn(model, "authors").andReturn([]);
                view.render();
                expect(view.$el).toBeEmpty();
                expect(view.$el).toHaveClass("empty");
            });
        });

        describe("when there are authors", function() {
            beforeEach(function() {
                spyOn(model, "authors").andReturn([
                    {name: "John McClane", url: "http://diehard.com"},
                    {name: "Hans Gruber"}
                ]);

                view.render();
            });

            it("makes a ul with li's for the authors, linking when appropriate", function() {
                expect(view.$("ul li:eq(0) a")).toHaveAttr("href", "http://diehard.com");
                expect(view.$("ul li:eq(0) a").text()).toBe("John McClane");
                expect(view.$("ul li:eq(1)").text()).toBe("Hans Gruber");
                expect(view.$("ul li:eq(1) a")).not.toExist();
            });

            it("has an 'Authors' heading", function() {
                expect(view.$("h1").text()).toBe("Authors");
            });
        });
    });
});
