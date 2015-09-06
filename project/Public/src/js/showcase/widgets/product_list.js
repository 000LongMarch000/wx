define(function(require, exports, module){
  var tpl = require('../tpls/product.tpl'),
      editor_tpl = require('../tpls/product_list_editor.tpl'),
      TagSelector = require('../../m.tagselector'),
      Base = require('./base'),
      utils = require('../utils');

  var MAX_PDTS = 12;

  Handlebars.registerHelper('pdt_list_select', function(show_count){
    var str = '<select class="select" name="data.show_count">';
    for (var i = 1; i <= MAX_PDTS; i++) {
      str += '<option value="' + i + '" ' + (show_count == i ? 'selected' : '') + '>' + i + '</option>';
    };
    str += '</select>';

    return new Handlebars.SafeString(str);
  });

  var Pdt = Backbone.Model.extend({
    defaults: {
      id: '',
      img: '',
      url: '',
      name: ''
    }
  });

  var PdtCollection = Base.Collection.extend({
    url: '/admin/api/getproducts',
    model: Pdt,

    parse: function(res){
      var ret = [];
      if (res.data) ret = res.data.data || [];
      return ret;
    }
  });

  var Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults, {
      wgt_def_id: 'product_list',
      data: {
        pdt_infos: [],
        pdt_filter_type: 'all',
        pdt_filter: '',
        pdt_sort: 'updated_at',
        show_count: '4',
        show_type: '2col',
        show_pdt_name: true,
        show_buy_btn: true
      }
    }),

    toJSON: function(){
      var ret = Base.Model.prototype.toJSON.apply(this, arguments);
      delete ret.data.pdt_infos;
      delete ret.data.tag_infos;

      return ret;
    },

    getFilter: function(){
      var ret = {
            limit: 12,
            sort: this.get('data.pdt_sort'),
            type: this.get('data.pdt_filter_type')
          },
          filter = this.get('data.pdt_filter');
      if (!!filter) ret.filter = filter;

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

  var View = Base.View.extend({
    template: Handlebars.compile(tpl),

    render: function(){
      var model = this.model,
          data = $.extend(true, {}, model.attributes),
          showCount = data.data.show_count,
          pdtInfos = data.data.pdt_infos;

      data.data.pdt_infos = pdtInfos.slice(0, showCount);

      Base.View.prototype.render.call(this, data);

      //demo data
      var infos = this.model.get('data.pdt_infos');
      if (!infos || !infos.length) {
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

  var EditorView = Base.EditorView.extend({
    events: _.extend({}, Base.EditorView.prototype.events, {
      'change input[name="data.pdt_filter_type"]': 'changeFilterType'
    }),

    template: Handlebars.compile(editor_tpl),

    initialize: function(){
      this._selectors = {};
      Base.EditorView.prototype.initialize.call(this);

      var model = this.model,
          collection = new PdtCollection(model.get('data.pdt_infos')),
          $loading,
          latern = utils.latern,
          updatePdts = function(data){
            var pdt_infos = collection.toJSON();
            model.set('data.pdt_infos', pdt_infos);
          },
          fetchData = function(){
            if (!$loading) {
              $loading = $('<div class="loading loading-indicator"></div>').appendTo('#wgt_' + model.cid);
            }
            collection.fetch({
              data: model.getFilter(),
              success: updatePdts,
              reset: true
            }).complete(function(){
              if ($loading) $loading.remove();
              $loading = null;
            });
          };

      if (model.isNew()) {
        fetchData();
      }

      this.listenTo(this.model, 'change:data.pdt_sort change:data.pdt_filter', latern(fetchData, null, 700));
    },

    render: function(){
      Base.EditorView.prototype.render.call(this);
      this.$selectors = this.$el.find('.ctls-selector');

      var type = this.model.get('data.pdt_filter_type');
      this.showSelector(type);

      return this;
    },

    changeFilterType: function(e){
      var type = $(e.currentTarget).val(),
          selector = this.showSelector(type);

      if (type == 'all') {
        this.model.set('data.pdt_filter', '', { slient: true });
      } else {
        var val = selector.getValue();
        if (!val) val = '';
        if (_.isArray(val)) val = val.join();

        this.model.set('data.pdt_filter', val);
      }
    },

    showSelector: function(type){
      var selector = this.getSelector(type);
      _.each(this._selectors, function(sel, name){
        if (name == 'all') return;

        if (name == type) sel.$el.show();
        else sel.$el.hide();
      });

      return selector;
    },

    getSelector: function(type){
      var self = this,
          selector = this._selectors[type];

      if (selector) return selector;
      var $cont = $('<div class="ctl-selector"></div>').appendTo(this.$selectors);

      switch(type) {
        case 'all':
          selector = null;
          break;
        case 'tags':
          var selectedIds = self.model.get('data.pdt_filter');
          tagSelector = new TagSelector({
            el: $cont,
            url: '/admin/api/tags',
            selectedIds: self.model.get('data.pdt_filter').split(",")
          });

          tagSelector.on('update', function(tags){
            if (self.model.get('data.pdt_filter_type') == 'tags') {
              self.model.set('data.pdt_filter', tags.join(','));
            }
          });

          selector = tagSelector;
          break;
        default:
      }

      this._selectors[type] = selector;

      return selector;
    },

    remove: function(){
      if (this._lastReq) this._lastReq.abort();
      if (this.tagSelector) this.tagSelector.remove();
      Base.EditorView.prototype.remove.call(this);
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});