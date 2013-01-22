"use strict";

function makeApp() {
  var app = new Backbone.Marionette.Application();
  app.addInitializer(function(options) {
    $(options.documentSelector).html(Backbone.Marionette.Renderer.render("#main-tpl", {}));
    app.addRegions({
      ipsumSelector: "#ipsum-selector",
      output: "#output",
      numParagraphsSelector: "#num-paragraphs-selector",
      editorContainer: "#editor-container",
      glossaryContainer: "#glossary-container"
    });
  });

  return app;
}

Javascripsum.Initializers.makeApp = makeApp;
