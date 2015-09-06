define(function(require, exports, module){
  var Widgets = {
    audio: require('./audio'),
    base: require('./base'),
    biz: require('./biz'),
    board: require('./board'),
    division: require('./division'),
    image: require('./image'),
    map: require('./map'),
    product: require('./product'),
    product_list: require('./product_list'),
    richtext: require('./richtext'),
    share: require('./share'),
    shop: require('./shop'),
    statusbar: require('./statusbar'),
    telephone: require('./telephone'),
    text: require('./text'),
    title: require('./title'),
    video: require('./video')
  };

  var cached = {
    Model: {},
    View: {},
    EditorView: {}
  };

  _.each(Widgets, function(obj, name){
    register(name, obj);
  });

  function register(name, type, klass){
    if (_.isObject(type)) {
      _.each(type, function(klass, type){
        register(name, type, klass);
      });
    } else {
      //type: Model | View | EditorView;
      if (!cached[type] || cached[type][name] != undefined) return false;
      cached[type][name] = klass;
    }

    return cached;
  }

  module.exports = {
    cached: cached,

    register: register,

    getView: function(type){
      return cached.View[type];
    },

    getModel: function(type){
      return cached.Model[type];
    },

    getEditorView: function(type){
      return cached.EditorView[type];
    }
  };

});