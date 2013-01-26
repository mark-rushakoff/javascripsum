"use strict";

function makeGlossaryView(model) {
  var view = new (Backbone.Marionette.ItemView.extend({
    serializeData: function() {
      return { phrases: model.phrases() };
    },
    template: "#glossary-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeGlossaryView = makeGlossaryView;
