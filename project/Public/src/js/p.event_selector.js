define(function(require, exports, module){
  require('./m.dialog')($);
  require('./m.switcher')($);

  var Pager = require('./m.pagination'),
      tpl = require('./tpls/event_selector.tpl'),
      listTpl = '<ul>{{#each items}}<li class="item" data-name="{{name}}" data-url="{{url}}">{{#ifCond published "==" 0}}<div class="disabled-icon">已下架</div>{{/ifCond}}{{#if img}}<img class="item-img" src="{{img}}?imageView2/0/w/160/h/160">{{/if}}<span class="item-name">{{name}}</span><i class="ico ico-item-hl"></i></li>{{else}}<li class="item-nil"><p class="note">暂无数据</p></li>{{/each}}</ul>';

  var EventSelector = function(){
    return this.init.apply(this, arguments);
  };

  EventSelector.prototype = {
    init: function(opts){
      this.opts = $.extend({
        data: {},
        title: '请选择活动或商品'
        //onSelect: function(){}
        //onClose: function(){}
        //onShow: function(){}
      }, opts || {});
      this.tpls = {
        main: Handlebars.compile(tpl),
        listTpl: Handlebars.compile(listTpl)
      };
      this.pagers = {};
      var urls = this.urls = {};
      if (this.opts.data.types) _.each(this.opts.data.types, function(item){
        urls[item.key] = item.url;
      });

      this.render().bindEvents();
      return this;
    },

    render: function(){
      var opts = this.opts,
          html = this.tpls.main(opts.data),
          self = this;

      this.$el = $(html).appendTo(document.body);
      this.dlg = $.dlg(this.$el, {
        title: opts.title,
        width: 900,
        draggable: true
      });

      this.$menus = this.$el.find('.media-menus');

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.switcher({
        tabCls: '.event-types .item',
        itemCls: '.event-comp',
        onShow: function(idx, tabs, items){
          var $tab = tabs.eq(idx),
              type = $tab.data('type');
          if (!self.pagers[type]) self.initPager(type, items.eq(idx));
          self.curIdx = idx;
        }
      });

      this.$el
          .on('click', '.event-comp .item', _.bind(this.selectItem, this))
          .on('click', '.btn-save', _.bind(this.onSave, this));

      this.$el.find('.media-search').on('submit', _.bind(this.search, this));
      this.$el.find('.products-frame').switcher({
        tabCls: '.tab a',
        itemCls: '.items-cont',
        onShow: function(idx, tabs){
          if (idx <= 0) {
            self.$menus.find('[name=key_word]').val('');
            tabs.slice(1).hide();
          }
        }
      });

      return this;
    },

    selectItem: function(e){
      var $el = $(e.currentTarget),
          opts = this.opts;
      $el.addClass('active').siblings('.active').removeClass('active');
      if (opts.onSelect) opts.onSelect.call(this, $el[0]);
    },

    onSave: function(){
      var $item = this.$el.find('.events-list .active:visible'),
          opts = this.opts,
          data = null;

      if ($item.length) {
        data = {
          name: $item.data('name'),
          url: $item.data('url')
        };
      }
      if (opts.onSave) opts.onSave.call(this, data, $item);
      this.hide();

      return this;
    },

    show: function(){
      this.dlg.show.apply(this.dlg, arguments);
      if (this.opts.onShow) this.opts.onShow();

      return this;
    },

    hide: function(){
      this.dlg.hide.apply(this.dlg, arguments);
      if (this.opts.onHide) this.opts.onHide();

      return this;
    },

    close: function(){
      return this.hide();
    },

    initPager: function(type, panel){
      var listTpl = this.tpls.listTpl,
          url = this.urls[type];

      if (!url) {
        if (console) console.error('list API not found, type: ' + type);
        return this;
      }

      var pager = new Pager(panel.find('.pagination'), {
        contentEl: panel.find('.items'),
        url: url,
        success: function(res){
          var html = listTpl({ items: res.data });
          panel.find('.items').html(html);
        }
      });

      this.pagers[type] = pager;

      return this;
    },

    search: function(e){
      e.preventDefault();
      var $form = $(e.currentTarget),
          $cont = this.$menus.siblings('.items-search-cont'),
          $tab = this.$menus.find('.tab-search a').show().click(),
          url = $form.attr('action') + '?limit=10&' + $form.serialize(),
          noteMsg = '没有符合条件的搜索结果，请换其他关键词',
          listTpl = this.tpls.listTpl,
          self = this;

      $cont.empty().html('<div class="items product-items"><p class="note"></p></div><div class="pagination"></div>');

      new Pager($cont.find('.pagination'), {
        contentEl: $cont.find('.items'),
        url: url,
        success: function(res){
          if (res.data && res.data.length) {
            var data = res.data;
            _.each(data, function(item){
              item.name = item.title;
            });
            var html = listTpl({ items: data });
            $cont.find('.items').html(html);
          } else {
            $cont.find('.items').html('<p class="note">'+noteMsg+'</p>');
          }

          if (res.count) $tab.text('搜索结果('+res.count+')');
        }
      });

      return this;
    }
  };

  module.exports = EventSelector;
});