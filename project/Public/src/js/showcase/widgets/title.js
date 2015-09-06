define(function(require, exports, module){
  var tpl = require('../tpls/title.tpl'),
      editor_tpl = require('../tpls/title_editor.tpl'),
      CtlColor = require('../ctls/color'),
      CtlLink = require('../ctls/link'),
      Base = require('./base');

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults, {
      wgt_def_id: 'title',
      data: {
        text_txt: '请添加文字',
        align: 'left',
        link_type: 'none',
        link_id: '',
        link_name: '',
        link_url: ''
      },
      style: {
        'color': '',
        'background-color': ''
      }
    }),
    validation: {
      'data.text_txt': {
        maxLength: 15
      }
    }
  });

  var DEFAULT_COLORS = {
    'color': '#4b4b4b',
    'background-color': '#ffffff'
  };

  var View = Base.View.extend({
    template: Handlebars.compile(tpl)
  });

  var EditorView = Base.EditorView.extend({
    template: Handlebars.compile(editor_tpl),

    render: function(){
      Base.EditorView.prototype.render.apply(this, arguments);
      var self = this;

      this.$el.find('.ctl-link-wrap').each(function(){
        var data = self.model.getData(),
            ctlLink = new CtlLink({ data: data, el: this });

        self.addCtl(ctlLink);
        ctlLink.bindUpdate(self);
      });

      this.$el.find('.ctl-color-wrap').each(function(i){
        var name = i == 0 ? 'color' : 'background-color',
            color = self.model.get('style.' + name) || DEFAULT_COLORS[name] || '';

        var ctlColor = new CtlColor({ el: this, data: { color: color } });
        self.addCtl(ctlColor);
        ctlColor.on('update', function(color){
          self.model.set('style.' + name, color);
        });
      });
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});