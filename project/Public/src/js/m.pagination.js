define(function(require, exports, module){

  var Pager = function(el, opts){
    this.el = $(el);
    if (!this.el.length) return false;
    this.opts = $.extend(true, {
      label: {
        first: '首页',
        prev: '«',
        next: '»',
        last: '末页'
      },
      contentEl: '',
      loadingIndicator: true,
      data: null,
      ajax: true,
      type: 'GET',
      url: '',
      cache: false,
      start: 1,
      max: 10,
      align: ''
    }, opts || {});

    this.init.apply(this, arguments);
    
    if (this.opts.ajax) {
      this.pager(this.opts.start);
      this.bindEvents();
    }

    return this;
  };

  Pager.prototype = {

    init: function(){

      if (!this.el.hasClass('pagination')) this.el.addClass('pagination');
      this.ul = this.el.children('ul').length;
      if (!this.ul.length) this.ul = $('<ul />').appendTo(this.el);

      var self = this,
          opts = this.opts;

      this.cur = this.total = this.opts.start;
      this.url = this.opts.url;
      this.contentEl = $(this.opts.contentEl);
      this.inited = false;
      this.busy = false;
      this.ajaxMethod = opts.type.toLowerCase() == 'get' ? 'get' : 'post';
      if (this.opts.data) this.data = this.opts.data;
      if (opts.align == 'right') {
        this.el.addClass('pagination-right');
      } else if (opts.align == 'center') {
        this.el.addClass('pagination-center');
      }
      
      return this;
    },

    bindEvents: function(){
      var self = this;

      this.el.delegate('li a', 'click', function(e){
        e.preventDefault();
        if (self.busy) return false;

        var $this = $(this);
        if ($this.hasClass('disabled')) return false;

        var to = +$this.data('page');
        if (!to) return false;

        self.pager(to);
      });

      return this;
    },

    setData: function(params){
      if (typeof params == 'string') {
        var pairs = params.split('&'),
            data = {};
        if (pairs.length) {
          $.each(pairs, function(i, pair){
            var kv = pair.split('=');
            if (kv[1]) {
              data[kv[0]] = kv[1];
            }
          });
          this.data = data;  
        }
      } else {
        this.data = params;
      }

      return this;
    },
    
    load: function(url, params){
      if (this.busy) return false;
      this.busy = true;

      url = url || this.url;
      var self = this,
          opts = this.opts,
          type = this.ajaxMethod;
          
      params = $.extend({
        page: self.cur
      }, self.data, params || {});
      if (this.opts.loadingIndicator && this.contentEl.length) {
        var offset = this.contentEl.offset();
        this.loading = $('<div class="pagination-loading"></div>').css({
          position: 'absolute',
          zIndex: 999,
          left: offset.left,
          top: offset.top,
          width: this.contentEl.width(),
          height: this.contentEl.height()
        }).appendTo(document.body);
      }
          

      $.ajax({
        url: url,
        data: params,
        type: type,
        dataType: 'json',
        cache: opts.cache,
        success: function(data){
          self.busy = false;
          self.loading && self.loading.remove();
          self.total = data.total_pages;
          self.render();
          self.opts.success && self.opts.success.call(self, data, self.cur);
        },
        error: function(e){
          self.busy = false;
          self.loading && self.loading.remove();
          self.opts.error && self.opts.error();
        },
        beforeSend: function(){
          self.opts.beforeSend && self.opts.beforeSend();
        }
      });

      return this;
    },

    pager: function(to){
      if (this.busy) return false;
      this.cur = parseInt(to, 10) || 1;
      if (this.inited) this.render();
      
      return this.load();
    },

    render: function(){
      var self = this,
          label = this.label,
          opts = this.opts,
          half = Math.floor(opts.max/2),
          start = 1,
          end = opts.max,
          ul = this.ul;

      if (this.cur - half > 0) {
        start = this.cur - half;
        end = this.cur + half - 1;
      }
      if (this.cur + half > this.total) {
        start = this.total - opts.max + 1;
        end = this.total;
      }

      start = Math.max(1, start);
      end = Math.min(this.total, end);

      ul.empty();
      if (this.total <= 0) return false;

      if (opts.label.first) ul.append(this.renderButton('first'));
      ul.append(this.renderButton('prev'));
      var html = [];
      for (var i=start; i <= end; i++) {
        if (this.cur == i) html.push('<li><span class="active">'+i+'</span></li>');
        else html.push('<li><a href="#" data-page="'+i+'">'+i+'</a></li>');
      }
      ul.append(html.join(''));
      ul.append(this.renderButton('next'));
      if (opts.label.last) ul.append(this.renderButton('last'));

      this.inited = true;
    },
    
    // renderTurn: function(){
    //   var self = this,
    //       html = '<span class="page-turn">到第<input type="text" class="input_bgC" size="2" />页 <a class="page-btn page-turn" href="#">跳转</a></span>';
    //   this.el.append(html);
    // },

    renderButton: function(type){
      var self = this,
          label = this.opts.label,
          disabled = false,
          page = 0;

      if (type == 'first' || type == 'prev') {
        if (this.cur <= 1) disabled = true;
        page = type == 'prev' ? this.cur - 1 : 1;
      } else {
        if (this.cur >= this.total) disabled = true;
        page = type == 'next' ? this.cur + 1 : this.total;
      }
      page = Math.max(1, Math.min(page, this.total));
      btn = '<li' + (disabled ? ' class="disabled"' : '') + '><a href="#" ' + ( disabled ? '' : (' data-page="' + page + '"') ) + '>' + label[type] + '</a></li>';
      return btn;
    }
  };

  return Pager;
});