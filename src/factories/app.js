"use strict";

function makeApp() {
  var app = new Backbone.Marionette.Application();
  app.addInitializer(function configureRegions(opts) {
    var $documentSelector = $(opts.documentSelector),
    documentSelectorBoundRegion = Backbone.Marionette.Region.extend({
      getEl: function(selector) {
        return $documentSelector.find(selector);
      }
    });

    $documentSelector.html(Backbone.Marionette.Renderer.render("#main-tpl", {}));
    app.addRegions({
      ipsumSelectorRegion: makeRegionHash("#ipsum-selector"),
      generatorRegion: makeRegionHash("#generator-container"),
      outputRegion: makeRegionHash("#output-container"),
      paragraphCountRegion: makeRegionHash("#paragraph-count-container"),
      editorRegion: makeRegionHash("#editor-container"),
      glossaryRegion: makeRegionHash("#glossary-container")
    });

    function makeRegionHash(selector) {
      return {
        selector: selector,
        regionType: documentSelectorBoundRegion
      };
    }
  });

  app.addInitializer(function () {
    app.generatorRegion.show(Javascripsum.Factories.makeGeneratorView(app.vent));
    app.paragraphCountRegion.show(Javascripsum.Factories.makeParagraphCountView(app.vent));

    app.phraseListController = Javascripsum.Factories.makePhraseListController(app.vent, app.outputRegion, app.editorRegion);
  });

  app.addInitializer(function fetchIpsumListModel() {
    app.ipsumList = new Javascripsum.Models.IpsumList();
    app.ipsumList.fetch().success(function ipsumListFetchSuccess() {
      var ipsumSelectorView = Javascripsum.Factories.makeIpsumSelectorView(app.vent, app.ipsumList);
      app.ipsumSelectorRegion.show(ipsumSelectorView);
      ipsumSelectorView.triggerSelection();
    });
  });

  return app;
}

Javascripsum.Factories.makeApp = makeApp;
