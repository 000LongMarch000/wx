define(function(require, exports, module){
  var tpl = require('../tpls/telephone.tpl'),
      editor_tpl = require('../tpls/telephone_editor.tpl'),
      CtlColor = require('../ctls/color'),
      Base = require('./base');

  var Model = Base.Model.extendWithDefaults({
        wgt_def_id: 'telephone',
        data: {
          text_txt: '电话联系',
          tel_number: '',
          show_tel: false
        },
        style: {
          'color': '',
          'background-color': ''
        }
      }, {
        validation: {
          'data.text_txt': {
            maxLength: 10
          },
          'data.tel_number': {
            required: true
          }
        }
      });

  var DEFAULT_COLORS = {
    'color': '#4b4b4b',
    'background-color': '#ffffff'
  };

  var View = Base.View.extendWithTpl(tpl);

  var EditorView = Base.EditorView.extendWithTpl(editor_tpl, {
    render: function(){
      Base.EditorView.prototype.render.apply(this, arguments);

      var self = this;

      this.$el.find('.ctl-color-wrap').each(function(){
        var name = $(this).data('color-name'),
            color = self.model.get('style.' + name) || DEFAULT_COLORS[name] || '';

        var ctlColor = new CtlColor({ data: { color: color }, el: this });
        self.addCtl(ctlColor, this);
        ctlColor.on('update', function(color){
          self.model.setStyle(name, color);
        });
      });

      return this;
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});