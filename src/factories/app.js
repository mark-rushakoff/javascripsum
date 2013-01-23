"use strict";

function makeApp() {
  var app = new Backbone.Marionette.Application();
  app.addInitializer(function(options) {
    $(options.documentSelector).html(Backbone.Marionette.Renderer.render("#main-tpl", {}));
    app.addRegions({
      ipsumSelectorRegion: "#ipsum-selector",
      outputRegion: "#output",
      numParagraphsSelectorRegion: "#num-paragraphs-selector",
      editorContainerRegion: "#editor-container",
      glossaryContainerRegion: "#glossary-container"
    });
  });

  return app;
}

Javascripsum.Factories.makeApp = makeApp;
