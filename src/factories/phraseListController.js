"use strict";

function makePhraseListController(vent, outputRegion) {
  var ctrl = new (Backbone.Marionette.ItemView.extend({
    initialize: function() {
      this.listenTo(vent, "ipsum:selected", onIpsumSelected);
    }
  }))();

  return ctrl;

  function onIpsumSelected(ipsumName) {
    ctrl.model = new Javascripsum.Models.PhraseList({id: ipsumName});
    ctrl.model.fetch().success(onPhraseListFetched);
  }

  function onPhraseListFetched() {
    outputRegion.show(Javascripsum.Factories.makeOutputView(vent));
  }
}

Javascripsum.Factories.makePhraseListController = makePhraseListController;
