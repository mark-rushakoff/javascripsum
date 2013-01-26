"use strict";

function makeParagraphCountView(vent) {
  var view = new (Backbone.Marionette.ItemView.extend({
    events: {
      "change .num-paragraphs": function() {
        vent.trigger("set:paragraphCount", +view.ui.numParagraphs.val());
      }
    },
    ui: {
      numParagraphs: ".num-paragraphs"
    },
    template: "#paragraph-count-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeParagraphCountView = makeParagraphCountView;
