define(function(require, exports, module){
  var tpl = require('../tpls/image.tpl'),
      editor_tpl = require('../tpls/image_editor.tpl'),
      img_items_tpl = require('../tpls/image_items.tpl'),
      Selector = require('../../selector/index'),
      Base = require('./base'),
      utils = require('../utils'),
      CtlLink = require('../ctls/link');

  var MAX_IMGS = 6;

  var Img = Backbone.Model.extend({
    defaults: {
      id: '',
      img: '',
      link_type: 'none',
      link_id: '',
      link_name: '',
      link_url: ''
    }
  });

  var ImgCollection = Base.Collection.extend({
    model: Img,

    initialize: function(){
      this.on('add', this.restrictSize);
    },

    setFromSelector: function(data){
      var self = this;
      data = _.map(data, function(item){
        var oldItem = self.get(item.id),
            ret;
        if (oldItem) ret = _.extend(oldItem, item);
        else ret = { id: item.id, img: item.url };

        return ret;
      });

      this.set(data);
      this.trigger('set', this);
    },

    restrictSize: function(model){
      if (this.models.length > MAX_IMGS) {
        this.pop(model);
        $.notify('最多添加 ' + MAX_IMGS + ' 张图片');
      }
    },

    json: function(){
      return _.map(this.models, function(model){
        var ret = model.toJSON();
        ret.cid = model.cid;

        return ret;
      });
    }
  });

  var ImgListView = Backbone.View.extend({
    template: Handlebars.compile(img_items_tpl),

    events: {
      'click .btn-select': 'openSelector',
      'click .btn-del': 'removeItem',
      'click .img': 'editItem'
    },

    initialize: function(){
      this.render();
      this.listenTo(this.collection, 'set', this.render);
    },

    render: function(){
      var items = this.collection.json(),
          $el = this.$el,
          self = this;

      $el.empty().html(this.template({ items: items }));
      $el.find('.img-url').each(function(i){
        var item = items[i],
            ctlLink = new CtlLink({ data: item }),
            cid = item.cid;
        ctlLink.on('update', function(data){
          var model = self.collection.get(cid);
          if (model && data) model.set(data);
        });
        $(this).append(ctlLink.$el);
      });

      if (!this._sortableInited) {
        this._sortableInited = true;
        this.$el.sortable({
          items: '.item',
          update: function(e, ui){
            var collection = self.collection,
                item = ui.item,
                id = item.data('cid'),
                to = item.index();

            var model = collection.moveModel(id, to);
            collection.trigger('change', model, collection);
          }
        });
      } else {
        this.$el.sortable('refresh');
      }
    },

    openSelector: function(){
      var self = this;

      new Selector({
        type: 'images',
        data: this.collection.pluck('id'),
        options: {
          multiple: true,
          max: MAX_IMGS
        },
        callback: function(data){
          self.collection.setFromSelector(data);
        }
      }).popup();
    },

    removeItem: function(e){
      var $item = $(e.currentTarget).closest('.item'),
          id = $item.data('cid'),
          collection = this.collection;
      if (id) {
        collection.remove(id);
        $item.remove();
      }
    },

    editItem: function(e){
      var $el = $(e.currentTarget),
          $item = $el.closest('.item'),
          id = $item.data('cid'),
          self = this;
      if (!id) return;

      var model = this.collection.get(id);

      new Selector({
        type: 'images',
        data: model.get('id'),
        callback: function(data){
          if (!data) return;

          model.set({
            id: data.id,
            img: data.url
          });
          self.render();
        }
      }).popup();
    }
  });

  var ImageModel = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults,{
      wgt_def_id: 'image',
      data: {
        imgs: [],
        show_type: '2col'
      }
    }),

    demoData: function(){
      var ret = _.clone(this.toJSON()),
          type = this.get('data.show_type'),
          imgs = [],
          times = type == '2col' ? 4 : 3;

      _.times(times, getItem);
      ret.data.imgs = imgs;

      return ret;

      function getItem(){
        var model = new Img();
        imgs.push(model.toJSON());
      }
    }
  });

  var ImageView = Base.View.extend({
    template: Handlebars.compile(tpl),

    render: function(){
      Base.View.prototype.render.call(this);

      var imgs = this.model.get('data.imgs');
      if (!imgs || !imgs.length) {
        this.$el.html(this.template(this.model.demoData()));
      }

      return this;
    }
  });

  var ImageEditorView = Base.EditorView.extend({
    template: Handlebars.compile(editor_tpl),

    initialize: function(){
      Base.EditorView.prototype.initialize.call(this);

      var collection = new ImgCollection(this.model.get('data.imgs'));

      this.listView = new ImgListView({
        el: this.$el.find('.imgs-list-editor'),

        collection: collection
      });

      this.listenTo(collection, 'change', function(model, options){
        var options = {};

        //url && url_type change, view will not update
        if (model && model.changed && (model.changed.link_url != undefined || model.changed.link_type != undefined)) options.silent = true;
        this.model.set('data.imgs', this.listView.collection.toJSON(), options);
      });

      this.listenTo(collection, 'add remove', utils.latern(function(model, collection, options){
        this.model.set('data.imgs', collection.toJSON());
        this.show();
      }, this));
    },

    remove: function(){
      this.listView.remove();
      Base.EditorView.prototype.remove.call(this);
    }
  });

  exports.Model = ImageModel;
  exports.View = ImageView;
  exports.EditorView = ImageEditorView;
});