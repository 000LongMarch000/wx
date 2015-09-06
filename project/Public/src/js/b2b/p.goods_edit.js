define(function(require, exports, module){
  var richEditor = require('../m.kindeditor'),
      ShippingArea = require('../m.shippingarea'),
      Layer = require('../m.layer'),
      MaxImg = 9;

  var Skus = {
    tpl: Handlebars.compile($('#T_propItem').html()),

    init: function(){
      this.render().bindEvents();

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$el.find('.btn-add-prop').click(function(){
        var $cont = self.$cont;
        if ($cont.hasClass('hide')) {
          $cont.show();
          $('#J_commonOpts').hide();
        }
        self.createItem();
      });

      this.$el.on('click', '.opts a', function(e){
        var $this = $(this);
        if ($this.hasClass('btn-up')) self.moveUp(this);
        else if ($this.hasClass('btn-down')) self.moveDown(this);
        else self.delItem(this);

      })

      return this;
    },

    render: function(){
      this.$el = $('#J_goodsProps');
      this.$list = this.$el.find('tbody');
      this.$cont = this.$el.find('.goods-props-list');

      return this;
    },

    createItem: function(data){
      data = data || {};
      var $item = $(this.tpl(data));
      this.$list.append($item);
      $item.find('input[name="sku_options[]"]').rules('add', 'required');
      $item.find('input[name="sku_quantity[]"]').rules('add', {
        digits: true,
        min: 0
      });
      $item.find('.wgt-number').each(function(){
        var $this = $(this);
        if ($this.hasClass('digits')) $this.number(0, '');
        else $this.number(2, '');
      });

      return this;
    },

    moveUp: function(el){
      var $tr = $(el).closest('tr'),
          $prev = $tr.prev('tr');
      if ($prev.length) $tr.insertBefore($prev);

      return this;
    },

    moveDown: function(el){
      var $tr = $(el).closest('tr'),
          $next = $tr.next('tr');
      if ($next.length) $tr.insertAfter($next);

      return this;
    },

    delItem: function(el){
      var $tr = $(el).closest('tr');
      if (this.$list.find('tr').length <= 1) {
        $('#J_commonOpts').show();
        this.$cont.hide();
      }

      $tr.fadeOut(300, function(){
        var $this = $(this);
        $this.find('input').rules('remove');
        $this.remove();
      });

      return this;
    },

    destroy: function(){
      this.$list = this.$el = null;

      return this;
    }

  };

  var Imgs = {
    tpl: {
      item: Handlebars.compile($('#T_imgItem').html()),
      placeholder: Handlebars.compile($('#T_imgPlaceholder').html())
    },

    init: function(){
      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.$el = $('#J_imgList');
      this.$input = $('#J_imgsInput');

      var $el = this.$el,
          $input = this.$input,
          $moreImg = this.$el.find('.item-more'),
          imgs = this.imgs,
          supplier_id = Editor.opts.supplier_id,
          self = this;

      var uploaderOpts = {
        url: '/upload/product',
        flash_swf_url: '/statics/img/plupload/Moxie.swf',
        filters: {
          mime_types: [{
            title: 'Image files', extensions: 'jpg,jpeg,gif,png,bmp'
          }],
          max_file_size: '1mb'
        },
        multipart_params: {
          supplier_id: supplier_id,
          bucket: 'wdwd-prod'
        }
      };

      var uploader = new plupload.Uploader($.extend({
        browse_button: 'J_btnUploadImgMore',
        max_files: MaxImg - this.imgsCount()
      }, uploaderOpts));
      bindUploaderEvents(uploader, {
        PostInit: function(up){
          if (up.settings.max_files <= 0) self.disableUploader();
        },
        FilesAdded: function(up, files) {
          var maxFiles = up.settings.max_files;
          if (files.length > maxFiles) {
            if (maxFiles <= 0) {
              $.notify('已到上传数量上限');
            } else {
              $.notify('最多还能上传 ' + maxFiles + ' 张图片，请重新选择');
            }
            up.splice(up.files.length - files.length);
          } else {
            up.settings.max_files -= files.length;
            if (up.settings.max_files <= 0) self.disableUploader();
            var html = self.tpl.placeholder({ files: files });
            $(html).insertBefore($moreImg);
            uploader.start();
          }
        },
        FileUploaded: function(up, file, info) {
          try{
            var data = $.parseJSON(info.response);
          }catch(e){
            var data = {};
          }

          if (data && data.status == 'success') {
            var item = data.data;
            item.fid = file.id;

            $('#' + file.id).replaceWith(self.tpl.item(item));
            self.update();
          } else {
            $.notify(data.msg || '操作失败，请稍后再试');
          }
        },
        UploadComplete: function(up, files) {
          if (!self.$el.find('.item-main').length)
            self.setDefault(self.$el.find('.item').first());
        }
      });
      uploader.init();
      this.uploader = uploader;

      function bindUploaderEvents(up, params){
        _.each(params, function(fn, type){
          up.bind(type, fn);
        });
      }

      return this;
    },

    bindEvents: function(){
      var self = this;

      this.$el.on('click', '.btns a', function(){
        var cls = this.className,
            $item = $(this).closest('.item');
        switch(cls) {
          case 'btn-move-up':
            self.moveUp($item);
            break;
          case 'btn-move-down':
            self.moveDown($item);
            break;
          default:
            self.del($item);
        }
      }).on('click', '.btn-set-default', function(){
        var $item = $(this).closest('.item');
        if (!$item.hasClass('item-main')) {
          $item.insertBefore(self.$el.find('.item-main'));
          self.setDefault($item);
        }
      });

      return this;
    },

    update: function(){
      var ids = [];
      this.$el.find('.item').each(function(){
        var id = $(this).data('id');
        if (id) ids.push(id);
      });

      this.$input.val(ids.join(','));
      return this;
    },

    getImgs: function(){
      return this.$input.val();
    },

    imgsCount: function(){
      return this.$el.find('.item').length;
    },

    setDefault: function(el){
      if (!el || !el.length) return this;
      var $lastDefault = this.$el.find('.item-main');
      if (el == $lastDefault) return this;

      var $title = el.find('.goods-img-title'),
          $lastTitle = $lastDefault.find('.goods-img-title'),
          prefixText = '主图：';

      $title.text(prefixText + $title.text());
      el.addClass('item-main');
      $lastTitle.text($lastTitle.text().replace(prefixText, ''));
      $lastDefault.removeClass('item-main');
      this.update();

      return this;
    },

    moveUp: function(el){
      var $prev = el.prev('.item');
      if(!$prev.length) return this;

      if ($prev.hasClass('item-main')) this.setDefault(el);
      el.insertBefore($prev);
      this.update();

      return this;
    },

    moveDown: function(el){
      var $next = el.next('.item');
      if(!$next.length || $next.is('.item-more')) return;

      if (el.hasClass('item-main')) this.setDefault($next);
      el.insertAfter($next);
      this.update();

      return this;
    },

    del: function(el){
      var self = this;
      if (el.hasClass('item-main')) this.setDefault(el.next('.item'));
      el.fadeOut('fast', function(){
        var id = el[0].id;
        if (id) self.uploader.removeFile(id);
        el.remove();
        self.uploader.settings.max_files ++;
        self.enableUploader();

        self.update();
      });

      return this;
    },

    disableUploader: function(){
      if (!this.uploader) return this;
      this.uploader.disableBrowse();
      $('#J_btnUploadImgMore').addClass('disabled');
      return this;
    },

    enableUploader: function(){
      if (!this.uploader) return this;
      this.uploader.disableBrowse(false);
      $('#J_btnUploadImgMore').removeClass('disabled');
      return this;
    },

    destroy: function(){
      this.$el.remove();
      this.uploader.destroy();
      this.$el = this.$input = null;

      return this;
    }
  };


  var Editor = {
    init: function(opts){
      this.opts = $.extend({
        supplier_id: null,
        tags: []
      }, opts || {});

      if (!this.opts.supplier_id) throw new Error('supplier_id required');
      if (!this.opts.id) this.status = 'new';
      else this.status = 'edit';

      Skus.init();
      Imgs.init();
      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.renderImporter();

      this.detailEditor = richEditor.create('#J_goodsDetail', {
        minHeight: 400
      });

      return this;
    },

    bindEvents: function(){
      var self = this;

      //限购时间
      $('#J_goodsForm input[name=time_limit]').on('change', function(){
        var isOn = $(this).val() == 'on';
        if (isOn) $('#J_timeLimit').show();
        else $('#J_timeLimit').hide();
      });

      //销售方式
      $('#J_goodsForm').on('change', 'input.J_saleType', function(e){
        var $input = $('#J_goodsForm input.J_saleType'),
            $checked = $input.filter(':checked'),
            val = '';

        if($checked.length>1) $input.icheck('enabled');
        else $checked.icheck('disabled');

        $checked.each(function(i){
          val += (i == 0)? $(this).val() : ','+$(this).val();
        })
        $('#J_goodsForm [name=sales_type]').val(val)

        if($('#J_checkMobile').prop('checked')) $('#J_postageSec').show();
        else $('#J_postageSec').hide();
      });

      $('#J_timeLimitStart').datetimepicker({
        onSelect: function(date){
          var time = $(this).datetimepicker('getDate');
          $('#J_timeLimitEnd')
            .datetimepicker('option', 'minDate', time)
            .datetimepicker('option', 'minDateTime', time);
        }
      });

      var now = $('#J_timeLimitEnd').data('now');
      $('#J_timeLimitEnd').datetimepicker({
        minDate: now ? new Date(now) : new Date(),
        onSelect: function(date){
          var time = $(this).datetimepicker('getDate');
          $('#J_timeLimitStart')
            .datetimepicker('option', 'maxDate', time)
            .datetimepicker('option', 'maxDateTime', time);
        }
      });

      this.vali = $('#J_goodsForm').validate({
        ignore: ':hidden',
        submitHandler: function(form){
          if (!Imgs.getImgs()) {
            $.notify('请先上传商品图片');
            return false;
          }

          if (self.detailEditor) self.detailEditor.sync();

          WD.ajaxForm(form, {
            success: function(data){
              $.notify('操作成功，正在跳转...', function(){
                location.href = data.url;
              });
            }
          });
        }
      });

      if (!this.shippingArea) {
        var $postage = $('#J_postage');
        $.validator.addMethod('gt0', function(val, el){
          return this.optional(el) || (val > 0);
        }, '请输入大于0的数');

        this.shippingarea = ShippingArea.init('#J_shippingArea', {
          onCheck: function(e){
            if (this.allChecked) $postage.rules('remove', 'gt0');
            else $postage.rules('add', { 'gt0': true });
          },
          onCheckAll: function(){
            $postage.val('0.00');
          }
        });

        $postage.on('change', function(){
          var val = $(this).val();
          if (val <= 0) ShippingArea.checkAll();
          if (val > 0 && ShippingArea.allChecked) ShippingArea.unCheckAll();
        });
      }

      $('#J_postageSec').find('input[name=postage_setting]').on('change', function(){
        var val = $(this).val();
        if (val >= 1) {
          $('#J_postageShipping').show();
        } else {
          $('#J_postageShipping').hide();
        }
      });

      $(window).on('unload', function(){
        Skus.destroy();
        Imgs.destroy();
        self.destroy();
      });
    },

    renderImporter: function(){

      var layer = new Layer('#J_btnShowImport', {
        lazy: false,
        content: $('#T_importLayer').html()
      });

      $('#J_btnImport').click(function(){
        var val = layer.$el.find('input').val();

        if (!/http:\/\/[^s]*/.test(val)) {
          $.notify('输入的url不正确，请重新输入');
          return;
        }
      });

      return this;
    },

    destroy: function(){
      return this;
    }
  };

  module.exports = Editor;
});
