Javascripsum.Models.WordList = Backbone.Model.extend({
    url: function() {
        return "topics/" + this.id + ".json";
    }
});
