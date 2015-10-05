define(function(require, exports, module){
  var defaultOpts = {
    duration: 1700,
    modal: false,
    autoHide: true,
    anim: true,
    offset: 2,
    msg: '',
    position: 'top',
    type: 'default',
    single: false
  };

  var Notify = function(opts){
    var self = this;
    this.opts = $.extend({}, defaultOpts, opts || {});

    if (this.opts.delay) {
      setTimeout(function(){
        self.init();
      }, this.opts.delay);
    } else {
      this.init();
    }

    return this;
  };

  Notify.prototype = {
    init: function(){
      var self = this,
          opts = this.opts;

      this.render().show();
      this.anim();

      if (opts.autoHide) {
        setTimeout(function(){
          if (self.el && self.el.length) self.close();
        }, opts.duration);
      }
      return this;
    },
    render: function(){
      var self = this;

      this.el = $('<div class="wgt-notify">'+this.opts.msg+'</div>').css({
        position: 'absolute',
        zIndex: 10000,
        display: 'none'
      }).appendTo(document.body).on('click', function(){
        self.close();
      });

      if (this.opts.type == 'error') this.el.addClass('notify-error');

      return this;
    },
    anim: function(){
      var top = this.getInitTop(),
          offset = this.el.outerHeight() + this.opts.offset,
          dir = (this.opts.position == 'top') ? -1 : 1;

      this.el.css('top', top + dir * offset).transition({
        top: top
      }, 400);

      return this;
    },
    getInitTop: function(){
      var lastNotify = $('.wgt-notify').not(this.el).last(),
          top = this.opts.position == 'top' ? $(window).scrollTop() : this.getCenter().top;

      if (lastNotify.length) {
        try {
          top = (this.opts.position) == 'top' ?  lastNotify.offset().top + lastNotify.outerHeight() + this.opts.offset : lastNotify.offset().top - lastNotify.outerHeight() - this.opts.offset;
        } catch(e) {}
      }

      return top;
    },
    msg: function(msg){
      if (this.el) this.el.html(msg);
      return this;
    },
    show: function(center){
      if (center) this.moveToCenter();
      this.el.show();
      return this;
    },
    close: function(dur){
      var self = this;
      if (this.opts.anim) {
        this.el.delay(dur || 300).fadeOut(function(){
          self.el.remove();
          self.el = null;
          if ($.isFunction(self.opts.onClose)) self.opts.onClose.call(self);
        });
      } else {
        this.el.remove();
        this.el = null;
        if ($.isFunction(self.opts.onClose)) self.opts.onClose.call(self);
      }
      return this;
    },
    getCenter: function(){
      var el = this.el;
      return {
            //left: ~~ (($(document.body).outerWidth() - el.outerWidth()) / 2),
            top: ~~ ($(window).scrollTop() + ($(window).height() - el.outerHeight()) / 2)
          };
    },
    moveToCenter: function(){
      var el = this.el,
          pos = this.getCenter();

      this.el.css(pos);
      return this;
    }
  };

  module.exports = function($){
    $.notify = function(msg, opts){
      if (typeof opts === 'function') {
        var fn = opts;
        opts = { onClose: fn };
      }
      opts = $.extend({
        msg: msg
      }, opts);

      return new Notify(opts);
    };

    $.notify.setOpts = function(opts){
      Notify.opts = $.extend(true, defaultOpts, opts || {});
    };
  };

});