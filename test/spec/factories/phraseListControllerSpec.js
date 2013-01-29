describe("Javascripsum.Factories.makePhraseListController", function() {
  describe("when ipsum:selected is triggered", function() {
    var vent, ctrl, outputRegion, editorRegion, glossaryRegion;

    beforeEach(function() {
      outputRegion = jasmine.createSpyObj("outputRegion", ["show"]);
      editorRegion = jasmine.createSpyObj("editorRegion", ["show", "close"]);
      glossaryRegion = jasmine.createSpyObj("glossaryRegion", ["show"]);
      vent = new Backbone.Marionette.EventAggregator();
      ctrl = makePhraseListController(vent, outputRegion, editorRegion, glossaryRegion);

      vent.trigger('ipsum:selected', 'foobar');
    });

    it("fetches a new phraseList", function() {
      expect(mostRecentAjaxRequest().url).toBe("ipsums/foobar.json");
    });

    describe("when the phraseList fetch completes", function() {
      function respond(phraseList) {
        var resp = _(phraseList || {}).defaults({
          phrases: [],
          editors: []
        });
        mostRecentAjaxRequest().response({status: 200, responseText: JSON.stringify(resp)});
      }
      beforeEach(function() {
        spyOn(Javascripsum.Factories, "makeOutputView").andReturn({output: "view"});
        spyOn(Javascripsum.Factories, "makeEditorView").andReturn({editor: "view"});
        spyOn(Javascripsum.Factories, "makeGlossaryView").andReturn({glossary: "view"});
        vent.trigger("set:paragraphCount", 5);
      });

      it("renders a new outputView", function() {
        respond();
        expect(Javascripsum.Factories.makeOutputView).toHaveBeenCalledWith(vent, 5, ctrl.model);
        expect(outputRegion.show).toHaveBeenCalledWith({output: "view"});
      });

      it("renders a new editorView", function() {
        respond({editors: [1,2]});
        expect(Javascripsum.Factories.makeEditorView).toHaveBeenCalledWith(ctrl.model);
        expect(editorRegion.show).toHaveBeenCalledWith({editor: "view"});
      });

      it("hides the editorView if editors are empty", function() {
        respond();
        expect(Javascripsum.Factories.makeEditorView).not.toHaveBeenCalled();
        expect(editorRegion.close).toHaveBeenCalledWith();
      });

      it("renders a new glossaryView", function() {
        respond();
        expect(Javascripsum.Factories.makeGlossaryView).toHaveBeenCalledWith(ctrl.model);
        expect(glossaryRegion.show).toHaveBeenCalledWith({glossary: "view"});
      });
    });
  });
});
