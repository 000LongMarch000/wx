define(function(require, exports, module){
  var tpl = require('../tpls/map.tpl'),
      editor_tpl = require('../tpls/map_editor.tpl'),
      Base = require('./base'),
      CtlMap = require('../ctls/map');

  var Model = Base.Model.extendWithDefaults({
        wgt_def_id: 'map',
        data: {
          loc_center: '上海',
          loc_addr_txt: '',
          loc_marker: '',
          loc_zoom: 13
        }
      });

  var View = Base.View.extendWithTpl(tpl);

  var EditorView = Base.EditorView.extendWithTpl(editor_tpl, {
    render: function(){
      Base.EditorView.prototype.render.call(this);

      var $el = this.$el.find('.ctl-map-wrap').first(),
          model = this.model,
          ctlMap = new CtlMap({
            el: $el,
            data: this.model.getData()
          })
          self = this;

      this.addCtl(ctlMap);
      ctlMap.on('update', function(d){
        if (d.loc_addr_txt && d.loc_addr_txt != self.model.get('loc_addr_txt')) {
          var addr = d.loc_addr_txt.split(',')[1];
          if (addr) self.$el.find('input[name="data.address_txt"]').val(addr).change();
        }
      });
      ctlMap.bindUpdate(this);

      return this;
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});