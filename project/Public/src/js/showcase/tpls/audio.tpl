<div class="comp comp-audio" {{style style}}>
  {{#ifCond data.show_type '==' 'simple'}}
    <div class="audio-cont audio-simple">
      <i class="iconfont ico-audio-play">&#xe664;</i>
      <i class="iconfont ico-audio-speech">&#xe665;</i>
      <div class="audio-controls">
        <div class="audio-progress-bar">
          <div class="audio-progress" style="width: 30%;"></div>
        </div>
        <div class="audio-duration">{{audio_duration data.audio_duration}}</div>
      </div>
    </div>
  {{else}}
    <div class="audio-cont audio-wechat">
      <div class="audio-avatar">
        <img src="{{#if data.use_logo}}{{data.shop_logo}}?imageView2/1/w/100{{else}}{{data.user_avatar_img}}?imageView2/1/w/100{{/if}}" class="avatar-img">
      </div>
      <div class="audio-duration">{{audio_duration data.audio_duration}}</div>
      <div class="audio-part">
        <i class="arr-l"><i class="arr-inner"></i></i>
        <i class="iconfont ico-audio-speech">&#xe665;</i>
      </div>
    </div>
  {{/ifCond}}
</div>

{{> edit_helper}}