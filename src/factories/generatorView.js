"use strict";

function makeGeneratorView(vent) {
  var view = new (Backbone.Marionette.ItemView.extend({
    events: {
      "click a": function() {
        vent.trigger("out:generate");
      }
    },
    // ui: {
      // select: "select"
    // },
    // serializeData: function() {
      // return { ipsums: ipsumList.ipsums() };
    // },
    template: "#generator-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeGeneratorView = makeGeneratorView;
