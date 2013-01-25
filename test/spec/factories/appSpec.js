describe("Javascripsum.Factories.makeApp", function() {
  var $target, app;

  beforeEach(function() {
    stubRender("#main-tpl", 'my main template');
    stubRender('#generator-tpl', 'generator goes here');
    stubRender('#paragraph-count-tpl', 'paragraph count goes here');
    $target = $("<div></div>");
    app = Javascripsum.Factories.makeApp();
  });

  describe("#start", function() {
    it("renders the main template into the given selector", function() {
      app.start({documentSelector: $target});

      expect($target.html()).toBe("my main template");
    });

    it("puts a generator view in the generator region", function() {
      makeContainer("generator-container");
      app.start({documentSelector: $target});

      expect($target.find("#generator-container").text()).toBe("generator goes here");
    });

    it("puts a paragraph count view in the paragraph count region", function() {
      makeContainer("paragraph-count-container");
      app.start({documentSelector: $target});

      expect($target.find("#paragraph-count-container").text()).toBe("paragraph count goes here");
    });

    function makeContainer(divId) {
      stubRender('#main-tpl', '<div><div id="' + divId + '"></div></div>');
    }
  });

  describe("after the ipsum list fetch completes", function() {
    it("puts an ipsum selector view in the ipsum selector region", function() {
      spyOn(Javascripsum.Factories, "makeIpsumSelectorView").andReturn({my: "view"});
      app.start({documentSelector: $target});
      spyOn(app.ipsumSelectorRegion, "show");

      mostRecentAjaxRequest().response({status: 200, responseText: "{}"});

      expect(Javascripsum.Factories.makeIpsumSelectorView).toHaveBeenCalledWith(app.vent, app.ipsumList);
      expect(app.ipsumSelectorRegion.show).toHaveBeenCalledWith({my: "view"});
    });
  });
});
