<div class="hd">音频</div>
<div class="bd">
  <form action="#" class="action" onsubmit="return false;">
    <div class="wgt-tabs">
      <ul>
        <li class="tab"><a href="javascript:;">内容</a></li>
        <li class="tab"><a href="javascript:;">样式</a></li>
      </ul>
    </div>

    <div class="tab-item">
      <div class="form-group">
        <label class="ctl-label">音频：</label>
        <div class="ctl">
          <a id="audio-uploader-{{mcid}}" href="javascript:;" class="btn btn-large btn-upload">　上传音频　</a> <span class="help-inline">*最大支持上传5MB的mp3格式音频</span>
          <div class="ctl-audio-wrap"></div>
          <input type="hidden" name="data.audio_url" value="{{data.audio_url}}">
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">样式：</label>
        <div class="ctl">
          <label class="ctl-radio"><input type="radio" name="data.show_type" value="simple" {{#ifCond data.show_type '==' 'simple'}}checked{{/ifCond}}> 简易音频样式</label>
          <label class="ctl-radio"><input type="radio" name="data.show_type" value="wechat" {{#ifCond data.show_type '==' 'wechat'}}checked{{/ifCond}}> 微信气泡样式</label>
          <ul class="ctl-user-avatars" {{#ifCond data.show_type '!=' 'wechat'}}style="display:none;"{{/ifCond}}>
            <li>
              <a href="javascript:;" class="item user-logo {{#if data.use_logo}}cur{{/if}}"><img src="{{shop_logo}}?imageView2/1/w/100" class="avatar-img"></a>
              使用店铺头像
            </li>
            <li>
              <a href="javascript:;" class="item user-avatar {{#unless data.use_logo}}cur{{/unless}}">
                <img src="{{#if data.user_avatar_img}}{{data.user_avatar_img}}?imageView2/1/w/100{{else}}{{assets_path}}/img/blank.png{{/if}}" class="avatar-img">
                <span class="avatar-hint">更改图片</span>
              </a>
              上传头像
            </li>
          </ul>
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">播放：</label>
        <div class="ctl">
          <label class="ctl-radio"><input type="radio" name="data.replay_after_pause" value="true" data-render="0" {{#if data.replay_after_pause}}checked{{/if}}> 暂停后再播放时，从头开始</label>
          <label class="ctl-radio"><input type="radio" name="data.replay_after_pause" value="false" data-render="0" {{#unless data.replay_after_pause}}checked{{/unless}}> 暂停后再播放时，从暂停位置开始</label>
        </div>
      </div>
    </div>

    <div class="tab-item">
      <div class="form-group-line">
        <label class="ctl-label">调整间距：</label>
        <div class="box-tuner-wrap"></div>
      </div>
    </div>
  </form>
</div>