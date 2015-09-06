define(function(require, exports, module){
  var Numinput = function(){
    return this.init.apply(this, arguments);
  };

  Numinput.prototype = {
    setOpts: function(opts){
      if (arguments.length == 2) {
        var k = arguments[0],
            v = arguments[1];
        opts = {};
        opts[k] = v;
      }
      this.opts = $.extend(this.opts, opts);

      return this;
    },

    init: function(el, opts){
      this.$el = $(el);
      if (!this.$el.length) return false;

      this.opts = {
        min: 1,
        max: 9999,
        step: 1,
        onChange: function(){}
      };

      this.setOpts(opts || {});
      this.render();
      this.bindEvents();
      return this;
    },

    render: function(){
      this.$input = this.$el.find('input');
      this.$input.attr('autocomplete', 'off');

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.find('.btn-increase').click(function(){
        self.increase();
      });

      this.$el.find('.btn-decrease').click(function(){
        self.decrease();
      });

      this.$input.on('change blur', function(e){
        self.validate();
        if (e.type == 'change') self.opts.onChange.call(self, $(this).val());
      });

      return this;
    },

    increase: function(){
      var val = parseInt(this.$input.val(), 10) + this.opts.step;
      val = Math.min(val, this.opts.max);

      this.$input.val(val);
      this.opts.onChange.call(this, val);

      return this;
    },

    decrease: function(){
      var val = parseInt(this.$input.val(), 10) - this.opts.step;
      val = Math.max(val, this.opts.min);

      this.$input.val(val);
      this.opts.onChange.call(this, val);

      return this;
    },

    validate: function(){
      var val = parseInt(this.$input.val(), 10);
      if (isNaN(val)) val = this.opts.min;
      val = Math.max(this.opts.min, Math.min(val, this.opts.max));
      if (this.opts.step != 1 && val % this.opts.step != 0) {
        val = val - val % this.opts.step;
      }

      this.$input.val(val);

      return this;
    }
  };

  module.exports = function($){
    if ($.fn.numinput) return false;

    $.fn.numinput = function(opts){
      return this.each(function(){
        var params = {},
            $this = $(this);

        if ($this.data('numinput')) return $this.data(numinput);

        if ($this.attr('max')) params.max = parseInt($this.attr('max'), 10);
        if ($this.attr('min')) params.min = parseInt($this.attr('min'), 10);

        params = $.extend(params, opts);
        $this.data('numinput', new Numinput(this, params));

        return this;
      });
    };
  };

});