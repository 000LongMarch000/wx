define(function(require, exports, module){
  var tpl = require('../tpls/division.tpl'),
      editor_tpl = require('../tpls/division_editor.tpl'),
      Base = require('./base');

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults,{
      wgt_def_id: 'division',
      data: {}
    })
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