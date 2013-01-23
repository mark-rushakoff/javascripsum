describe("Javascripsum.Factories.makeIpsumSelectorView", function() {
  it("triggers ipsum:selected on the vent when the select changes", function() {
    stubRender("#ipsum-selector-tpl",
               "<select><option>Cats</option><option>Dogs</option></select>");

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
