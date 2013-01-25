Javascripsum.Util.Generator = function(model) {
  this.model = model;
};

(function() {
  function randomInt(lowerBound, exclusiveUpperBound) {
    return Math.floor(Math.random() * (exclusiveUpperBound - lowerBound)) + lowerBound;
  }

  _.extend(Javascripsum.Util.Generator.prototype, {
    sentence: function(numPhrases) {
      numPhrases || (numPhrases = randomInt(3, 7));
      var phrases = _.pluck(this.model.phrases(), "phrase");

      var sentence = _.map(_.range(numPhrases), function() {
        return _.sample(phrases);
      });

      sentence[0] = _.string.capitalize(sentence[0]);
      sentence[numPhrases - 1] = sentence[numPhrases - 1] + '.';

      return sentence.join(' ');
    },

    paragraph: function(numSentences) {
      numSentences || (numSentences = randomInt(2, 8));

      var paragraph = _.map(_.range(numSentences), function() {
        return this.sentence();
      }, this);

      return paragraph.join(' ');
    }
  });
})();
