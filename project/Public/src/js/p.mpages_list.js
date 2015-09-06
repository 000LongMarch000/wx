define(function(require, exports, module){
  require('./m.dialog')($);

  var util = require('./util'),
      uris = require('./uris'),
      Layer = require('./m.layer'),
      ShareGoods = require('./m.sharegoods'),
      DataList = require('./m.datalist'),
      request;

  var MPagesList = {
    tpls: {
      edit: Handlebars.compile($('#T_editMPage').html())
    },

    init: function(){
      this.$el = $('#J_mpagesList');
      this.datalist = new DataList(this.$el);
      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.$el.find('.ico-code-2d').each(function(){
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
          title: $tr.find('.mpage-name').text()
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
        var $tr = $(this).closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        $.confirm('确认删除？', function(){
          self.delItem(id);
        });
      }).on('mouseenter', 'tr', function () {
        $('.btn-edit', this).css('visibility', 'visible');
      }).on('mouseleave', 'tr', function () {
        $('.btn-edit', this).css('visibility', 'hidden');
      }).on('click', '.btn-edit', function (e) {
        e.preventDefault();
        var $tr = $(this).closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        self.editTitle(id);
      }).on('click', '.btn-set', function (e) {
        e.preventDefault();
        var $tr = $(this).closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        self.setHome(id);
      });

      $('.btn-add-page').click(function(e){
        e.preventDefault();
        self.enterEdit();
      });

      return this;
    },

    delItem: function(id){
      var $tr = this.datalist.getItem(id),
          self = this;
      WD.ajax({
        url: uris.MPAGE_DEL,
        type: 'post',
        data: { id: id },
        success: function(data){
          $tr.fadeOut('fast', function(){
            $(this).remove();
            self.datalist.del(id);
          });
        }
      });
    },

    editTitle: function (id) {
      var
        $el = $('#l_' + id + ' .mpage-name'),
        title = $el.html();
      $el.html('<input type="text" value="' + title + '">').find('input').focus();
      this.$el.on('blur keypress', $el.find('input').selector, function (e) {
        if (e.type === 'keypress' && e.keyCode !== 13) {
          return;
        }
        if (request) request.abort();
        var
          $self = $(this),
          value = $self.val();
        request = WD.ajax({
          url: uris.MPAGE_TITLE,
          type: 'POST',
          data: {
            id: id,
            data: JSON.stringify({
              title: value
            })
          },
          error: function () {
            $el.html(title);
          },
          complete: function () {
            request = undefined;
          }
        });
        $el.html(value);
        $self.off('blur');
      });
    },

    setHome: function (id) {
      WD.ajax({
        url: uris.MPAGE_HOME,
        type: 'GET',
        data: {
            id: id
          },
        success: function () {
          $.notify('设置成功，正在跳转...', function(){
            location.reload();
          });
        }
      });
    },

    enterEdit: function(id){
      var self = this,
          dlg;

      dlg = $.dlg(render(), {
        title: '添加自定义页面',
        removeOnHide: true,
        width: 550
      });

      this.dlg = dlg;

      function render(data){
        data = data || {};
        var $el = $(self.tpls.edit(data)).appendTo(document.body);

        $el.validate({
          submitHandler: function(form){
            WD.ajaxForm(form, {
              success: function(data){
                if (dlg) dlg.close();
                $.notify('保存成功，正在跳转下一步...', function(){
                  location.href = data.redirect_url;
                });
              }
            });
          }
        });

        return $el;
      }
    },

    destroy: function(){
      this.$el = null;
    }
  };

  module.exports = MPagesList;
});
