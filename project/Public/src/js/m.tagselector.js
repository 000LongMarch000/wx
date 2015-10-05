//require backbone

define(function(require, exports, module){
  var tpl = require('./tpls/tag_selector.tpl');

  var TagModel = Backbone.Model.extend({
    defaults: {
      name: ''
    }
  });

  var TagsCollection = Backbone.Collection.extend({
    model: TagModel,

    getTagIds: function(){
      var tags = _.chain(this.models).filter(function(model){
        return model.get('selected');
      }).map(function(model){
        return model.get('id');
      }).value();

      return tags;
    },

    getTagNames: function(){
      var tags = _.chain(this.models).filter(function(model){
        return model.get('selected');
      }).map(function(model){
        return model.get('name');
      }).value();

      return tags;
    }
  });

  var TagSelector = Backbone.View.extend({
    events: {
      'click .handler': 'showSelector',
      'click .selected-tags .del': 'removeSelected',
      'change .tag-selector :checkbox': 'toggleTag',
      'mouseleave .tag-selector': 'hideSelector',
      'mouseenter .tag-selector': 'showSelector'
    },

    template: Handlebars.compile(tpl),

    initialize: function(options){
      var self = this;
      options = _.extend({
        data: [],
        url: '',
        selectedIds: [],
        loadingText: '正在加载...'
      }, options || {});

      this.options = options;

      var data = this.process(options.data, options.selectedIds);
      this.collection = new TagsCollection(data);
      this.render();
      if (options.url) {
        this.$el.html(options.loadingText);
        WD.ajax({
          url: options.url,
          success: function(data){
            data = self.process(data, options.selectedIds);
            self.collection.reset(data);
            self.render();
            self.trigger('init');
          }
        });
      } else {
        this.render();
        this.trigger('init');
      }

      this.listenTo(this.collection, 'change:selected', this.refreshSelected);
    },

    process: function(items, ids){
      var dict = {};

      _.each(ids, function(id){
        dict[id] = true;
      });

      _.each(items, function(item){
        if (dict[item.id]) {
          item.selected = true;
        }
      });

      return items;
    },

    render: function(){
      var data = {
        tags: this.collection.toJSON(),
        cid: this.cid
      };

      this.$el.html(this.template(data));
      this.$selected = this.$el.find('.selected-tags .tags-list');
      this.$selector = this.$el.find('.tag-selector');
      this.$selectedWrap = this.$el.find('.selected-tags');

      if (!this.collection.findWhere({ selected: true })) this.$selectedWrap.hide();
    },

    removeSelected: function(e){
      var $item = $(e.currentTarget).closest('.item'),
          id = $item.data('id'),
          model = this.collection.get(id);

      $item.remove();
      model.set('selected', false);

      var $input = this.$selector.find('input[data-id="'+id+'"]');
      $input.prop('checked', false);

      if (!this.$selected.find('.item').length) this.$selectedWrap.hide();

      this.trigger('update', this.collection.getTagIds(), this.collection);
    },

    showSelector: function(){
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this.$selector.show();
    },

    hideSelector: function(){
      if (this._hideTimer) clearTimeout(this._hideTimer);
      var self = this;
      this._hideTimer = setTimeout(function(){
        self.$selector.hide();
      }, 300);
    },

    toggleTag: function(e){
      var $this = $(e.currentTarget),
          id = $this.data('id'),
          model = this.collection.get(id);

      model.set('selected', $this.prop('checked'));
      this.trigger('update', this.collection.getTagIds(), this.collection);
    },

    getValue: function(){
      return this.collection.getTagIds();
    },

    refreshSelected: function(model, value, options){
      var id = model.get('id'),
          name = model.get('name');

      if (!value) {
        this.$selected.find('.item[data-id='+id+']').remove();
        if (!this.$selected.find('.item').length) this.$selectedWrap.hide();
      } else {
        this.$selectedWrap.show();
        $('<li class="item" data-id="'+id+'">'+name+'<a href="javascript:;" class="del">x</a></li>').appendTo(this.$selected);
      }
    }
  });

  module.exports = TagSelector;
});