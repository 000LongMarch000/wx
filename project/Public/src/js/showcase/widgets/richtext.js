define(function(require, exports, module){
  var tpl = require('../tpls/richtext.tpl'),
      editor_tpl = require('../tpls/richtext_editor.tpl'),
      Base = require('./base');

  var Model = Base.Model.extendWithDefaults({
        wgt_def_id: 'richtext',
        data: {
          text_html: '请添加文字'
        }
      }, {
        validation: {
          'data.text_html': { maxLength: 102400 }
        }
      });

  var View = Base.View.extendWithTpl(tpl);

  var EditorView = Base.EditorView.extendWithTpl(editor_tpl, {
    render: function(){
      Base.EditorView.prototype.render.apply(this, arguments);

      var assets_path = WD_CONFS.assets_path,
          keId = '#' + this.model.cid + '-rtext',
          self = this;

      if (!window.KindEditor) {
        require.async(WD_CONFS.assets_path + '/kindeditor/kindeditor-min.js', function(){
          createEditor(keId, KindEditor);
        });
      } else {
        createEditor(keId, KindEditor);
      }

      function createEditor(el, K){
        K.create(el, {
          width: '100%',
          height: '450px',
          resizeType: 0,
          themeType: 'simple',
          items: ['undo', 'redo', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                      'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                      'insertunorderedlist', '|', 'table', '|', 'link'],
          afterCreate: function(){
            self.show();
          },
          afterChange: _.debounce(function(){
            this.sync();

            //手动更新
            $(this.srcElement).trigger('change');
          }, 300)
        });
      }
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});