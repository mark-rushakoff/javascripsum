Javascripsum.Views.IpsumView = Backbone.View.extend({
    initialize: function() {
        this.generator = new Javascripsum.Util.Generator(this.model);
        this.numParagraphs = 1;
    },

    render: function() {
        var $div = $("<div></div>"),
            generator = this.generator;

        _.times(this.numParagraphs, function() {
            var $paragraph = $("<p></p>").text(this.generator.paragraph());
            $div.append($paragraph);
        }, this);

        this.$el.empty().append($div);
        return this;
    }
});
