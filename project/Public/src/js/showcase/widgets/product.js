define(function(require, exports, module){
  var tpl = require('../tpls/product.tpl'),
      editor_tpl = require('../tpls/product_editor.tpl'),
      pdt_items_tpl = require('../tpls/product_items.tpl'),
      Selector = require('../../selector/index'),
      Base = require('./base'),
      utils = require('../utils');

  var MAX_PDTS = 12;

  var Pdt = Backbone.Model.extend({
    defaults: {
      id: '',
      img: '',
      name: '',
      price: ''
    }
  });

  var PdtCollection = Base.Collection.extend({
    model: Pdt,

    initialize: function(){
      this.on('add', this.restrictSize);
    },

    restrictSize: function(model){
      if (this.models.length > MAX_PDTS) {
        this.pop(model);
        $.notify('最多添加 ' + MAX_PDTS + ' 个商品');
      }
    },

    setFromSelector: function(data){
      var self = this;
      data = _.map(data, function(item){
        var oldItem = self.get(item.id),
            ret;
        if (oldItem) ret = _.extend(oldItem, item);
        else ret = _.pick(item, 'id', 'img', 'name', 'price');

        return ret;
      });

      this.set(data);
      this.trigger('set', this);
    }
  });

  var PdtListView = Backbone.View.extend({
    template: Handlebars.compile(pdt_items_tpl),

    events: {
      'click .btn-select': 'openSelector',
      'click .btn-del': 'removeItem'
    },

    initialize: function(){
      this.render();
      this.listenTo(this.collection, 'set', utils.latern(this.render, this, 300));
    },

    render: function(){
      var items = this.collection.toJSON(),
          self = this,
          sp;

      this.$el.empty().html(this.template({ items: items }));

      if (!this._sortableInited) {
        this._sortableInited = true;
        this.$el.sortable({
          items: '.item',
          update: function(e, ui){
            var collection = self.collection,
                item = ui.item,
                id = item.data('id'),
                to = item.index();

            var model = collection.moveModel(id, to);
            collection.trigger('change', model, collection);
          }
        });
      } else {
        this.$el.sortable('refresh');
      }
    },

    removeItem: function(e){
      var $item = $(e.currentTarget).closest('.item'),
          id = $item.data('id'),
          collection = this.collection;
      if (id) {
        collection.remove(id);
        $item.remove();
      }
    },

    openSelector: function(){
      var self = this;

      new Selector({
        type: 'products',
        data: this.collection.pluck('id'),
        options: {
          multiple: true,
          max: MAX_PDTS
        },
        callback: function(data){
          self.collection.setFromSelector(data);
        }
      }).popup();
    }
  });

  var Product = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults,{
      wgt_def_id: 'product',
      data: {
        pdt_infos: [],
        pdt_ids: [],
        show_type: '2col',
        show_pdt_name: true,
        show_buy_btn: true
      }
    }),

    initialize: function(){
      var self = this;
      this.on('change:data.pdt_infos', function(model, infos){
        var pdt_ids = _.pluck(infos, 'id');
        self.set('data.pdt_ids', pdt_ids, { silent: true });
      });
    },

    toJSON: function(){
      var ret = Base.Model.prototype.toJSON.apply(this, arguments);
      delete ret.data.pdt_infos;

      return ret;
    },

    demoData: function(){
      var ret = _.clone(this.toJSON()),
          type = this.get('data.show_type'),
          pdt_infos = [],
          times = type == '2col' ? 4 : 3;

      _.times(times, getItem);
      ret.data.pdt_infos = pdt_infos;

      return ret;

      function getItem(){
        var model = new Pdt({ name: '我是商品名称', price: '666.00' });
        pdt_infos.push(model.toJSON());
      }
    }
  });

  var ProductView = Base.View.extend({
    template: Handlebars.compile(tpl),

    render: function(){
      Base.View.prototype.render.call(this);

      //demo data
      var pdt_ids = this.model.get('data.pdt_ids');
      if (!pdt_ids || !pdt_ids.length) {
        data = this.model.demoData();
        this.$el.html(this.template(data));
      }

      var type = this.model.get('data.show_type') || '2col';
      if (type == '1b2s') {
        this.$el.find('.item').each(function(idx){
          if (idx % 3 == 0) {
            $(this).addClass('item-big');
          }
        });
      }

      return this;
    }
  });

  var ProductEditorView = Base.EditorView.extend({
    template: Handlebars.compile(editor_tpl),

    initialize: function(){
      Base.EditorView.prototype.initialize.call(this);

      var pdtCollection = new PdtCollection(this.model.get('data.pdt_infos'));

      this.pdtListView = new PdtListView({
        el: this.$el.find('.pdts-list-editor'),

        collection: pdtCollection
      });

      this.listenTo(pdtCollection, 'change add remove', function(){
        this.model.set('data.pdt_infos', this.pdtListView.collection.toJSON());
      });
    },

    remove: function(){
      this.pdtListView.remove();
      Base.EditorView.prototype.remove.call(this);
    }
  });

  exports.Model = Product;
  exports.View = ProductView;
  exports.EditorView = ProductEditorView;
});