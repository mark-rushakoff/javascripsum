describe("Javascripsum.Views.GlossaryView", function() {
    var view, model;
    beforeEach(function() {
        model = new Javascripsum.Models.PhraseList();
        view = new Javascripsum.Views.GlossaryView({model: model});
    });

    describe("#render", function() {
        it("generates a dl with a dt for each item with a definition", function() {
            model.set("phrases", [{phrase: "foo", definition: 'f00'}, {phrase: "bar", definition: 'b4r'}, {phrase: "baz"}]);
            view.render();
            expect(view.$("dl dt").length).toBe(2);
            expect(view.$("dl dd").length).toBe(2);

            expect(view.$("dl dt:eq(0)").text()).toBe("foo");
            expect(view.$("dl dt:eq(1)").text()).toBe("bar");
            expect(view.$("dl dd:eq(0)").text()).toBe("f00");
            expect(view.$("dl dd:eq(1)").text()).toBe("b4r");
        });

        it("generates a link in a dt for each item with a URL", function() {
            model.set("phrases", [{phrase: "foo", url: "http://foo.com"}, {phrase: "bar"}, {phrase: "baz", url: "http://baz.com"}]);
            view.render();
            expect(view.$("dl dt").length).toBe(2);
            expect(view.$("dl dd").length).toBe(2);

            expect(view.$("dl dt:eq(0) a")).toHaveAttr("href", "http://foo.com");
            expect(view.$("dl dt:eq(1) a")).toHaveAttr("href", "http://baz.com");
        });
    });
});
