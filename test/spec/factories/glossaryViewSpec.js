describe("Javascripsum.Factories.makeGlossaryView", function() {
  it("renders with the content of #glossary-tpl", function() {
    stubRender("#glossary-tpl", "a glossary");

    var model = new Javascripsum.Models.PhraseList(),
    view = makeGlossaryView(model);

    view.render();

    expect(view.$el.html()).toBe("a glossary");
  });

  it("serializes the phrase list's phrases", function() {
    var model = new Javascripsum.Models.PhraseList(),
    view = makeGlossaryView(model);

    spyOn(model, "phrases").andReturn([1, 2, 3]);

    expect(view.serializeData()).toEqual({phrases: [1, 2, 3]});
  });
});
