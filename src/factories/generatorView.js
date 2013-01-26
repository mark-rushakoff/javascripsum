"use strict";

function makeGeneratorView(vent) {
  var view = new (Backbone.Marionette.ItemView.extend({
    events: {
      "click a": function() {
        vent.trigger("out:generate");
      }
    },
    template: "#generator-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeGeneratorView = makeGeneratorView;
