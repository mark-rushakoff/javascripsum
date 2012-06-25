Javascripsum.Util.Generator = function(model) {
    this.model = model;
};

_.extend(Javascripsum.Util.Generator.prototype, {
    sentence: function(numPhrases) {
        numPhrases || (numPhrases = 3);
        var phrases = this.model.phrases();

        var sentence = _.map(_.range(numPhrases), function() {
            return _.sample(phrases);
        });

        sentence[0] = _.string.capitalize(sentence[0]);
        sentence[numPhrases - 1] = sentence[numPhrases - 1] + '.';

        return sentence.join(' ');
    }
});
