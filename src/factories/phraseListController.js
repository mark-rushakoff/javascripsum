"use strict";

function makePhraseListController(vent, outputRegion, editorRegion, glossaryRegion) {
  var numParagraphs = 3,
  ctrl = new (Backbone.Marionette.ItemView.extend({
    initialize: function() {
      this.listenTo(vent, "ipsum:selected", onIpsumSelected);
      this.listenTo(vent, "set:paragraphCount", function(n) {
        numParagraphs = n;
      });
    }
  }))();

  return ctrl;

  function onIpsumSelected(ipsumName) {
    ctrl.model = new Javascripsum.Models.PhraseList({id: ipsumName});
    ctrl.model.fetch().success(onPhraseListFetched);
  }

  function onPhraseListFetched() {
    outputRegion.show(Javascripsum.Factories.makeOutputView(vent, numParagraphs, ctrl.model));
    glossaryRegion.show(Javascripsum.Factories.makeGlossaryView(ctrl.model));
    var editors = ctrl.model.editors();
    if (editors && editors.length > 0) {
      editorRegion.show(Javascripsum.Factories.makeEditorView(ctrl.model));
    } else {
      editorRegion.close();
    }
  }
}

Javascripsum.Factories.makePhraseListController = makePhraseListController;
