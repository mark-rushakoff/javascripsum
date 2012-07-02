Javascripsum.Views.ApplicationView = Backbone.View.extend({
    events: {
        "change select": "onIpsumSelected"
    },

    initialize: function() {
        this.model = new Javascripsum.Models.Manager();
        this.model.fetch().done(_.bind(this.setUp, this));
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
        this.onIpsumSelected();
        this.$el.append($select);
    },

    onIpsumSelected: function() {
        var selectedIpsum = this.$select.find("option:selected").data("ipsum");
        this.$el.removeClass();
        if (selectedIpsum.hasCss) {
            this.$el.addClass(selectedIpsum.name);
        }
    },

    addStylesheet: function() {}
});
