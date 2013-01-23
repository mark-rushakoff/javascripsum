Javascripsum.Models.IpsumList = Backbone.Model.extend({
    url: "index.json",

    ipsums: function() {
        return this.get("ipsums");
    }
});
