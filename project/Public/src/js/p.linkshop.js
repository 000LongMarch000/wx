define(function(require, exports, module){
  var LinkShop = {
    tpls: {
      taobao: Handlebars.compile($('#T_linkTaobao').html()),
      other: Handlebars.compile($('#T_linkOther').html())
    },

    init: function(el){
      this.$el = $(el);
      this.render().bindEvents();

      return this;
    },

    createShop: function(type, cont){
      var ret;
      if (type == 'taobao') {
        ret = this.createShopTaobao(cont);
      } else {
        ret = this.createShopOther(cont);
      }

      return ret;
    },

    createShopTaobao: function(cont){
      var el = $(this.tpls.taobao()).appendTo(this.$el);

      return el;
    },

    createShopOther: function(cont){
      var el = $(this.tpls.other()).appendTo(cont);

      return el;
    },

    render: function(){
      return this;
    },

    bindEvents: function(){

      return this;
    }
  };

  module.exports = LinkShop;
});