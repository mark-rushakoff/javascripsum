Javascripsum.Models.Manager = Backbone.Model.extend({
    url: "index.json",
    initialize: function() {
        this.fetch();
    },

    ipsums: function() {
        return this.get("ipsums");
    }
});
