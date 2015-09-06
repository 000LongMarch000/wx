define(function(require, exports, module){
  var util = require('./util'),
      uris = require('./uris'),
      Layer = require('./m.layer'),
      ShareGoods = require('./m.sharegoods'),
      DataList = require('./m.datalist'),
      Dialog = require('./m.dialog'),
      changeTpl = require('./tpls/goodsList_change.tpl'),
      $saleCount =  $('#J_listSaleCount');

  var GoodsList = {
    init: function(){
      this.$el = $('#J_goodsList');
      this.datalist = new DataList(this.$el, {
        idPrefix: 'g'
      });
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
            },
            img = $tr.find('.goods-img img').attr('src').split('_70x70.jpg')[0] + '_240x240.jpg',
            title = $tr.find('.goods-name').text();

        if (!id) return;

        $.extend(params, {
          title: title,
          weiboTitle: '上新啦！@有量福利团，我发布了一个新商品【' + title + '】,购买戳这里:' + params.link,
          img: /\/img\/default/.test(img) ? null : img
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

      this.$el.find('.btn-facetoface').each(function(){
        var $this = $(this),
            id = $this.closest('tr').data('id');

        new Layer($this, {
          offset:{
            left:-160
          }, 
          content:'<div class="wgt-facetoface">'+
                    '<img src="/src/img/facetoface.png"  />'+
                    '<div class="download"><a href="/admin/product/qrtars/'+id+'">点击下载当面购二维码</a></div>'+
                    '<p>下载的二维码tgz文件中包含了所有规格的当面购二维码，以规格命名</p>'+
                  '</div>'
        })
      })

      return this;
    },

    bindEvents: function(){
      var self = this;
      Dialog($);
      this.$el.on('click', '.btn-del', function(){
        var $tr = $(this).closest('tr'),
            id = $tr.data('id');
        if (!id) return;

        $.confirm('确认删除？', function(){
          self.delItem(id);
        });
      });

      $('#J_goodsListActions').on('click', '.btn', function(){
        var $this = $(this),
            act = $this.data('action');

        if (!act) return;
        self.performAct(act);
      });

      return this;
    },

    delItem: function(id){
      var $tr = this.datalist.getItem(id),
          self = this;

      WD.ajax({
        url: uris.PRODUCT_DEL,
        type: 'post',
        data: { id: id },
        success: function(data){
          $tr.fadeOut('fast', function(){
            self.datalist.del(id);
            $(this).remove();
            $saleCount.html(parseInt($saleCount.text(), 10)-1);
          });
        }
      });
    },

    changeList:function(){

      var dlg = $.dlg({
        title:'批量修改商品',
        width:600,
        html:changeTpl,
        removeOnHide: true
      });

      var uploader = new plupload.Uploader({         
        browse_button : 'J_goodsListPicker', // you can pass in id...
        //container: dlg.el, // ... or DOM Element itself
         
        url : "/admin/product/bulkedit",
         
        filters : {
            max_file_size : '2mb',
            mime_types: [
                {title : "CSV files", extensions : "CSV"}
            ]
        },
     
        // Flash settings
        flash_swf_url : '/statics/img/plupload/Moxie.swf',
     
        init: {
            PostInit: function() { 
                var $con = dlg.el;

                //换一个
                dlg.el.find('#J_resetBtn').on('click', function(){
                    $con.find('.step-2').hide();
                    $con.find('.step-1').show();
                })

                $('#J_goodsListUploader').on('click', function(){
                    
                    uploader.start();
                    $con.find('.step-2').hide();
                    $con.find('.step-3').show();
                    $con.find('.close').hide();
                })
            },
     
            FilesAdded: function(up, files) {
                var $con = dlg.el;

                if(up.files.length>1) up.splice(0, 1);
                $con.find('.step-1').hide();
                $con.find('.step-2').show();

                plupload.each(files, function(file) {
                    $con.find('.added-info span').text(file.name)
                });
            },
     
            UploadProgress: function(up, file) {
                var $con = dlg.el;

                $con.find('.upload-progress').html(file.percent);
                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            },

            FileUploaded: function(up, file, info) {
              var data = $.parseJSON(info.response);
              console.log(data)
              var $con = dlg.el;

              $con.find('.step-3').hide();
              $con.find('.step-4').show();
              $con.find('.close').show();

              if (data && data.status == 'success') {
                $con.find('.step-4 p').text('上传成功：本次成功修改了'+data.data.res.success+'条数据')
              } else {
                $con.find('.step-4 p').text('上传失败：'+ data.msg ||'操作失败，请稍后再试' )
              }
            },

            UploadComplete: function(){
            },
     
            Error: function(up, err) {
                this.FileUploaded(up, null, null);
            }
        }
    });
     
    uploader.init();

    },

    performAct: function(act){
      var url = url;
      switch (act) {
        case 'pub':
          url = uris.PRODUCT_PUB;
          break;
        case 'unpub':
          url = uris.PRODUCT_UNPUB;
          break;
        case 'del':
          url = uris.PRODUCT_DEL;
          break;
        case 'edit':
          url = uris.PRODUCT_ADJUST;
          break;
        case 'change':
          this.changeList();
          return;
          break;
      }

      var ids = this.datalist.getSelected();
      if (!ids.length) {
        $.notify('请先选择商品');
        return false;
      }
      ids = ids.join(',');

      if (act == 'del') {
        $.confirm('确认删除?', function(){
          doPost(ids);
        });
      } else if (act == 'edit') {
        var dlg = $.dlg({
          title: '批量改价',
          width: 480,
          removeOnHide: true,
          html: $('#T_goodsListEdit').html()
        });
        $('#J_formGoodsListEdit').on('click', '.btn-close', function(){
          dlg.close();
        }).on('change', '.select', function(){
          var i = parseInt($(this).val());
          $('#J_formGoodsListEdit .J_toggle').addClass('hide').eq(i).removeClass('hide');
        }).validate({
          submitHandler: function(form){
            var type = parseInt($('[name="type"]', form).val()),
                value = $('.J_toggle', form).eq(type).find('[name="value"]').val();
            doPost(ids, {
              data: {
                id: ids,
                type: type,
                value: value
              },
              beforeSend: function(){
                $('button', form).attr('disabled', 'disabled');
              },
              success: function(){
                dlg.close();
                $.notify('操作成功, 正在刷新...', function(){
                  location.reload(true);
                });
              },
              complete: function(){
                $('button', form).removeAttr('disabled');
              }
            });
          }
        });
        $('#J_formGoodsListEdit .J_toggle input').each(function(){
          $(this).number(parseInt($(this).attr('decimal')), '');
        });
      } else {
        doPost(ids);
      }

      function doPost(ids, xhr) {
        xhr = $.extend({
          url: url,
          type: 'post',
          data: { id: ids },
          success: function(){
            $.notify('操作成功, 正在刷新...', function(){
              location.reload(true);
            });
          }
        }, xhr);
        WD.ajax(xhr);
      }
    },

    destroy: function(){
      this.$el = null;
    }
  };

  module.exports = GoodsList;
});
