"use strict";

function makeOutputView(vent, numParagraphs, phraseList) {
  var generator = new Javascripsum.Util.Generator(phraseList),
  view = new (Backbone.Marionette.ItemView.extend({
    initialize: function() {
      this.listenTo(vent, "out:generate", function() { view.render(); });
      this.listenTo(vent, "set:paragraphCount", function(n) { numParagraphs = n; });
    },
    serializeData: function() {
      var paragraphs = [];
      _(numParagraphs).times(function() {
        paragraphs.push(generator.paragraph());
      });
      return { paragraphs: paragraphs };
    },
    template: "#output-tpl"
  }))();

  return view;
}

Javascripsum.Factories.makeOutputView = makeOutputView;
