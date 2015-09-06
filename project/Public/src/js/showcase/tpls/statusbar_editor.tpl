<div class="hd">页面设置</div>
<div class="bd">
  <form action="#" onsubmit="return false;">
    <div class="form-group">
      <label class="ctl-label">标题：</label>
      <input type="text" name="data.title" class="input-text input-xlarge" value="{{data.title}}" placeholder="输入此页面的标题">
    </div>
    <div class="form-group">
      <label class="ctl-label">分享标题：</label>
      <input type="text" name="data.share_title" class="input-text input-xlarge" value="{{data.share_title}}" placeholder="此标题会作为微信分享的标题">
    </div>
    <div class="form-group">
      <label class="ctl-label">分享描述：</label>
      <textarea name="data.share_desc" class="input-text">{{data.share_desc}}</textarea>
    </div>
  </form>
</div>