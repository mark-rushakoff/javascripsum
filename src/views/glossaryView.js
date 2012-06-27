Javascripsum.Views.GlossaryView = Backbone.View.extend({
    render: function() {
        var $list = $("<dd></dd>");
        _.each(this.model.phrases(), function(phraseObj) {
            $list.append($("<dl></dl>").text(phraseObj.phrase));
        });

        this.$el.empty().append($list);
    }
});
