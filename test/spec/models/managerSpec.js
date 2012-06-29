describe("Javascripsum.Models.Manager", function() {
    describe("initialization", function() {
        var model;
        beforeEach(function() {
            model = new Javascripsum.Models.Manager();
        });

        it("fetches from the right url", function() {
            expect(mostRecentAjaxRequest().url).toBe("index.json");
        });

        describe("once the fetch completes", function() {
            beforeEach(function() {
                var response = {
                    ipsums: [
                        {name: "traditional", hasCss: false}
                    ]
                };
                mostRecentAjaxRequest().response({status: 200, responseText: JSON.stringify(response)});
            });

            it("exposes the ipsums", function() {
                expect(model.ipsums()).toEqual([
                    {name: "traditional", hasCss: false}
                ]);
            });
        });
    });
});
