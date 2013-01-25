describe("Javascripsum.Models.Phrase", function() {
  var model;
  beforeEach(function() {
    model = new Javascripsum.Models.Phrase({
      phrase: "example phrase",
      definition: "example definition",
      url: "http://example.com"
    });
  });

  it("has a getter for phrase", function() {
    expect(model.phrase()).toBe("example phrase");
  });

  it("has a getter for definition", function() {
    expect(model.definition()).toBe("example definition");
  });

  it("has a getter for url", function() {
    expect(model.url()).toBe("http://example.com");
  });
});
