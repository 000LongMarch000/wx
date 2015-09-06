<div class="comp comp-video" {{style style}}>
  <div class="video-cont">
    {{#if data.vid_id}}
      <img src="{{data.vid_thumb}}" class="video-thumb">
    {{/if}}
    <i class="iconfont">&#xe663;</i>
  </div>
</div>

{{> edit_helper}}