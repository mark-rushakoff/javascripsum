Javascripsum.Views.AuthorView = Backbone.View.extend({
    render: function() {
        var authors = this.model.authors();
        if (authors.length) {
            var $ul = $("<ul></ul>");
            _.each(authors, function(author) {
                var $authorLi = $("<li></li>");
                if (author.url) {
                    $authorLi.append($("<a></a>").attr("href", author.url).text(author.name));
                } else {
                    $authorLi.text(author.name);
                }

                $ul.append($authorLi);
            });

            this.$el.html("<h1>Authors</h1>").append($ul).removeClass("empty");
        } else {
            this.$el.empty().addClass("empty");
        }
    }
});
