describe("Javascripsum.Initializers.makeApp", function() {
  it("renders the main template into the given selector", function() {
    spyOn(Backbone.Marionette.Renderer, 'render');
    var $target = $("<div></div>");
    var app = Javascripsum.Initializers.makeApp();
    app.start({documentSelector: $target});

    expect(Backbone.Marionette.Renderer.render).toHaveBeenCalledWith("#main-tpl", {});
  });
});
