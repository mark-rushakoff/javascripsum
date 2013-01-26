"use strict";

function makeIpsumSelectorView(vent, ipsumList) {
  var view = new (Backbone.Marionette.ItemView.extend({
    events: {
      "change select": function() {
        view.triggerSelection();
      }
    },
    ui: {
      select: "select"
    },
    serializeData: function() {
      return { ipsums: ipsumList.ipsums() };
    },
    template: "#ipsum-selector-tpl",

    triggerSelection: function() {
      vent.trigger("ipsum:selected", view.ui.select.val());
    }
  }))({model: ipsumList});

  return view;
}

Javascripsum.Factories.makeIpsumSelectorView = makeIpsumSelectorView;
