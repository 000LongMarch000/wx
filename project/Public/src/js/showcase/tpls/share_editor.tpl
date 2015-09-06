<div class="hd">分享/收藏</div>
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
        <label class="ctl-label">选择按钮：</label>
        <div class="ctl">
          <label>
            <input type="checkbox" name="data.show_share" {{#if data.show_share}}checked{{/if}}> 分享
          </label>　
          <label>
            <input type="checkbox" name="data.show_favor" {{#if data.show_favor}}checked{{/if}}> 收藏
          </label>　
          <span class="help-inline">此组件只适用于微博、微信</span>
        </div>
      </div>
    </div>

    <div class="tab-item">
      <div class="form-group">
        <div class="ctl-label">分享颜色：</div>
        <div class="ctl ctl-color-wrap" data-color="share_bg"></div>
      </div>
      <div class="form-group">
        <div class="ctl-label">收藏颜色：</div>
        <div class="ctl ctl-color-wrap" data-color="favor_bg"></div>
      </div>
      <div class="form-group-line">
        <label class="ctl-label">调整间距：</label>
        <div class="box-tuner-wrap"></div>
      </div>
    </div>
  </form>
</div>