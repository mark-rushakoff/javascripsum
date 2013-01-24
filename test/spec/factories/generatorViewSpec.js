describe("Javascripsum.Factories.makeGeneratorView", function() {
  it("triggers out:generate on the vent when clicked", function() {
    stubRender("#generator-tpl", "");

    var vent = new Backbone.Marionette.EventAggregator(),
    view = makeGeneratorView(vent),
    generateSpy = jasmine.createSpy('out:generate event');

    vent.on('out:generate', generateSpy);

    view.render();

    view.events["click a"]();

    expect(generateSpy).toHaveBeenCalled();
  });

  it("renders with the content of #generator-tpl", function() {
    stubRender("#generator-tpl", "cool generator");

    var vent = new Backbone.Marionette.EventAggregator(),
    view = makeGeneratorView(vent);

    view.render();

    expect(view.$el.html()).toBe("cool generator");
  });
});
