"use strict";

function makeIpsumSelectorView(vent, managerModel) {
  var view = new (Backbone.Marionette.ItemView.extend({
    events: {
      "change select": function(e) {
        vent.trigger("ipsum:selected", view.ui.select.val());
      }
    },
    ui: {
      select: "select"
    },
    serializeData: function() {
      return { ipsums: managerModel.ipsums() };
    },
    template: "#ipsum-selector-tpl"
  }))({model: managerModel});

  return view;
}

Javascripsum.Factories.makeIpsumSelectorView = makeIpsumSelectorView;
