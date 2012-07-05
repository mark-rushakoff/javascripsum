describe("Javascripsum.Views.ApplicationView", function() {
    var view, $root;
    beforeEach(function() {
        $root = $("<div></div>");
        view = new Javascripsum.Views.ApplicationView({el: $root});
        spyOn(view, "addStylesheet");
    });

    it("instantiates a Manager model", function() {
        expect(view.model instanceof Javascripsum.Models.Manager).toBeTruthy();
    });

    it("does not add anything to the root element at first", function() {
        expect($root).toBeEmpty();
    });

    describe("when the model fetch completes", function() {
        beforeEach(function() {
            spyOn(view.model, "ipsums").andReturn([{name: "traditional", hasCss: false}, {name: "other", hasCss: true}]);
            mostRecentAjaxRequest().response({status: 200});
        });

        it("re-generates the paragraphs when the generate link is clicked", function() {
            spyOn(view.generator, "paragraph").andReturn("Foo bar.");
            view.$("a.generate").click();
            expect(view.$(".output p").text()).toBe("Foo bar.");
        });

        it("adds the stylesheet for the ipsums with css", function() {
            expect(view.addStylesheet).toHaveBeenCalledWith("other");
            expect(view.addStylesheet).not.toHaveBeenCalledWith("traditional");
        });

        it("puts the editor view on the root element", function() {
            expect($root).toContain(view.editorView.$el);
            expect(view.editorView.model).toBe(view.phraseList);
        });

        describe("the ipsum dropdown", function() {
            var $select;
            beforeEach(function() {
                $select = $root.find("select");
            });

            it("renders", function() {
                expect($select).toExist();
                expect($select.val()).toBe("traditional");
            });

            describe("when picking a different option", function() {
                it("updates the body class", function() {
                    $select.val("other").trigger("change");
                    expect($root).toHaveClass("other");

                    $select.val("traditional").trigger("change");
                    expect($root).not.toHaveClass("other");
                });

                it("updates the phraseList", function() {
                    expect(view.phraseList.id).toBe("traditional");
                    clearAjaxRequests();
                    $select.val("other").trigger("change");
                    expect(view.phraseList.id).toBe("other");
                    expect(mostRecentAjaxRequest().url).toBe("topics/other.json");
                });
            });
        });
    });
});
