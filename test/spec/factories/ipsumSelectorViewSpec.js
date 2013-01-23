describe("Javascripsum.Factories.makeIpsumSelectorView", function() {
  it("triggers ipsum:selected on the vent when the select changes", function() {
    spyOn(Backbone.Marionette.Renderer, 'render').andCallFake(function(templateName) {
      if (templateName !== '#ipsum-selector-tpl') {
        throw "Unexpected render call";
      }

      return "<select><option>Cats</option><option>Dogs</option></select>";
    });

    var vent = new Backbone.Marionette.EventAggregator(),
    model = { ipsums: jasmine.createSpy().andReturn([]) },
    view = makeIpsumSelectorView(vent, model),
    selectionSpy = jasmine.createSpy('selection event');

    vent.on('ipsum:selected', selectionSpy);

    view.render();

    view.$("option:first-child").prop("selected", true);
    view.$("select").trigger("change");

    expect(selectionSpy).toHaveBeenCalledWith("Cats");
  });
});
