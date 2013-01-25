describe("Javascripsum.Factories.outputView", function() {
  it("renders when the vent triggers out:generate", function() {
    stubRender("#output-tpl", "");

    var vent = new Backbone.Marionette.EventAggregator(),
    view = makeOutputView(vent);
    spyOn(view, 'render');

    vent.trigger('out:generate');

    expect(view.render).toHaveBeenCalled();
  });

  it("renders with the content of #output-tpl", function() {
    stubRender("#output-tpl", "the output");

    var vent = new Backbone.Marionette.EventAggregator(),
    view = makeOutputView(vent);

    view.render();

    expect(view.$el.html()).toBe("the output");
  });
});
