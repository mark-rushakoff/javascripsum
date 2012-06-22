Javascripsum.Models.PhraseList = Backbone.Model.extend({
    url: function() {
        return "topics/" + this.id + ".json";
    }
});
