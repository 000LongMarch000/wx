<div class="hd">富文本</div>
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
        <label class="ctl-label">文字：</label>
        <div class="ctl">
          <textarea id="{{mcid}}-rtext" class="input-text input-xxh" name="data.text_html" placeholder="请添加文字">{{data.text_html}}</textarea>
        </div>
      </div>
    </div>

    <div class="tab-item">
      <div class="form-group-line">
        <label class="ctl-label">调整间距：</label>
        <div class="box-tuner-wrap" data-config='{ "defaults": { "top": 8, "right": 8, "bottom": 8, "left": 8 }, "horizontal_enabled": true }'></div>
      </div>
    </div>
  </form>
</div>