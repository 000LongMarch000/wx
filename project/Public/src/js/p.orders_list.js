define(function(require, exports, module){
  require('./m.dialog')($);
  require('./m.confirm')($);

  var DataList = require('./m.datalist'),
      Layer = require('./m.layer'),
      Deliver = require('./m.deliver'),
      uris = require('./uris');

  var Orders = {
    tpls: {
      contact: Handlebars.compile($('#T_orderContact').html())
    },

    init: function(){
      this.$el = $('#J_ordersList');
      this.datalist = new DataList(this.$el);
      this.render().bindEvents();

      return this;
    },

    render: function(){
      return this;
    },

    bindEvents: function(){
      var tpls = this.tpls,
          self = this;

      Deliver.init();

      this.$el.on('click', '.btn-deliver', function(){
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        Deliver.invoke({
          face2face: $this.data('face2face'),
          data: {
            id: id
          },
          success: function(){
            location.reload();
          }
        });

      }).on('click', '.btn-contact', function(e){
        e.preventDefault();
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        new Layer($this, {
          lazy: false,
          offset: {
            left: -270
          },
          content: function(cont){
            cont.html('<div class="order-contact-card t-c"><div class="loading"></div></div>');
            WD.ajax({
              url: uris.ORDER_ADDRESS,
              data: { id: id },
              success: function(data){
                cont.html(tpls.contact(data));
              }
            });
          }
        }).show();


      }).on('click', '.btn-closed', function(){  //点击关闭
        var trade_id = $(this).parents('tr').attr('data-id')
          $.confirm('是否关闭该订单？<br/>关闭后不可恢复', function(){
            WD.ajax({
              url: '/admin/order/closed',
              type:'post',
              data:{
                trade_id:trade_id
              },
              success:function(d){
                location.reload();
              }
            })
          })

      });

      return this;
    }
  };

  module.exports = Orders;
});
