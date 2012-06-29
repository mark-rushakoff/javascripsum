Javascripsum.Views.ApplicationView = Backbone.View.extend({
    initialize: function() {
        this.model = new Javascripsum.Models.Manager();
        this.model.fetch().done(_.bind(this.setUp, this));
    },

    setUp: function() {
        _.each(this.model.ipsums(), function(ipsum) {
            if (ipsum.hasCss) {
                this.addStylesheet(ipsum.name);
            }
        }, this);
    },

    render: function() {},
    addStylesheet: function() {}
});
