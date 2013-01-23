"use strict";

function makeApp() {
  var app = new Backbone.Marionette.Application();
  app.addInitializer(function configureRegions(opts) {
    $(opts.documentSelector).html(Backbone.Marionette.Renderer.render("#main-tpl", {}));
    app.addRegions({
      ipsumSelectorRegion: "#ipsum-selector",
      outputRegion: "#output",
      numParagraphsSelectorRegion: "#num-paragraphs-selector",
      editorContainerRegion: "#editor-container",
      glossaryContainerRegion: "#glossary-container"
    });
  });

  app.addInitializer(function fetchManagerModel() {
    app.managerModel = new Javascripsum.Models.Manager();
    app.managerModel.fetch().success(function managerFetchSuccess() {
      app.ipsumSelectorRegion.show(Javascripsum.Factories.makeIpsumSelectorView(app.vent, app.managerModel));
    });
  });

  return app;
}

Javascripsum.Factories.makeApp = makeApp;
