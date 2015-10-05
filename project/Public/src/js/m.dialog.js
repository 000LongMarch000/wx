define(function(require, exports, module){
  require('./m.modal')($);

  var DlgManager = {
    uid: 0,
    dlgs: {},
    reg: function(dlg){
      this.uid ++;
      this.dlgs[this.uid] = dlg;
      return this.uid;
    },

    get: function(uid){
      return this.dlgs[uid];
    },

    remove: function(uid){
      if (this.dlgs[uid]) delete this.dlgs[uid];
    }
  };

  var DefaultOpts = {
    autoOpen: true,
    width: 400,
    height: 'auto',
    ajaxCache: true,
    animate: false,
    modal: true,
    removeOnHide: false,
    draggable: false,
    closeHandler:null,  //点击关闭按钮时的绑定事件
    zIndex: null,
    title: '',
    html: '',
    btns: '',
    primaryBtns: '确定 ok 确认 提交 保存',
    tpl: {
      bd: '',
      ft: ''
    }
  };

  var maxZIndex = function(scope, increase) {
    scope = scope || 'div';
    scope = $(scope);
    var max = 0;
    if(scope.length) {
        var pos = scope.filter(function(index){
            if(this.nodeType != 1) return;
            return $.inArray($(this).css('position'), ['absolute','relative','fixed']) > -1;
        });
        if(pos.length) {
            $.each(pos, function(i, el) {
                var z = $(el).css('z-index');
                max = Math.max(max, isNaN(z) ? 0 : z);
            });
        }
    }
    if(increase) max += parseInt(increase);
    return Math.min(max, 2147483647);
  };

  var Dlg = function(el, opts){

    if (el && (typeof el == 'string' || el.tagName || el instanceof $)) {
      this.contEl = $(el);
      this.contElVisible = this.contEl.is(':visible');
      if (!this.contEl.length) return false;
      this.contElNext = this.contEl.next();
      if (!this.contElNext.length) this.contElNext = this.contEl.prev();
    } else {
      opts = el || {};
    }

    this.opts = $.extend(true, {}, DefaultOpts, opts || {});

    this.dom = {};

    var self = this;
    this.el = $('<div class="wgt-dialog wgt-layer"><div class="wgt-layer-cont wgt-dialog-inner"></div></div>').css({
      position: 'absolute',
      display: 'none'
    }).appendTo(document.body);

    this._id = DlgManager.reg(this);
    this.el.attr('data-dlg-uid', this._id);

    this.updateSize().render(function(){
      if (self.opts.autoOpen) self.show();
      self.moveCenter();
    }).bindEvents();
  };

  Dlg._isWUI = true;

  Dlg.prototype = {
    render: function(cb){
      var dom = this.dom,
          opts = this.opts,
          tpl = opts.tpl,
          self = this;

      dom.inner = this.el.find('.wgt-dialog-inner');
      dom.hd = $('<div class="hd"><a class="close" href="#"><i class="iconfont">&#xe621;</i></a><h3>'+opts.title+'</h3></div>').appendTo(dom.inner);
      dom.bd = $('<div class="bd"></div>').appendTo(dom.inner);
      dom.ft = $('<div class="ft"></div>').appendTo(dom.inner);

      if (opts.html) dom.bd.html(opts.html);
      if (tpl.bd) dom.bd.html(tpl.bd);
      if (tpl.ft) dom.ft.html(tpl.ft);

      if (opts.btns) {
        var primaries = this.opts.primaryBtns.split(' ');
        dom.btns = $('<div class="btns" />').appendTo(dom.ft);
        $.each(opts.btns, function(text, fn){
          var btn = $.inArray(text, primaries) >= 0 ? '<button type="button" class="btn btn-primary">'+text+'</button>' : '<button type="button" class="btn">'+text+'</button>';
          $(btn).click(function(){
            fn.call(self);
          }).appendTo(dom.btns);
        });
      }

      if (opts.url) {
        var params = {};
        if (opts.ajaxCache) params = { _r: new Date().getTime() };
        $.get(opts.url, params, function(data){
          if (!dom.bd) return false;
          if (dom.bd) $(data).appendTo(dom.bd);
          if (cb) cb();
        });
      }

      if (this.contEl) {
        this.contEl.detach().appendTo(this.dom.bd).show();
      }
      if (cb) cb();

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.el.delegate('.close, .btn-close', 'click', function(e){
        e.preventDefault();

        self.opts.closeHandler &&　self.opts.closeHandler.apply(self, arguments);
        self.hide();
      });

      if (this.opts.draggable) {
        this.bindDragEvents();
      }
    },

    bindDragEvents: function(){
      var $hd = this.dom.hd,
          $el = this.el,
          opts = this.opts,
          self = this,
          bounds = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          },
          startX, startY,
          elX, elY, elW, elH,
          isDown;

      $hd.on('mousedown', function(e){
        var offset = $el.offset(),
            $bd = self.dom.bd,
            $hd = self.dom.hd;

        startX = e.pageX;
        startY = e.pageY;
        bounds.x = $(window).scrollLeft();
        bounds.y = $(window).scrollTop();
        bounds.width = $(window).width();
        bounds.height = $(window).height();
        elX = offset.left;
        elY = offset.top;
        elW = $el.width();
        elH = $el.height();

        $el.css({
          'left': elX,
          'top': elY
        });
        if (!isDown) {
          if ($bd.find('iframe').length) $('<div class="ifrm-cover" style="z-index:99;position:absolute;width:100%;left:0;height:'+$bd.height()+'px;top:'+$hd.height()+'px;"></div>').appendTo($bd);
          $(document).on('mousemove.dlg', onMove).one('mouseup.dlg', onStop);
        }
        isDown = true;
      });

      function onMove(e){
        if (isDown) {
          var x = elX + (e.pageX - startX),
              y = elY + (e.pageY - startY);

          if (x < bounds.x) {
            x = bounds.x;
          } else if (x > bounds.width - elW) {
            x = bounds.width - elW;
          }
          if (y <= bounds.y) {
            y = bounds.y;
          } else if (y >= bounds.height - elH) {
            y = bounds.height - elH;
          }

          $el.css({
            left: x,
            top: y
          });
        }
      }

      function onStop(){
        isDown = false;
        $(document).off('mousemove.dlg');
        $el.find('.ifrm-cover').remove();
      }

      return this;
    },

    updateSize: function(){
      var opts = this.opts,
          size = {
            width: opts.width,
            height: opts.height
          };
      this.el.css(size);
      return this;
    },

    show: function(moveToCenter){
      if (this.isShow) return this;
      this.isShow = true;
      var self = this,
          zIndex = this.opts.zIndex || maxZIndex('div') + 1;

      if (this.opts.modal) this.modal = $.modal({
        zIndex: zIndex - 1
      });

      if (this.opts.animate) {
        this.el.css({ 'opacity': 0, 'display': 'block', 'zIndex': zIndex }).fadeIn('fast');
      } else {
        this.el.css({ 'zIndex': zIndex }).show();
      }
      if (moveToCenter || !this.opts.draggable) this.moveCenter();
      if (this.opts.onShow) this.opts.onShow.call(this);

      return this;
    },

    hide: function(isRemove){
      if (!this.isShow) return this;
      this.isShow = false;

      var self = this,
          opts = this.opts;

      // if (this.contEl && this.contElNext) {
      //   this.contEl.insertBefore(this.contElNext);
      //   if (!this.contElVisible) this.contEl.hide();
      // }
      if (this.opts.animate) {
        this.fadeOut('fast', function(){
          self.el.hide();
          if (self.modal) {
            self.modal.remove();
            self.modal = null;
          }
          if (opts.removeOnHide || isRemove) self.remove();
        });
      } else {
        this.el.hide();
        if (this.modal) {
          this.modal.remove();
          this.modal = null;
        }
        if (opts.removeOnHide || isRemove) this.remove();
      }

      if (this.opts.onHide) this.opts.onHide.call(this);
      return this;
    },

    close: function(){
      return this.hide();
    },

    reset: function(){
      this.el.undelegate().remove();
      if (this.modal) this.modal.remove();
      this.dom = this.el = this.contEl = this.contElNext = null;
    },

    remove: function(){
      this.reset();
      DlgManager.remove(this._id);
    },

    moveCenter: function(){
      if (this.el.is(':hidden')) return this;

      var self = this,
          pos = {
            left: ~~ ($(window).scrollLeft() + ($(window).width() - self.el.outerWidth()) / 2),
            top: ~~ ($(window).scrollTop() + ($(window).height() - self.el.outerHeight()) / 2)
          };

      this.el.css(pos);
      return this;
    }
  };

  module.exports = function($){
    if ($.dlg) return;

    $.dlg = function(el, opts){
      if (el === undefined) {
        el = $('<div id="J_dlg_'+new Date().getTime()+'"></div>').appendTo(document.body);
      } else if (!(typeof el == 'string' || el.tagName || el instanceof $)) {
        opts = el;
      } else {
        var dlgEl = $(el).closest('.wgt-dialog'),
            dlg;
        if (dlgEl.length) {
          dlg = DlgManager.get(dlgEl.data('dlg-uid'));
          return dlg;
        }

        opts = opts || {};
      }
      return new Dlg(el, opts);
    };

    $.dlg.setOpts = function(opts){
      $.extend(true, DefaultOpts, opts);
    };

    $.fn.dlg = function(opts){
      return this.each(function(){
        var $this = $(this),
            dlgId = $this.data('dlgId');
        if (dlgId && DlgManager.get(dlgId)) return DlgManager.get(dlgId).show();

        var dlg = new Dlg(this, opts);
        $(this).data('dlgId', dlg._id);
      });
    };
  };

});