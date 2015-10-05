define(function(require, exports, module){
  var Layer = require('./m.layer'),
      util = require('./util'),
      tpl = require('./tpls/confirm.tpl');

  var Confirm = function(){
    return this.init.apply(this, arguments);
  };

  util.inherits(Confirm, Layer);

  $.extend(Confirm.prototype, {
    constructor: Confirm,

    init: function(opts){
      opts = $.extend({
        title: '',
        onCancel: function(){},
        onOK: function(){}
      }, opts || {});

      this.tpl = Handlebars.compile(tpl);

      this.parent.init.call(this, opts);
      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.parent.render.call(this);

      var opts = this.opts,
          html = this.tpl({ title: opts.title });

      this.$layer.addClass('wgt-confirm').html(html);

      return this;
    },

    bindEvents: function(){
      var opts = this.opts,
          btns = opts.btns,
          self = this;

      this.$layer.find('.btn-ok').click(function(e){
        e.preventDefault();
        opts.onOK.call(self);
        self.close();
      });

      this.$layer.find('.btn-cancel').click(function(e){
        e.preventDefault();
        opts.onCancel.call(self);
        self.close();
      });

      return this;
    },

    close: function(){
      this.remove();
    }
  });

  module.exports = function($){
    if ($.confirm) return;

    $.confirm = function(title, fnOk, fnCancel){
      var opts = {
        title: title,
        onOK: fnOk
      };
      if (fnCancel && $.isFunction(fnCancel)) opts.onCancel = fnCancel;

      return new Confirm(opts);
    };
  };

});