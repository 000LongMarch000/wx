define(function(require, exports, module){
  var UID = 0;

  var Model = function(){
    return this.init.apply(this, arguments);
  };

  Model.prototype = {
    constructor: Model,

    init: function(opts){
      if (this.el && this.el.length) return false;
      this.opts = $.extend({
        position: 'absolute',
        top: 0,
        left: 0,
        autoHide: false
      }, this._opts, opts || {});

      this.render().bindEvents();
      this.isShowing = true;

      return this;
    },

    render: function(){
      UID ++;
      this.el = $('<div class="wgt-modal" id="J__modal_'+UID+'"></div>').css(this.opts).appendTo(document.body);
      this.updateSize();
      if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
        this.fix = this.el.bgFrm();
      }

      return this;
    },

    bindEvents: function(modal){
      var el = this.el,
          self = this,
          timer;

      $(window).on('resize.modal', function(){
        if (timer) clearTimeout(timer);
        timer = setTimeout(function(){
          self.updateSize();
          timer = null;
        }, 70);
      });

      if (this.opts.autoHide) {
        el.click(function(e){
          if (el.hasClass('wgt-modal')) self.hide();
        });
      }
    },

    updateSize: function(){
      var size = { width: Math.max($(document.body).outerWidth(true), $(window).width()), height: Math.max($(document.body).outerHeight(true), $(window).height()) };
      this.el.css(size);
      if (this.fix) this.fix.css(size);
    },

    hide: function(){
      var self = this;
      this.el.fadeOut('fast', function(){
        self.remove();
      });
    },

    remove: function(){
      $(window).off('resize.modal');
      this.el.remove();
      this.el = null;
      if (this.fix) {
        this.fix.remove();
        this.fix = null;
      }
    }
  };


  module.exports = function($){
    if ($.modal) return;

    $.modal = function(opts){
      return new Model(opts);
    };

    if ($.fn.bgFrm) return;

    $.fn.bgFrm = function(){
      if (!this.length) return false;

      var el = this.eq(0),
          frm = $('#J__bgFrm');
      if (frm.length) return frm;
      else {
        var pos = $.extend({
          position: 'absolute',
          width: el.outerWidth(),
          height: el.outerHeight(),
          opacity: 0,
          zIndex: Math.max(0, el.css('zIndex') - 1)
        }, el.position());
        return $('<iframe src="about:blank" scroll="no" border="no"></iframe>').css(pos).appendTo(document.body);
      }
    };
  };
});