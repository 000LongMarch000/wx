define(function(require, exports, module){
  var tpl = require('../tpls/video.tpl'),
      editor_tpl = require('../tpls/video_editor.tpl'),
      Base = require('./base'),
      CLIENT_ID = 'ea8d700c96a7365c';

  var Model = Base.Model.extendWithDefaults({
        wgt_def_id: 'video',
        data: {
          vid_url: '',
          vid_id: '',
          vid_thumb: ''
        }
      }, {
        initialize: function(){
          Base.Model.prototype.initialize.apply(this, arguments);

          this.on('change:data.vid_url', this.updateVideoInfo, this);
          return this;
        },

        validation: {
          'data.vid_url': function validateYoukuOrTudou(val){
            if (!/^http\:\/\/(v\.youku\.com)\/.+/.test(val))
              return '请输入完整的优酷视频地址';
          }
        },

        updateVideoInfo: function(){
          var url = this.get('data.vid_url'),
              self = this;

          $.getJSON('https://openapi.youku.com/v2/videos/show_basic.json?callback=?', {
            client_id: CLIENT_ID,
            video_url: url
          }, function(data){
            if (data && data.id) {
              self.set('data.vid_id', data.id);
              self.set('data.vid_thumb', data.thumbnail);
            } else {
              $.notify('获取信息失败，请检查视频地址是否正确');
            }
          }).error(function(){
            $.notify('操作失败，请稍后再试');
          });
        }
      });

  var View = Base.View.extendWithTpl(tpl);

  var EditorView = Base.EditorView.extendWithTpl(editor_tpl, {
    render: function(){
      Base.EditorView.prototype.render.apply(this, arguments);
    }
  });

  exports.Model = Model;
  exports.View = View;
  exports.EditorView = EditorView;
});