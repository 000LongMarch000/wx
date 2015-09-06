define(function(require, exports, module){
  var Page = require('./page'),
      Helpers = require('./helpers')(Handlebars),
      Widgets = require('./widgets/index');

  //add validation to models
  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

  function init(params){
    params = params || {};

    var model = new Page.Model(params.data);
    var page = new Page.View({
      model: model,
      widgets: params.widgets || []
    });

    return page;
  }

  module.exports = {
    init: init,
    registerBiz: Page.registerBiz,
    Widgets: Widgets
  };

});