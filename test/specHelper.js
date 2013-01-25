var fakeTemplateCache;
beforeEach(function() {
    jasmine.Ajax.useMock();
    clearAjaxRequests();
    fakeTemplateCache = {};
    spyOn(Backbone.Marionette.Renderer, "render").andCallFake(function(templateId) {
      var _fakeTemplateCache = _(fakeTemplateCache);
      if (!_fakeTemplateCache.has(templateId)) {
        expect('this render call').toBe('stubbed for template ID: ' + templateId)
      }

      return _fakeTemplateCache.result(templateId);
    });
});

function stubRender(templateId, value) {
  fakeTemplateCache[templateId] = value;
}
