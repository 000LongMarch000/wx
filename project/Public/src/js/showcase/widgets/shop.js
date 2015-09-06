define(function(require, exports, module){
  var tpl = require('../tpls/shop.tpl'),
      editor_tpl = require('../tpls/shop_editor.tpl'),
      Base = require('./base');

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults,{
      wgt_def_id: 'shop',
      data: {},
      shop_info: WD_CONFS.shop_info
    }),

    toJSON: function(){
      var json = Base.Model.prototype.toJSON.call(this);
      delete json.shop_info;

      return json;
    }
  });

  var View = Base.View.extend({
    template: Handlebars.compile(tpl)
  });

  var EditorView = Base.EditorView.extend({
    template: Handlebars.compile(editor_tpl)
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});