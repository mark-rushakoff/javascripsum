describe("Javascripsum.Factories.paragraphCountView", function() {
  it("triggers set:paragraphCount on the vent when clicked", function() {
    stubRender("#paragraph-count-tpl", "<input class='num-paragraphs' type='number'></input>");

    var vent = new Backbone.Marionette.EventAggregator(),
    view = makeParagraphCountView(vent),
    paragraphCountSpy = jasmine.createSpy('set:paragraphCount event');

    vent.on('set:paragraphCount', paragraphCountSpy);

    view.render();
    view.ui.numParagraphs.val(5);

    view.events["change .num-paragraphs"]();

    expect(paragraphCountSpy).toHaveBeenCalledWith(5);
  });

  it("renders with the content of #paragraph-count-tpl", function() {
    stubRender("#paragraph-count-tpl", "count some paragraphs");

    var vent = new Backbone.Marionette.EventAggregator(),
    view = makeParagraphCountView(vent);

    view.render();

    expect(view.$el.html()).toBe("count some paragraphs");
  });
});
