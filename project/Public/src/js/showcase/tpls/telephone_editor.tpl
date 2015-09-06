<div class="hd">电话联系</div>
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
        <label class="ctl-label">标题：</label>
        <div class="ctl">
          <textarea class="input-text" name="data.text_txt" placeholder="请添加文字">{{data.text_txt}}</textarea>
          <p class="help-block">*限10个字以内</p>
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">电话号码：</label>
        <input type="text" class="input-text input-large" name="data.tel_number" value="{{data.tel_number}}">
      </div>
      <div class="form-group">
        <label class="ctl-label">&nbsp;</label>
        <div class="ctl">
          <label>
            <input type="checkbox" name="data.show_tel" {{#if data.show_tel}}checked{{/if}}> 显示电话号码
          </label>
        </div>
      </div>
    </div>

    <div class="tab-item">
      <div class="form-group">
        <div class="ctl-label">文字颜色：</div>
        <div class="ctl ctl-color-wrap" data-color-name="color"></div>
      </div>
      <div class="form-group">
        <div class="ctl-label">背景颜色：</div>
        <div class="ctl ctl-color-wrap" data-color-name="background-color"></div>
      </div>
      <div class="form-group-line">
        <label class="ctl-label">调整间距：</label>
        <div class="box-tuner-wrap" data-config='{ "defaults": { "top": 8, "right": 8, "bottom": 8, "left": 8 }, "horizontal_enabled": true }'></div>
      </div>
    </div>
  </form>
</div>