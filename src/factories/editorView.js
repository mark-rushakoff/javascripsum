"use strict";

function makeEditorView(model) {
  var view = new (Backbone.Marionette.ItemView.extend({
    serializeData: function() {
      return { editors: model.editors() };
    },
    template: "#editor-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeEditorView = makeEditorView;
