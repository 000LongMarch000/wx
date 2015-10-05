define(function(require, exports, module){
  var ShippingArea = {
    init: function(el, opts){
      var $el = $(el);
      if (!$el.length) return false;

      this.$el = $el;
      this.allChecked = false;
      this.opts = $.extend({
        //onCheckAll: function(){}
      }, opts || {});

      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.$list = this.$el.find('.sec-shipping-area');
      this.$hint = this.$el.find('.shipping-hint');
      this.$all = this.$list.find('input[value=all]');
      this.$inputs = this.$list.find('input:checkbox').not('input[value=all]');

      if (this.$all.prop('checked')) this.allChecked = true;

      return this;
    },

    bindEvents: function(){
      var self = this;

      this.$list.on('click', 'input:checkbox', function(e){
        var $this = $(this),
            opts = self.opts;

        if ($this.val() == 'all') {
          if ($this.is(':checked')) self.checkAll();
          else self.unCheckAll();
        } else {
          var $checked = self.$inputs.filter(':checked');
          if ($checked.length == self.$inputs.length) {
            self.checkAll();
          } else {
            self.$all.prop('checked', false);
            self.allChecked = false;

            var provs = $checked.map(function(){
                            return this.getAttribute('value');
                          }).get();

            var text = provs.length ? provs.join(', ') : '还没有添加包邮地区';
            self.$hint.text(text);
          }
        }

        if (opts.onCheck) opts.onCheck.call(self, e);
      });

      return this;
    },

    checkAll: function(){
      var opts = this.opts;

      this.allChecked = true;
      this.$all.prop('checked', true);
      this.$inputs.prop('checked', true);
      this.$hint.text('全国包邮');
      if (opts.onCheckAll) opts.onCheckAll.call(this);

      return this;
    },

    unCheckAll: function(){
      this.allChecked = false;
      this.$all.prop('checked', false);
      this.$inputs.prop('checked', false);
      this.$hint.text('还没有添加包邮地区');

      return this;
    }
  };

  module.exports = ShippingArea;
});