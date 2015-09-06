(function(win, document, undefined){
  var IMG_SIZE = 200;
  var Weixin = {
    init: function(data){
      if (!this.isWeixin()) return false;
      this.data = {
        link: location.href,
        title: document.title,
        img_url: '',
        desc: '',
        img_width: IMG_SIZE,
        img_height: IMG_SIZE,
        appid: ''
      };
      this.setData(data);

      if (this._inited) return this;
      this._inited = true;
      this.bindEvents();

      return this;
    },

    isWeixin: function(){
      var ua = navigator.userAgent.toLowerCase();
      return (ua.indexOf('micromessenger') >= 0 || typeof WeixinJSBridge != 'undefined');
    },

    setData: function(data){
      this.data = $.extend(this.data, data || {});

      return this;
    },

    bindEvents: function(){
      var self = this;
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady(){
        WeixinJSBridge.on('menu:share:appmessage', function(){
          if (self.data.title) self.shareFriend();
          else return true;
        });
        WeixinJSBridge.on('menu:share:timeline', function(){
          if (self.data.title) self.shareTimeline();
          else return true;
        });
        WeixinJSBridge.on('menu:share:weibo', function(){
          if (self.data.title) self.shareWeibo();
          else return true;
        });
      });

      return this;
    },

    shareFriend: function(){
      WeixinJSBridge.invoke('sendAppMessage', this.data, function(res){

      });
    },

    shareTimeline: function(){
      var data = $.extend({}, this.data);
      data.title = data.desc;
      WeixinJSBridge.invoke('shareTimeline', data, function(res){

      });
    },

    shareWeibo: function(){
      WeixinJSBridge.invoke('shareWeibo', this.data, function(res){

      });
    }
  };


  var WD = win.WD;
  if (!WD) WD = win.WD = {};
  WD.Weixin = Weixin.init();

})(window, document);