define(function(require, exports, module){
  require('./m.dialog')($);
  var deliverTpl = require('./tpls/deliver.tpl');

  var Deliver = {
    tpl: Handlebars.compile(deliverTpl),

    init: function () {
      this.opts = {
        //success: function(){}
        face2face: false,
        data: {}
      };

      this.cache = [];
    },

    invoke: function (opts) {
      var self = this;
      opts = $.extend(true, self.opts, opts);
      $.extend(self.opts, opts);
      if (self.opts.face2face) {
        self.renderFace2face();
      } else {
        self.prefetch(function ($el, dlg) {
          self.renderDelivery($el, dlg);
        });
      }
      
      return this;
    },

    prefetch: function (callback) {
      var self = this,
          $el = $('<div />').appendTo(document.body),
          dlg;
      if (self.cache.length === 0) {
        $el.addClass('delivery-loading');
      }
      dlg = $.dlg($el, {
        title: '发货信息',
        removeOnHide: true,
        width: 550
      });
      if (self.cache.length === 0) {
        $.getJSON('/admin/data/express', function (data) {
          self.cache = data;
          var opts = $.extend(true, self.opts || {}, {data: {companies: data}});
          $.extend(self.opts, opts);
          callback.call(self, $el, dlg);
        });
      } else {
        callback.call(self, $el, dlg);
      }

      return this;
    },
    
    renderFace2face: function () {
      var self = this,
          data = self.opts.data;
      $.confirm('该订单是当面购，<br/>请确认您已发货给买家', function () {
        WD.ajax({
          url:'/admin/order/delivery',
          data:{
            trade_id: data.id,
            face2face: 1
          },
          type:'post',
          success: function () {
            $.notify('发货成功');
            if (self.opts.success) self.opts.success.call(self);
          }
        });
      });
      
      return this;
    },
    
    renderDelivery: function ($el, dlg) {
      var self = this,
          data = self.opts.data,
          $other;
      $el.removeClass('delivery-loading').html(this.tpl(data));
      $el = $el.find('form');
      $el.find('input').icheck({
        radioClass: 'iradio_minimal-red'
      });
      $el.find('[name=deliver]').on('change', function () {
        var $this = $(this),
            switcher = $this.val(),
            $group = $this.closest('.form-group').siblings('.form-group');
        if (switcher > 0) {
          $group.show();
	      var $company = $el.find('[name=company]');
          $company.trigger($.Event('select2:select', {params: {data: {rerender: true}}}));
        } else {
          $group.hide();
        }
      });
      $el.find('[name=company]').select2({
        language: 'zh-CN',
        matcher: function (params, data) {
          if ($.trim(params.term) === '') {
            return data;
          }
          var alias = $(data.element).data('alias');
          if (typeof alias === 'undefined') {
            return null;
          }
          alias = _.filter(alias.split(';'), function (v, k) {
            return v.indexOf(params.term) > -1;
          });
          if (alias.length > 0) {
            return data;
          }
          return null;
        }
      }).on('select2:select', function (e) {
        var $this = $(e.params.data.element),
            $code = $el.find('[name=code]'),
            $other = $el.find('[name=other_company]').closest('.form-group'),
            code;
        if (typeof e.params.data.rerender !== 'undefined' && e.params.data.rerender) {
          code = $code.val();
        } else {
          code = $this.data('code');
          $code.val(code);
        }
        if (code.toLowerCase() === 'other') {
          $other.show();
        } else {
          $other.hide();
        }
      });
      $el.validate({
        submitHandler: function(form){
          WD.ajaxForm(form, {
            success: function(){
              $.notify('发货成功');
              dlg.hide();
              if (self.opts.success) self.opts.success.call(self);
            }
          });
        }
      });
      
      return this;
    }
  };

  module.exports = Deliver;
});
