define(function(require, exports, module){
  require('./m.uploadify')($);
  var util = require('./util'),
      MaxPage = 10;

  var App = {
    tpls: {
      prize: Handlebars.compile($('#T_prizeItem').html()),
      page: Handlebars.compile($('#T_pageItem').html())
    },

    init: function(){
      this.$el = $('#J_eventForm');
      this.render().bindEvents();

      return this;
    },

    render: function(){
      this.$prize = $('#J_eventPrize');
      this.$prizeList = $('#J_eventPrize .prizes-list');
      this.$pages = $('#J_pages');

      return this;
    },

    bindEvents: function(){
      var self = this;
      $('#J_startTime').datetimepicker({
        onSelect: function(date){
          var time = $(this).datetimepicker('getDate');
          $('#J_endTime')
            .datetimepicker('option', 'minDate', time)
            .datetimepicker('option', 'minDateTime', time);
        }
      });

      var now = $('#J_endTime').data('now');
      $('#J_endTime').datetimepicker({
        minDate: now ? new Date(now) : new Date(),
        onSelect: function(date){
          var time = $(this).datetimepicker('getDate');
          $('#J_startTime')
            .datetimepicker('option', 'maxDate', time)
            .datetimepicker('option', 'maxDateTime', time);
        }
      });

      this.$el.find('input.J_isPrize').on('click', function(){
        var val = $(this).val();
        if (val == 'on') self.$prize.show();
        else self.$prize.hide();
      });

      var $btnUploadCardImg = $('#J_uploadCardImg');
      $btnUploadCardImg.uploadify({
        multi: false,
        width: $btnUploadCardImg.outerWidth(),
        height: $btnUploadCardImg.outerHeight(),
        buttonClass: 'btn btn-upload',
        buttonText: '上传图片',
        buttonImage: null,
        formData: {
          resize: true,
          width: 100,
          height: 100
        },
        onUploadSuccess: function(file, data, res){
          data = $.parseJSON(data);
          if (data && data.status == 'success') {
            var item = data.data;
            $('#J_cardImg').attr('src', item.url + '?imageView2/1/w/100/h/100');
            $('#J_cardImgInput').val(item.url);
          } else {
            $.notify(data.msg || '操作失败，请稍后再试');
          }
        }
      });

      this.$prize.find('.sec-prize').each(function(idx, el){
        self.bindPrizeItemEvent(el);
      });
      this.bindPagesEvent();
      this.bindPrizeEvent();

      this.$el.validate({
        ignore: ':not(:visible)',
        submitHandler: function(form){
          WD.ajaxForm(form, {
            success: function(data){
              $.notify('操作成功', function(){
                if (data.redirect_url) location.href = data.redirect_url;
              });
            }
          });
        }
      });

      return this;
    },

    bindPagesEvent: function(){
      var $btn = $('#J_btnUploadPage'),
          $pages = this.$pages,
          $imgs = $pages.find('.item'),
          $last = $pages.find('.item-upload'),
          self = this,
          max = MaxPage;

      $btn.uploadify({
        multi: true,
        width: $btn.outerWidth(),
        height: $btn.outerHeight(),
        buttonClass: 'img-placeholder',
        buttonText: '+',
        queueSizeLimit: max,
        uploadLimit: max - $imgs.length,
        onUploadStart: function(){
          $btn.uploadify('disable', true);
        },
        onUploadComplete: function(){
          $btn.uploadify('disable', false);
        },
        onUploadSuccess: function(file, data, res){
          data = $.parseJSON(data);
          if (data && data.status == 'success') {
            var item = data.data;

            $(self.tpls.page(item)).insertBefore($last);
            self.updatePages();
          } else {
            $.notify(data.msg || '操作失败，请稍后再试');
          }
        },
        itemTemplate: '<div class="hide"></div>'
      });

      $pages.on('click', '.btns a', function(){
          var cls = this.className,
              $el = $(this).closest('.item');

          if (cls == 'btn-move-up') self.movePageUp($el);
          else if (cls == 'btn-move-down') self.movePageDown($el);
          else if (cls == 'btn-del') self.delPage($el);
        });

      return this;
    },

    bindPrizeEvent: function(){
      var $prize = $('#J_eventPrize');
      $('#J_addPrize').on('click', _.bind(this.addPrize, this));
      $prize.on('click', '.btn-del', _.bind(this.delPrize, this))
        .on('change', 'select.J_prizeSel', function(){
          var idx = this.selectedIndex,
              $els = $(this).closest('.form-group').find('.prize-type').hide();
          $els.eq(idx).show();
        })
        .on('click', 'input.J_prizeCond', function(){
          var val = $(this).val(),
              $els = $(this).closest('.form-group').find('.cond').hide();
          if (val == 'count') $els.eq(0).show();
          else $els.eq(1).show();
        });

      return this;
    },

    bindPrizeItemEvent: function(el, isNew){
      var $prize = $(el),
          id = $prize.data('prize'),
          $btn = $('#J_uploadPrizeImg_' + id),
          $uploadImg = $btn.parent().find('img'),
          $uploadInput = $btn.parent().find('input.required-img');

      $btn.uploadify({
        multi: false,
        width: 60,
        height: 30,
        buttonClass: 'btn btn-upload',
        buttonText: '上传图片',
        buttonImage: null,
        onUploadStart: function(){
          $btn.uploadify('disable', true);
        },
        onUploadComplete: function(){
          $btn.uploadify('disable', false);
        },
        onUploadSuccess: function(file, data, res){
          data = $.parseJSON(data);
          if (data && data.status == 'success') {
            var item = data.data;

            $uploadImg.attr('src', item.url + '?imageView2/1/w/200/h/200');
            $uploadInput.val(item.url);
          } else {
            $.notify(data.msg || '操作失败，请稍后再试');
          }
        }
      });

      if (isNew) {
        $prize.find('input').rules('add', {});
      }

      return this;
    },

    addPrize: function(){
      var cid = 'cid_' + util.uid(),
          $html = $(this.tpls.prize({ cid: cid })).appendTo(this.$prizeList);

      this.bindPrizeItemEvent($html, true);
      return this;
    },

    delPrize: function(e){
      if (this.$prize.find('.sec-prize').length <= 1) return false;

      var $el = $(e.target);
      if ($el.is('.sec-prize')) $el.remove();
      else {
        var $sec = $el.closest('.sec-prize');
        $sec.remove();
      }

      return this;
    },

    movePageUp: function(el){
      var $prev = el.prev('.item');
      if(!$prev.length) return;

      $(el).insertBefore($prev);
      this.updatePages();

      return this;
    },

    movePageDown: function(el){
      var $next = el.next('.item');
      if(!$next.length) return;

      $(el).insertAfter($next);
      this.updatePages();

      return this;
    },

    delPage: function(el){
      var self = this;

      $(el).fadeOut('fast', function(){
        el.remove();
        var $btn = $('#J_btnUploadPage'),
            swfuploadify = $btn.data('uploadify'),
            val = $btn.uploadify('settings', 'uploadLimit'),
            stats = swfuploadify.getStats();

        stats.successful_uploads -= 1;
        swfuploadify.setStats(stats);
        $btn.uploadify('settings', 'uploadLimit', val);

        self.updatePages();
      });

      return this;
    },

    updatePages: function(){
      var urls = [],
          $pages = this.$pages.find('.item');
      $pages.each(function(){
        var url = $(this).data('url');
        if (url) urls.push(url);
      });

      if ($pages.length >= MaxPage) $('#J_pageUpload').css('visibility', 'hidden');
      else $('#J_pageUpload').css('visibility', 'visible');

      $('#J_pagesInput').val(urls.join(','));
      return this;
    }
  };

  module.exports = App;
});