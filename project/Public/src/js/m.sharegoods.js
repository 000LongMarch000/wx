define(function(require, exports, module){
  var tpl = require('./tpls/share_goods.tpl'),
      ZeroClipboard = require('./m.zclip'),
      client = new ZeroClipboard();

  client.on('load', function(){
    client.on('complete', function(client, args){
      $.notify('内容已拷贝至剪贴板');
    });

    client.on('mousedown', function(client, args){
      var $input = $(this).parent().find(':text'),
          val = $input.val();
      if (val) client.setText(val);
    });
  });

  var Share = function(){
    return this.init.apply(this, arguments);
  };

  Share.prototype = {
    constructor: Share,

    tpl: Handlebars.compile(tpl),

    init: function(el, opts){
      $el = $(el);
      if (!$el.length) return this;
      opts = opts || {};

      var data = opts.data || {};
      delete opts.data;

      this.opts = $.extend({
        tpl: true
      }, opts);

      var shareData = this.shareData = {};
      _.each(data, function(item, k){
        try {
          shareData[k] = encodeURIComponent(item);
        } catch(e){}
      });

      data.encode_qr_img = encodeURIComponent(data.qr_img || '');

      this.$el = $el;
      this.render(data).bindEvents();

      return this;
    },

    render: function(data){
      if (this.opts.tpl) this.$el.html(this.tpl(data));

      var $btn = this.$el.find('.btn-copy');
      client.clip($btn[0]);

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.on('click', '.share-btns a', function(){
        var type = $(this).data('share');
        self.share(type);
      });

      return this;
    },

    share: function(type){
      var d = this.shareData,
          link = d.link,
          title = d.title,
          img = d.img;

      if (type == "weibo") {
        if (d.weiboTitle) title = d.weiboTitle;
        window.open('http://v.t.sina.com.cn/share/share.php?url=' + link + '&title=' + title + '&content=utf8' + (img ? '&pic=' + img : ''));
      }
      if (type == 'qq-weibo') {
        window.open('http://v.t.qq.com/share/share.php?url=' + link + '&title=' + title + (img ? '&pic=' + img : ''));
      }
      if (type == 'qq') {
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + link + '&title=' + title + (img ? '&pics=' + img : ''));
      }
      if (type == 'renren') {
        window.open('http://widget.renren.com/dialog/share?resourceUrl=' + link + '&title=' + title + (img ? '&pic=' + img : ''));
      }
      if (type == "douban") {
        window.open("http://www.douban.com/recommend/?url=" + link + "&title=" + title + (img ? "&img=" + img : ''));
      }

    },

    destroy: function(){
      this.$el.off('click').remove();
      this.$el = null;

      return this;
    }
  };

  module.exports = Share;
});