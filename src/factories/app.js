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

  app.addInitializer(function fetchIpsumListModel() {
    app.ipsumList = new Javascripsum.Models.IpsumList();
    app.ipsumList.fetch().success(function ipsumListFetchSuccess() {
      app.ipsumSelectorRegion.show(Javascripsum.Factories.makeIpsumSelectorView(app.vent, app.ipsumList));
    });
  });

  return app;
}

Javascripsum.Factories.makeApp = makeApp;
