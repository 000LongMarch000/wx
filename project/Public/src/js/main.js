define(function(require, exports, module){
  require('./m.toggler')($);
  require('./m.notify')($);
  require('./m.confirm')($);
  require('./m.btn')($);
  require('./m.number')($);

  var util = require('./util'),
      win = window,
      doc = document,
      WD = win.WD;

  if (!WD) WD = {};
  var ieVer = (function(){
        var v = 3,
            p = doc.createElement('p'),
            all = p.getElementsByTagName('i');
        while (
          p.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
          all[0]);
        return v > 4 ? v : 0;
      })(),
      ieMode = doc.documentMode,
      ieAX = win.ActiveXObject;

  $.extend(WD, {
    isIE6: ieAX && ieVer == 6 || ieMode == 6,

    isIE7: ieAX && ieVer == 7 || ieMode == 7,

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

        opts.error = function(xhr, type){
          if (type != 'abort') $.notify(opts.errorMsg);
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


  //Handlebars helper
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 - v2 < 0) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 - v2 <= 0) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 - v2 > 0) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 - v2 >= 0) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
    }
  });

  Handlebars.registerHelper('for', function(from, to , incr, block){
    var str='', length = to, isArray = false;

    if(Object.prototype.toString.call(to)=='[obejct Array]') {
      length = to.length;
      isArray = true;
    }

    for(var i= from; i<length; i+=incr ){
      str+= block.fn(isArray?to[i]:i);
    };
    return str;
  })

  //fallback animation if css3 not support
  if (!$.support.transition) $.fn.transition = $.fn.animate;

  //validate methods
  if ($.validator) {
    $.validator.addMethod('imgRequired', function(val) {
      return /\.(jpg|jpeg|png|gif|bmp)$/ig.test(val);
    }, '请上传图片');
    $.validator.addClassRules('required-img', {
      imgRequired: true
    });
  }


  $(function(){

    if (!WD.isIE6 && $.fn.icheck) {
      $('.wgt-icheck').icheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red',
        increaseArea: '20%'
      });
    }

    if ($.fn.sSelect) {
      $('.wgt-select').each(function(){
        var $this = $(this),
            opts = {},
            width = $this.attr('width');
        if (width) opts.width = width;
        $this.sSelect(opts);
      });
    }

    if ($.fn.toggler) {
      $('.wgt-toggler').toggler();
    }

    if ($.fn.qtip) {
      $('.wgt-tip').each(function(){
        var $this = $(this),
            params = {
              position: {
                my: 'top center',
                at: 'bottom center'
              },
              style: 'qtip-light'
            };
        if ($this.data('style')) params.style = $this.data('style');
        $this.qtip(params);
      });
    }

    if (win.accounting) {
      $('.wgt-number').each(function(){
        var $this = $(this),
            digits = $this.hasClass('digits');

        if (digits) {
          $this.number(0, '');
        } else {
          $this.number(2, '');
        }
      });
    }
  });

  if (win.NProgress && !WD.isIE6 && !WD.isIE7 && doc.querySelector) {
    $(function(){
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      $(win).on('load', function(){
        NProgress.done();
      });
      //max 1.7s
      setTimeout(function(){
        NProgress.done();
      }, 1700);
    });
  }

  win.WD = WD;
});