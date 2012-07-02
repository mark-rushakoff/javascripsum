Javascripsum.Views.EditorView = Backbone.View.extend({
    render: function() {
        var editors = this.model.editors();
        if (editors.length) {
            var $ul = $("<ul></ul>");
            _.each(editors, function(editor) {
                var $editorLi = $("<li></li>");
                if (editor.url) {
                    $editorLi.append($("<a></a>").attr("href", editor.url).text(editor.name));
                } else {
                    $editorLi.text(editor.name);
                }

                $ul.append($editorLi);
            });

            this.$el.html("<h1>Editors</h1>").append($ul).removeClass("empty");
        } else {
            this.$el.empty().addClass("empty");
        }
    }
});
