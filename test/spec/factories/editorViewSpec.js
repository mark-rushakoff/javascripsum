describe("Javascripsum.Factories.makeEditorView", function() {
  it("renders with the content of #editor-tpl", function() {
    stubRender("#editor-tpl", "edit this");

    var model = new Javascripsum.Models.PhraseList(),
    view = makeEditorView(model);

    view.render();

    expect(view.$el.html()).toBe("edit this");
  });

  it("serializes the phrase list's editors", function() {
    var model = new Javascripsum.Models.PhraseList(),
    view = makeEditorView(model);

    spyOn(model, "editors").andReturn([1, 2, 3]);

    expect(view.serializeData()).toEqual({editors: [1, 2, 3]});
  });
});
