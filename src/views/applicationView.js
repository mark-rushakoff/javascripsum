Javascripsum.Views.ApplicationView = Backbone.View.extend({
    events: {
        "click a.generate": "generateLinkClicked",
        "change select": "onIpsumSelected"
    },

    initialize: function() {
        this.model = new Javascripsum.Models.IpsumList();
        this.model.fetch().done(_.bind(this.setUp, this));
        this.generator = new Javascripsum.Util.Generator(this.model);
    },

    setUp: function() {
        var $select = this.$select = $("<select></select>");
        _.each(this.model.ipsums(), function(ipsum) {
            $select.append($("<option></option>").data("ipsum", ipsum).attr("value", ipsum.name).text(ipsum.name));
            if (ipsum.hasCss) {
                this.addStylesheet(ipsum.name);
            }
        }, this);
        $select.find("option:eq(0)").prop("selected", true);

        this.$output = $("<div class='output'></div>");
        this.$numParagraphs = $("<input type='number' min='1' value='3'/>");

        this.editorView = new Javascripsum.Views.EditorView();
        this.glossaryView = new Javascripsum.Views.GlossaryView();

        this.onIpsumSelected();
        this.$el.
            append($select).
            append(this.$numParagraphs).
            append("<a href='#' class='generate'>Generate</a>").
            append(this.$output).
            append(this.editorView.$el).
            append(this.glossaryView.$el);
    },

    onIpsumSelected: function() {
        var selectedIpsum = this.$select.find("option:selected").data("ipsum");
        this.$el.removeClass();
        if (selectedIpsum.hasCss) {
            this.$el.addClass(selectedIpsum.name);
        }

        this.generator.model =
            this.editorView.model =
            this.glossaryView.model =
            this.phraseList = new Javascripsum.Models.PhraseList({id: selectedIpsum.name});

        this.phraseList.fetch().
            done(_.bind(this.glossaryView.render, this.glossaryView)).
            done(_.bind(this.editorView.render, this.editorView));
    },

    generateLinkClicked: function(e) {
        e.preventDefault();
        this.renderParagraphs();
    },

    renderParagraphs: function() {
        this.$output.empty();
        _.times(this.numParagraphs(), function() {
            this.$output.append($("<p></p>").text(this.generator.paragraph()));
        }, this);
    },

    numParagraphs: function() {
        return this.$numParagraphs.val();
    },

    addStylesheet: function() {}
});
