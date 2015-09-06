define(function(require, exports, module){
  var tpl = require('../tpls/board.tpl'),
      editor_tpl = require('../tpls/board_editor.tpl'),
      Base = require('./base');

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults, {
      wgt_def_id: 'board',
      data: {
        title_txt: '请添加标题',
        body_txt: '请添加内容'
      }
    }),
    validation: {
      'data.title_txt': { maxLength: 8 },
      'data.body_txt': { maxLength: 500 }
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