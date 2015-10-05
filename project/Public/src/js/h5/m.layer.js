define(function(require, exports, module){
  var tpls = {
        bg: '<div id="wgt-layer-bg" class="wgt-layer-bg"></div>',
        layer: '<div id="wgt-layer" class="wgt-layer"></div>'
      };


  var Layer = function(){
    return this.init.apply(this, arguments);
  };

  Layer.prototype = {
    constructor: Layer,

    init: function(opts){
      this.opts = $.extend({
        removeOnHide: true
      }, opts || {});

      return this;
    },

    show: function(){
      if (this.opts.removeOnHide) return this;

      this.$layer.transition({ 'opacity': 1 });
      
      return this;
    },

    render: function(){
      var $bg = $('#wgt-layer-bg');
      if (!$bg.length) {
        $bg = $(tpls.bg).appendTo(document.body);
      }
      this.$layer = $(tpls.layer).appendTo($bg);

      return this;
    },

    remove: function(){
      var opts = this.opts,
          self = this;

      this.$layer.transition({ 'opacity': 0 }, function(){
        var $bg = $('#wgt-layer-bg').hide();
        if (opts.removeOnHide) {
          $(this).remove();
          self.$layer = null;
          if (!$bg.children().length) $bg.remove();
        }
      });
    }
  };

  module.exports = Layer;
});