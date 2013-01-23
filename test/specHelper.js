var fakeTemplateCache;
beforeEach(function() {
    jasmine.Ajax.useMock();
    fakeTemplateCache = {};
    spyOn(Backbone.Marionette.Renderer, "render").andCallFake(function(templateId) {
      var _fakeTemplateCache = _(fakeTemplateCache);
      if (!_fakeTemplateCache.has(templateId)) {
        throw 'unexpected render call';
      }

      return _fakeTemplateCache.result(templateId);
    });
});

function stubRender(templateId, value) {
  fakeTemplateCache[templateId] = value;
}
