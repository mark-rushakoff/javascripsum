describe("Javascripsum.Views.ApplicationView", function() {
    var view, $root;
    beforeEach(function() {
        $root = $("<div></div>");
        view = new Javascripsum.Views.ApplicationView({el: $root});
        spyOn(view, "addStylesheet");
    });

    it("instantiates an IpsumList model", function() {
        expect(view.model instanceof Javascripsum.Models.IpsumList).toBeTruthy();
    });

    it("does not add anything to the root element at first", function() {
        expect($root).toBeEmpty();
    });

    describe("when the model fetch completes", function() {
        beforeEach(function() {
            spyOn(view.model, "ipsums").andReturn([{name: "traditional", hasCss: false}, {name: "other", hasCss: true}]);
            mostRecentAjaxRequest().response({status: 200, responseText: "{}"});
        });

        it("re-generates the paragraphs when the generate link is clicked", function() {
            spyOn(view, "numParagraphs").andReturn(2);

            var counter = 0;
            spyOn(view.generator, "paragraph").andCallFake(function() {
                if (!counter) {
                    counter++;
                    return "Foo bar.";
                }

                return "Baz quux.";
            });

            view.$("a.generate").click();
            expect(view.$(".output p:eq(0)").text()).toBe("Foo bar.");
            expect(view.$(".output p:eq(1)").text()).toBe("Baz quux.");
        });

        it("adds the stylesheet for the ipsums with css", function() {
            expect(view.addStylesheet).toHaveBeenCalledWith("other");
            expect(view.addStylesheet).not.toHaveBeenCalledWith("traditional");
        });

        it("puts the editor view on the root element", function() {
            expect($root).toContain(view.editorView.$el);
            expect(view.editorView.model).toBe(view.phraseList);
        });

        it("puts the glossary view on the root element", function() {
            expect($root).toContain(view.glossaryView.$el);
            expect(view.glossaryView.model).toBe(view.phraseList);
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
