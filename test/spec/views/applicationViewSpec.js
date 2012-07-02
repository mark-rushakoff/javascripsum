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

        it("adds the stylesheet for the ipsums with css", function() {
            expect(view.addStylesheet).toHaveBeenCalledWith("other");
            expect(view.addStylesheet).not.toHaveBeenCalledWith("traditional");
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

            it("updates the body class when changed", function() {
                $select.val("other").trigger("change");
                expect($root).toHaveClass("other");

                $select.val("traditional").trigger("change");
                expect($root).not.toHaveClass("other");
            });
        });
    });
});
