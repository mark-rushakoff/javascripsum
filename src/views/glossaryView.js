Javascripsum.Views.GlossaryView = Backbone.View.extend({
    render: function() {
        var $list = $("<dl></dl>");
        _.each(_.filter(this.model.phrases(), function(phraseObj){
          return phraseObj.definition || phraseObj.url;
        }), function(phraseObj) {
            var $dt = $("<dt></dt>");
            if (phraseObj.url) {
                $dt.append($("<a></a>").attr("href", phraseObj.url).text(phraseObj.phrase));
            } else {
                $dt.text(phraseObj.phrase);
            }
            $list.append($dt);
            $list.append($("<dd></dd>").text(phraseObj.definition));
        });

        this.$el.empty().append($list);
        return this;
    }
});
