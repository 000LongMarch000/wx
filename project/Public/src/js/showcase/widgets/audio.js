//require plupload
define(function(require, exports, module){
  var tpl = require('../tpls/audio.tpl'),
      editor_tpl = require('../tpls/audio_editor.tpl'),
      Base = require('./base'),
      CtlAudio = require('../ctls/audio'),
      Selector = require('../../selector/index'),
      audioDuration = function(dur){
        var len = ~~ (+dur),
            str;
        if (len > 60) {
          str = Math.floor(len / 60) + '\'' + len % 60 + '"';
        } else {
          str = len + '"';
        }

        return str
      };

  Handlebars.registerHelper('audio_duration', function(duration){
    var str = audioDuration(duration);
    return new Handlebars.SafeString(str);
  });

  var Model = Base.Model.extendWithDefaults({
        wgt_def_id: 'audio',
        data: {
          audio_url: '',
          audio_duration: '',
          show_type: 'wechat', // simple | wechat
          use_logo: true,
          user_avatar_id: '',
          user_avatar_img: '',
          replay_after_pause: true
        }
      }, {
        validation: {
          'data.audio_url': function(val){
            if (!val) return '请先上传音频';
          }
        }
      });

  var View = Base.View.extendWithTpl(tpl, {
    render: function(){
      var data = $.extend(true, {}, this.model.attributes, {
        data: {
          shop_logo: WD_CONFS.shop_logo
        }
      });

      Base.View.prototype.render.call(this, data);

      return this;
    }
  });

  var EditorView = Base.EditorView.extendWithTpl(editor_tpl, {
    initialize: function(){
      Base.EditorView.prototype.initialize.apply(this, arguments);
      var self = this;

      this.listenTo(this.model, 'change:data.show_type', function(model, value){
        var action = value == 'wechat' ? 'show' : 'hide';
        this.$el.find('.ctl-user-avatars')[action]();
        self.show();
      });
    },

    render: function(){
      var data = this.model.attributes,
          self = this,
          ctlAudio;

      data = _.extend({
        assets_path: WD_CONFS.assets_path,
        shop_logo: WD_CONFS.shop_logo
      }, data);

      Base.EditorView.prototype.render.call(this, data);

      if (CtlAudio.isAudioSupport) {
        var $audio = this.$el.find('.ctl-audio-wrap').first();
        ctlAudio = new CtlAudio({
          el: $audio,
          data: this.model.getData()
        });

        this.addCtl(ctlAudio);
      }

      var uploader = new plupload.Uploader({
        browse_button: 'audio-uploader-' + this.mcid,
        runtimes: 'html5,flash,html4',
        url: '/upload_media.php',
        filters: {
          max_file_size: '5mb',
          mime_types: [{ title: 'Audio files', extensions: 'mp3' }]
        },
        flash_swf_url: '/statics/img/plupload/Moxie.swf',
        init: {
          StateChanged: function(up){
            if (up.state == plupload.STARTED) {
              up.disableBrowse();
            } else {
              up.disableBrowse(false);
            }
          },

          FilesAdded: function(up, files){
            $(up.settings.browse_button).text('　正在上传...　');
            up.start();
          },

          FileUploaded: function(up, file, info){
            $(up.settings.browse_button).text('　上传音频　');
            var res;
            try{
              res = $.parseJSON(info.response);
            }catch(e){
              res = {};
            }

            if (res && res.status == 'success') {
              var data = {
                    'data.audio_url': res.data.url,
                    'data.audio_duration': res.data.duration
                  },
                  errors = self.preVali(data);
              if (!errors) {
                self.model.set(data);
                var durStr = audioDuration(res.data.duration);
                self.$el.find('.audio-duration').text(durStr);
              }
              if(ctlAudio) ctlAudio.loadAudio(res.data.url);
            } else {
              $.notify(res.msg || '操作失败，请稍后再试');
            }
          },

          Error: function(up, err){
            var msg = err.code == -600 ? '文件大小超限' : '操作失败，请稍后再试';
            $.notify(msg);
            if (console && console.error) console.error(err.code + ':' + err.message);
          }
        }
      });

      uploader.init();
      this.uploader = uploader;

      var $avatars = this.$el.find('.ctl-user-avatars .item');
      $avatars.on('click', function(){
        var $this = $(this),
            useLogo = $this.hasClass('user-logo');

        if (useLogo) {
          self.model.set('data.use_logo', true);
          $avatars.filter('.cur').removeClass('cur');
          $this.addClass('cur');
        } else {
          self.openSelector();
        }
      });

      return this;
    },

    openSelector: function(relEl){
      var self = this;
      new Selector({
        type: 'images',
        data: this.model.get('data.user_avatar_id'),
        callback: function(data){
          if (data && data.id) {
            var $avatars = self.$el.find('.ctl-user-avatars .item').removeClass('cur');
            $avatars.removeClass('cur').filter('.user-avatar').addClass('cur')
              .find('.avatar-img').attr('src', data.url + '?imageView2/1/w/100');

            self.model.set({
              'data.use_logo': false,
              'data.user_avatar_id': data.id,
              'data.user_avatar_img': data.url
            });

          }
        }
      }).popup();
    },

    remove: function(){
      this.uploader.destroy();
      this.uploader = null;
      Base.EditorView.prototype.remove.call(this);
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});