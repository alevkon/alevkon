var App = {
  start: function(space) {
    var self = this;
    this.space = space;

    Semanticle.init();

    //if (window.ymaps) {
    //  window.ymaps.ready(() => self.renderYmaps())
    //}
  },

  _getFilter: function (target) {
    var filter = JSON.parse(target.value);
    filter.space = this.space;
    filter.skip = 0;
    filter.limit = 5;
    return filter;
  },

  filterSelect: function(event) {
    var codeContainer = document.getElementById("filter-code");
    var filter = this._getFilter(event.target);
    var filterString = JSON.stringify(filter)
      .replace(/([\{\,])/g, "$1\r\n  ")
      .replace("}", "  \r\n}");

    codeContainer.innerHTML =
      "Semanticle.find(" + filterString +
      ", {}, function(result) {\r\n" +
      "  console.log(result);\r\n" +
      "}";
  },

  filterRender: function() {
    var container = document.getElementById("filter-placeholder");
    var filter = this._getFilter(document.getElementById("filterSelector"));
    Semanticle.find(filter, {}, function(data) {
      for (var i=0; i<data.items.length; i++) {
        Semanticle.card(data.items[i].id, {
          cardLayout: "side",
          cardSideGalleryHeight: 104
        }, container, i > 0);
      }
    })
  },

  filterOpen: function() {
    var container = document.getElementById("filter-placeholder");
    var filter = this._getFilter(document.getElementById("filterSelector"));
    Semanticle.openQuery("Результаты поиска", filter)
  },

  filterJSON: function() {
    var container = document.getElementById("filter-placeholder");
    var filter = this._getFilter(document.getElementById("filterSelector"));
    Semanticle.find(filter, {}, function(data) {
      container.innerHTML = "<pre>" + JSON.stringify(data) + "</pre>";
    });
  },

  selectCardLayout: function(event) {
    var container = document.getElementById("card-placeholder");
    var codeContainer = document.getElementById("card-layout-code");
    var value = event.target.value;
    var cardId = "574b1100b7e212d33bf4b8fd";
    var settings = {
      cardLayout: value
    };
    switch(value) {
      case "inside":
      case "top":
        settings.cardGalleryProportionHorizontal = 16;
        settings.cardGalleryProportionVertical = 9;
        break;
      case "mini":
        break;
      case "side":
      default:
        settings.cardLayout = "side";
        settings.cardSideGalleryHeight = 104;
        break;
    }
    var settingString = JSON.stringify(settings)
      .replace(/([\{\,])/g, "$1\r\n  ")
      .replace("}", "\r\n}");

    codeContainer.innerHTML =
      "Semanticle.card(\"" + cardId + ", "
      + settingString
      + ", document.getElementById(\"card-placeholder\");";

    Semanticle.card("574b1100b7e212d33bf4b8fd", settings, container);
  },

  displayCard: function() {
    var container = document.getElementById("card-placeholder");
    var selector = document.getElementById("layoutSelector");
    var settings = {
      cardLayout: selector.value,
      cardIsland: "yes",
      cardSideGalleryHeight: 142,
      cardGalleryProportionHorizontal: 16,
      cardGalleryProportionVertical: 9
    };
    Semanticle.card("574b1100b7e212d33bf4b8fd", settings, container);
    return false;
  },

  onCardClick: function(semanticleId) {
    if (semanticleId instanceof HTMLElement) {
      semanticleId = semanticleId.getAttribute("data-semanticle-id")
    }
    Semanticle.openSemanticle(semanticleId);
  }
};