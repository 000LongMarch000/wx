define(function(require, exports, module){
  var CardHint = function(){
    return this.init.apply(this, arguments);
  };

  CardHint.prototype = {
    constructor: CardHint,

    init: function(el, opts){
      var $el = $(el);
      if (!$el.length) return false;
      this.$el = $el;
      this.opts = $.extend({
        offset: 5
      }, opts || {});

      this.render().bindEvents();

      return this;
    },

    render: function(){
      return this;
    },

    renderHint: function(){
      var offset = this.$el.offset();
      this.$hint = $('<div class="wgt-card-hint"></div>').appendTo(document.body).css({
        top: offset.top - 40 - 5,
        left: offset.left
      });
    },

    bindEvents: function(){
      var $el = this.$el,
          self = this;

      $el.on('keyup.cardhint', function(){
        var $this = $(this),
            val = $this.val();

        val = clean(val);
        $this.val(val);
        if (val) {
          if (!self.$hint) self.renderHint();
          else self.$hint.show();
        } else {
          if (self.$hint) self.$hint.hide();
        }
        if (self.$hint) self.$hint.text(format(val));
      }).on('focus.cardhint', function(){
        if (self.$hint && $(this).val()) {
          self.$hint.show();
        }
      }).on('blur.cardhint', function(){
        if (self.$hint) self.$hint.hide();
      });

      function clean(val){
        return val.replace(/[^\d]+/ig, '').replace(/^(\d{19}).*/, '$1');
      }

      function format(val) {
        var len = val.length,
            ret = [];
        for (var i = 0; i < len; i+=4) {
          ret.push(val.slice(i, i+4));
        }

        if (ret.length) ret = ret.join(' ');
        else ret = '';

        return ret;
      }
    },

    destroy: function(){
      this.$el.off('keyup.cardhint focus.cardhint blur.cardhint');
      this.$hint.remove();
      this.$el = this.$hitn = null;

      return this;
    }
  }

  module.exports = CardHint;
});