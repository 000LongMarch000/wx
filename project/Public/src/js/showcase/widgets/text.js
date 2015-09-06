define(function(require, exports, module){
  var tpl = require('../tpls/text.tpl'),
      editor_tpl = require('../tpls/text_editor.tpl'),
      Base = require('./base');

  var Model = Base.Model.extendWithDefaults({
        wgt_def_id: 'text',
        data: {
          text_txt: '请添加文字'
        }
      }, {
        validation: {
          'data.text_txt': { maxLength: 2000, required: true }
        }
      });

  var View = Base.View.extendWithTpl(tpl);

  var EditorView = Base.EditorView.extendWithTpl(editor_tpl);

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});