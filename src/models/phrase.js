Javascripsum.Models.Phrase = Backbone.Model.extend({
  phrase: function() {
    return this.get("phrase");
  },

  definition: function() {
    return this.get("definition");
  },

  url: function() {
    return this.get("url");
  }
});
