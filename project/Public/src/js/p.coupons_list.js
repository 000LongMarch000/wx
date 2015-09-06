define(function(require, exports, module){
  var util = require('./util'),
      uris = require('./uris'),
      Layer = require('./m.layer'),
      ShareGoods = require('./m.sharegoods');

  var CompsList = {

    init: function(){
      this.$el = $('#J_list');
      this.render().bindEvents();

      return this;
    },

    render: function(){
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

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.on('click', '.btn-del', function(){
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
      }).on('click', '.btn-end', function(){
        var $this = $(this),
            url = $this.data('url');

        $.confirm('确定后，优惠券将终止领用。该操作不可修改，请谨慎使用。', function(){
          WD.ajax({
            url: url,
            success: function(){
              location.reload(true);
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