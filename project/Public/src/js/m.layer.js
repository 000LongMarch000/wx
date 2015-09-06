define(function(require, exports, module){
  var Layer = function(){
    return this.init.apply(this, arguments);
  };

  Layer.prototype = {
    constructor: Layer,

    init: function(el, opts){
      var $el = $(el),
          self = this;
      if (!$el.length) return false;

      this.$el = $el;
      this.opts = $.extend(true, {
        content: '',
        offset: {
          left: 0,
          top: 5
        },
        lazy: true,
        onShow: function(){},
        onHide: function(){},
        delay: 200
      }, opts || {});

      if (this.opts.lazy) {
        this.$el.one('mouseenter', function(){
          if (!self.$layer) self.render().bindEvents().show();
        });
      } else {
        this.render().bindEvents();
      }

      return this;
    },

    render: function(){
      var opts = this.opts,
          offset = this.$el.offset(),
          h = this.$el.outerHeight(),
          layerTop = offset.top + h + opts.offset.top,
          layerLeft = offset.left + opts.offset.left;

      this.$layer = $('<div class="wgt-layer"><i class="ico-arr-up"></i><div class="wgt-layer-cont"></div><div class="wgt-layer-bg"></div></div>')
        .appendTo(document.body)
        .css({
          top: layerTop,
          left: layerLeft
        });

      var $arr = this.$layer.find('.ico-arr-up'),
          $cont  = this.$layer.find('.wgt-layer-cont');

      $arr.css({
        left: -opts.offset.left + this.$el.width()/2 - 5
      });

      if ($.isFunction(opts.content)) {
        opts.content.call(this, $cont);
      } else {
        $cont.html(opts.content);
      }

      return this;
    },

    bindEvents: function(){
      var self = this,
          opts = this.opts,
          timer;

      this.$layer.hover(function(){
        if (timer) clearTimeout(timer);
      }, function(e){
        if (timer) clearTimeout(timer);
        timer = setTimeout(function(){
          self.hide();
        }, opts.delay);
      });

      this.$el.hover(function(){
        if (timer) clearTimeout(timer);
        self.show();
      }, function(e){
        if (timer) clearTimeout(timer);
        timer = setTimeout(function(){
          self.hide();
        }, opts.delay);
      });

      if (opts.additionalEl) {
        $(opts.additionalEl).hover(function(){
          if (timer) clearTimeout(timer);
        });
      }

      return this;
    },

    show: function(){
      var rslt = this.opts.onShow.call(this);
      if (rslt !== undefined && !rslt) return this;
      this.$layer.show();

      return this;
    },

    hide: function(){
      var rslt = this.opts.onHide.call(this);
      if (rslt !== undefined && !rslt) return this;
      this.$layer.hide();

      return this;
    }
  };

  module.exports = Layer;
});