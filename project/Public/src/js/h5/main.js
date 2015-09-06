define(function(require, exports, module){
  require('../m.btn')($);
  require('../m.number')($);
  require('./m.notify')($);
  require('./m.confirm')($);

  var win = window,
      doc = document,
      WD = win.WD;

  if (!WD) WD = {};

  $.extend(WD, {

    ajax: function(opts){
      opts = $.extend({
        override: true,
        dataType: 'json',
        errorMsg: '操作失败，请稍后再试'
      }, opts || {});

      if (opts.override) {
        var onSuccess = opts.success;
            onError = opts.error;

        opts.success = function(data){
          if (data && data.status == 'success') {
            if (onSuccess) onSuccess.call(this, data.data);
          } else {
            var msg = data.msg || opts.errorMsg;
            if (onError) onError.call(this, msg);
            else $.notify(msg);
          }
        };

        opts.error = function(){
          $.notify(opts.errorMsg);
        }
      }

      return $.ajax(opts);
    },

    ajaxForm: function(form, opts){
      opts = opts || {};
      var $form = $(form),
          url = $form.attr('action'),
          method = $form.attr('method') || 'get';

      opts = $.extend(true, {
        url: url,
        type: method,
        data: $form.serialize(),
        btnToggle: true
      }, opts);

      if (opts.btnToggle) {
        var $btn = $form.find(':input[type=submit]');
        if (!opts.beforeSend)
          opts.beforeSend = function(){
            $btn.btn('loading');
          };
        if (!opts.complete)
          opts.complete = function(){
            $btn.btn('reset');
          };
        delete opts.btnToggle;
      }

      return WD.ajax(opts);
    }
  });

  //fallback animation if css3 not support
  if (!$.support.transition) $.fn.transition = $.fn.animate;

  $(function(){

    if ($.fn.toggler) {
      $('.wgt-toggler').toggler();
    }

    if (win.accounting) {
      $('.wgt-number').each(function(){
        var $this = $(this),
            type = $this.data('number');

        if (type == 'digits') {
          $this.number(0, '');
        } else {
          $this.number(2, '');
        }
      });
    }
  });

  win.WD = WD;
});