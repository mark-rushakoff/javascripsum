"use strict";

function makeOutputView(vent) {
  var view = new (Backbone.Marionette.ItemView.extend({
    initialize: function() {
      this.listenTo(vent, "out:generate", function() { view.render(); });
    },
    // events: {
      // "change .num-paragraphs": function() {
        // vent.trigger("set:paragraphCount", +view.ui.numParagraphs.val());
      // }
    // },
    // ui: {
      // numParagraphs: ".num-paragraphs"
    // },
    // serializeData: function() {
      // return { ipsums: ipsumList.ipsums() };
    // },
    template: "#output-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeOutputView = makeOutputView;
