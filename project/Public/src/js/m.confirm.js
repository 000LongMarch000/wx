define(function(require, exports, module){
  var isIE6 = /\bMSIE 6/.test(navigator.userAgent) && !window.opera;

  var Confirm = function(){
    return this.init.apply(this, arguments);
  };

  Confirm.prototype = {
    constructor: Confirm,

    tpl: Handlebars.compile([
        '<div class="wgt-layer wgt-confirm"><div class="wgt-layer-cont">',
        '<div class="wgt-confirm-title">{{{title}}}</div>',
        '<div class="btns"><a class="btn btn-primary btn-ok" href="javascript:;">确认</a><a class="btn btn-cancel" href="javascript:;">取消</a></div>',
        '</div></div>'
      ].join('')),

    init: function(opts){
      this.opts = $.extend({
        title: '',
        onCancel: function(){},
        onOK: function(){}
      }, opts || {});

      this.render().bindEvents();

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.find('.btn-ok').click(function(e){
        e.preventDefault();
        self.opts.onOK.call(self);
        self.close();
      });

      this.$el.find('.btn-cancel').click(function(e){
        e.preventDefault();
        self.opts.onCancel.call(self);
        self.close();
      });

      return this;
    },

    render: function(){
      this.$el = $(this.tpl({ title: this.opts.title })).appendTo(document.body);
      this.moveToCenter();

      return this;
    },

    moveToCenter: function(){
      var win = window,
          style;
      if (isIE6) {
        style = {
          top: $(win).scrollTop() + $(win).height() / 2 - this.$el.outerHeight() / 2,
          left: $(win).scrollLeft() + $(win).width() / 2 - this.$el.outerWidth() / 2
        };
      } else {
        style = {
          marginTop: -this.$el.outerHeight() / 2,
          marginLeft: -this.$el.outerWidth() / 2
        };
      }
      this.$el.css(style);

      return this;
    },

    close: function(){
      var self = this;
      this.$el.fadeOut('fast', function(){
        $(this).remove();
        self.$el = null;
      });

      return this;
    }
  };

  module.exports = function($){
    if ($.confirm) return;

    $.confirm = function(title, fn){
      var opts = {
        title: title,
        onOK: fn
      };

      return new Confirm(opts);
    };
  };
});