define(function(require, exports, module){
  var tpl = require('./tpls/menu.tpl'),
      MAX_WGTS = 4;

  var MenuView = Backbone.View.extend({
    template: Handlebars.compile(tpl),

    events: {
      'click .item': 'addWidget',
      'click .btn-more': 'toggleMore'
    },

    initialize: function(opts){
      this.options = _.extend({
        widgets: []
      }, opts || {});
      var widgets = this.options.widgets;

      if (widgets.length) this.render({ widgets: widgets, _more: widgets.length > MAX_WGTS });
    },

    render: function(data){
      this.$el.html(this.template(data));

      if (data.widgets && data.widgets.length > MAX_WGTS) {
        this.hideMore();
      }
      if (this.options.side) {
        this.$el.append('<i class="arr-l"><i class="arr-inner"></i></i>');
      }

      return this;
    },

    addWidget: function(e){
      var $el = $(e.currentTarget),
          type = $el.data('type');
      if (type) {
        this.trigger('addwidget', type);
      }
    },

    hideMore: function(){
      this._wgtsVisible = false;
      this.$el.find('.item').slice(MAX_WGTS).hide();
      this.$el.find('.btn-more').text('展开更多');
    },

    toggleMore: function(e){
      var $el = $(e.currentTarget),
          $more = this.$el.find('.item').slice(MAX_WGTS);
      if (this._wgtsVisible) {
        $more.hide();
        $el.text('展开更多');
      } else {
        $more.show();
        $el.text('收起');
      }
      this._wgtsVisible = !this._wgtsVisible;
    }
  });

  _.extend(MenuView, Backbone.Events);

  module.exports = MenuView;
});