define(function(require, exports, module){
  var tpl = require('../tpls/share.tpl'),
      editor_tpl = require('../tpls/share_editor.tpl'),
      CtlColor = require('../ctls/color'),
      Base = require('./base');

  var DEFAULT_COLORS = {
    share_bg: '#5ac8fa',
    favor_bg: '#f75a53'
  };

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults,{
      wgt_def_id: 'share',
      data: {
        show_share: true,
        show_favor: true,
        share_bg: '',
        favor_bg: ''
      }
    })
  });

  var View = Base.View.extend({
    template: Handlebars.compile(tpl)
  });

  var EditorView = Base.EditorView.extend({
    template: Handlebars.compile(editor_tpl),

    render: function() {
      Base.EditorView.prototype.render.call(this);

      var self = this;

      this.$el.find('.ctl-color-wrap').each(function(){
        var name = $(this).data('color'),
            color = self.model.get('data.' + name) || DEFAULT_COLORS[name] || '';

        var ctlColor = new CtlColor({ data: { color: color }, el: this });
        self.addCtl(ctlColor);
        ctlColor.on('update', function(color) {
          self.model.set('data.' + name, color);
        });
      });
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});