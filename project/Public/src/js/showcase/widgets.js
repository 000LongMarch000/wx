define(function(require, exports, module){
  var Widgets = require('./widgets/index'),
      Base = require('./widgets/base');

  var WidgetsCollection = Base.Collection.extend({
    model: function(attrs, options){
      var Model = Widgets.getModel(attrs.wgt_def_id) || Widgets.getModel('base');
      return new Model(attrs, options);
    }
  });

  var WidgetsView = Backbone.View.extend({

    initialize: function(){
      this.listenTo(this.collection, 'add', this.addWidget);
      this.listenTo(this.collection, 'remove', this.removeWidget);
      this.render();
    },

    addWidget: function(model, collection, options){
      var view = this._renderWidget(model, options);

      return view;
    },

    _renderWidget: function(model, options){
      var type = model.getType(),
          View = Widgets.getView(type),
          view;

      if (View) {
        view = new View({ model: model });
        if (options && options.at) {
          var $prev = this.$el.find('.comp-field').eq(options.at);
          if ($prev.length) {
            view.$el.insertBefore($prev);
          } else {
            view.$el.appendTo(this.$el);
          }
        } else {
          view.$el.appendTo(this.$el);
        }
      }

      return view;
    },

    removeWidget: function(model){
      var cid = model.cid;
      if (!cid) return;

      $('#wgt_' + cid).remove();
    },

    render: function(){
      var _renderWidget = _.bind(this._renderWidget, this);
      this.$el.empty();
      this.collection.forEach(_renderWidget);
    }
  });

  var BizView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },

    _renderWidget: function(model, options){
      var type = model.getType(),
          View = Widgets.getView(type),
          view;

      if (View) {
        view = new View({ model: model });
        if (options && options.at) {
          var $prev = this.$el.find('.comp-field').eq(options.at);
          if ($prev.length) {
            view.$el.insertBefore($prev);
          } else {
            view.$el.appendTo(this.$el);
          }
        } else {
          view.$el.appendTo(this.$el);
        }
      }

      return view;
    },

    render: function(){
      var _renderWidget = _.bind(this._renderWidget, this);
      this.$el.empty();
      this.collection.forEach(_renderWidget);
    }
  });

  exports.Collection = WidgetsCollection;
  exports.View = WidgetsView;
  exports.BizView = BizView;
});