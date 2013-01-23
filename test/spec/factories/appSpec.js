describe("Javascripsum.Factories.makeApp", function() {
  describe("#start", function() {
    it("renders the main template into the given selector", function() {
      spyOn(Backbone.Marionette.Renderer, 'render');
      var $target = $("<div></div>");
      var app = Javascripsum.Factories.makeApp();
      app.start({documentSelector: $target});

      expect(Backbone.Marionette.Renderer.render).toHaveBeenCalledWith("#main-tpl", {});
    });
  });
});
