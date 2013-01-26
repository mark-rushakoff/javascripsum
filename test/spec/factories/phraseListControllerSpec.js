describe("Javascripsum.Factories.makePhraseListController", function() {
  describe("when ipsum:selected is triggered", function() {
    var vent, ctrl, outputRegion, editorRegion;

    beforeEach(function() {
      outputRegion = jasmine.createSpyObj("outputRegion", ["show"]);
      editorRegion = jasmine.createSpyObj("editorRegion", ["show"]);
      vent = new Backbone.Marionette.EventAggregator();
      ctrl = makePhraseListController(vent, outputRegion, editorRegion);

      vent.trigger('ipsum:selected', 'foobar');
    });

    it("fetches a new phraseList", function() {
      expect(mostRecentAjaxRequest().url).toBe("ipsums/foobar.json");
    });

    describe("when the phraseList fetch completes", function() {
      beforeEach(function() {
        spyOn(Javascripsum.Factories, "makeOutputView").andReturn({output: "view"});
        spyOn(Javascripsum.Factories, "makeEditorView").andReturn({editor: "view"});
        var resp = {
          phrases: [],
          editors: []
        };
        vent.trigger("set:paragraphCount", 5);
        mostRecentAjaxRequest().response({status: 200, responseText: JSON.stringify(resp)});
      });

      it("renders a new outputView", function() {
        expect(Javascripsum.Factories.makeOutputView).toHaveBeenCalledWith(vent, 5, ctrl.model);
        expect(outputRegion.show).toHaveBeenCalledWith({output: "view"});
      });

      it("renders a new editorView", function() {
        expect(Javascripsum.Factories.makeEditorView).toHaveBeenCalledWith(ctrl.model);
        expect(editorRegion.show).toHaveBeenCalledWith({editor: "view"});
      });
    });
  });
});
