define(function(require, exports, module){
  var tpl = require('../tpls/statusbar.tpl'),
      editor_tpl = require('../tpls/statusbar_editor.tpl'),
      Base = require('./base');

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults,{
      container: '',
      wgt_def_id: 'statusbar',
      data: {
        title: '',
        share_title: '',
        share_desc: ''
      }
    })
  });

  var View = Base.View.extend({
    className: '',
    template: Handlebars.compile(tpl),

    initialize: function(){
      this.render();
    }
  });

  var EditorView = Base.EditorView.extend({
    template: Handlebars.compile(editor_tpl)
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});