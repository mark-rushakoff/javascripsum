Javascripsum.Models.PhraseList = Backbone.Model.extend({
    url: function() {
        return "topics/" + this.id + ".json";
    },

    phrases: function() {
        return this.get("phrases");
    },

    authors: function() {
        return this.get("authors");
    }
});
