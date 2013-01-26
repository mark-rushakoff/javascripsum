Javascripsum.Models.PhraseList = Backbone.Model.extend({
    url: function() {
        return "ipsums/" + this.id + ".json";
    },

    phrases: function() {
        return this.get("phrases");
    },

    editors: function() {
        return this.get("editors");
    }
});
