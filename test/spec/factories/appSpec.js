describe("Javascripsum.Factories.makeApp", function() {
  describe("#start", function() {
    it("renders the main template into the given selector", function() {
      stubRender("#main-tpl", 'my main template');
      var $target = $("<div></div>");
      var app = Javascripsum.Factories.makeApp();
      app.start({documentSelector: $target});

      expect($target.html()).toBe("my main template");
    });
  });

  describe("after the ipsum list fetch completes", function() {
    it("puts an ipsum selector view in the ipsum selector region", function() {
      stubRender("#main-tpl", 'my main template');
      var $target = $("<div></div>");
      var app = Javascripsum.Factories.makeApp();

      spyOn(Javascripsum.Factories, "makeIpsumSelectorView").andReturn({my: "view"});
      app.start({documentSelector: $target});
      spyOn(app.ipsumSelectorRegion, "show");

      mostRecentAjaxRequest().response({status: 200, responseText: "{}"});

      expect(Javascripsum.Factories.makeIpsumSelectorView).toHaveBeenCalledWith(app.vent, app.ipsumList);
      expect(app.ipsumSelectorRegion.show).toHaveBeenCalledWith({my: "view"});
    });
  });
});
