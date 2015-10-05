define(function(require, exports, module){
  var MobiCode = function(){
    return this.init.apply(this, arguments);
  };

  MobiCode.prototype = {
    constructor: MobiCode,

    init: function(el, opts){
      var $el = $(el);
      if (!$el.length) return false;
      this.$el = $el;
      this.opts = $.extend({
        btnCls: '.btn',
        mobileCls: 'input',
        duration: 60,
        url: '/admin/passport/sendregsms'
        //onSendSMS: function(){}
      }, opts || {});

      this.render().bindEvents();
      return this;
    },

    render: function(){
      var opts = this.opts;
      this.$btn = this.$el.find(opts.btnCls);
      this.$mobile = this.$el.find(opts.mobileCls);
      if (!opts.text) opts.text = this.$btn.text();

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$btn.on('click', function(){
        self.sendSMS();
      });
    },

    sendSMS: function(){
      var opts = this.opts,
          val = this.$mobile.val();

      if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(148))+\d{8})$/.test(val)) {
        $.notify('请输入正确的手机号码');
        return;
      }

      if (opts.onSendSMS) opts.onSendSMS.call(this, this.$el);
      WD.ajax({
        url: opts.url,
        data: { mobile: val }
      });
      this.startTimer();

      return this;
    },

    startTimer: function(){
      if (this.timer) clearTimeout(this.timer);
      this.$btn.prop('disabled', true).addClass('disabled');

      var cnt = this.opts.duration,
          self = this;

      this.$btn.text(cnt + '秒后可重新验证');
      this.timer = setInterval(function(){
        cnt --;
        if (cnt <= 0) {
          self.stopTimer();
          return;
        }
        self.$btn.text(cnt + '秒后可重新验证');
      }, 1000);

      return this;
    },

    stopTimer: function(){
      if (this.timer) clearTimeout(this.timer);
      this.$btn.text(this.opts.text).prop('disabled', false).removeClass('disabled');

      return this;
    }
  };

  module.exports = MobiCode;
});