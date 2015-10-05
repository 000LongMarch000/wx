define(function(require, exports, module){
  var util = require('./util'),
      uris = require('./uris'),
      Layer = require('./m.layer'),
      ShareGoods = require('./m.sharegoods');

  var CompsList = {

    init: function(){
      this.$el = $('#J_compsList');
      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.$el.find('.btn-qr').each(function(){
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id'),
            qrImg = $tr.data('qr');

        if (!id) return;
        $this.qtip({
          overwrite: false,
          content: '<img src="'+qrImg+'" width="125" height="125">',
          position: {
            my: 'top center',
            at: 'bottom center'
          },
          style: 'qtip-light'
        });
      });

      this.$el.find('.btn-share').each(function(i){
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id'),
            params = {
              qr_img: $tr.data('qr'),
              link: $tr.data('link')
            };

        if (!id) return;

        $.extend(params, {
          title: $tr.find('.name').text()
        });

        new Layer($this, {
          offset: {
            left: -390
          },
          content: function(cont){
            new ShareGoods(cont, { data: params });
          },
          additionalEl: '#global-zeroclipboard-html-bridge'
        });
      });

      this.$el.find('.btn-qr-dl').each(function(){
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id'),
            qrImg = $tr.data('qr'),
            qrLink = '/admin/download/qrcode?url=' + encodeURIComponent(qrImg);

        if (!id) return;

        new Layer($this, {
          offset: {
            left: -63
          },
          content: function(cont){
            $(cont).html('<img src="'+qrImg+'" width="125" height="125"><p class="t-c"><a href="'+qrLink+'">下载二维码</a></p>');
          }
        });
      });

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.on('click', '.btn-update', function(e){
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        var toState = $this.data('state') == 'on' ? 'off' : 'on';
        WD.ajax({
          url: uris.COMPONENT_UPDATE,
          data: {
            case_id: id,
            k: $this.data('k'),
            state: toState == 'on' ? 1 : 0
          },
          success: function(data){
            $.notify('操作成功');
            $this.data('state', toState).text(toState == 'on' ? '关闭' : '开启');
          }
        });
      }).on('click', '.btn-end', function(){
        var url = $(this).data('url');
        $.confirm('确认结束？', function(){
          WD.ajax({
            url: url,
            success: function(){
              $.notify('操作成功，正在刷新', function(){
                location.reload();
              });
            }
          });
        });
      }).on('click', '.btn-del', function(){
        var $this = $(this),
            url = $this.data('url');

        $.confirm('确认删除？', function(){
          WD.ajax({
            url: url,
            success: function(){
              $this.closest('tr').fadeOut(function(){
                $(this).remove();
              });
            }
          })
        });
      });

      return this;
    },

    destroy: function(){
      this.$el = null;
    }
  };

  module.exports = CompsList;
});