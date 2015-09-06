define(function(require, exports, module){
  var Layer = require('./m.layer'),
      util = require('./util');

  var Notify = function(){
    return this.init.apply(this, arguments);
  };

  util.inherits(Notify, Layer);

  $.extend(Notify.prototype, {
    constructor: Notify,

    init: function(msg, opts){
      opts = $.extend({
        type: 'default',
        autoHide: true,
        delay: 1500
      }, opts || {});

      this.parent.init.call(this, opts);
      this.render(msg).bindEvents();

      return this;
    },

    render: function(msg){
      var opts = this.opts,
          self = this;

      this.parent.render.call(this);
      this.$layer.addClass('wgt-notify').text(msg);

      if (opts.autoHide) setTimeout(function(){
        self.remove();
      }, opts.delay);

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$layer.on('click', function(){
        self.remove();
      });
    }
  });

  module.exports = function($){
    if ($.notify) return;

    $.notify = function(msg, opts){
      return new Notify(msg, opts);
    };
  };

});