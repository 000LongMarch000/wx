<div class="hd">公告</div>
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
          <input class="input-text" name="data.title_txt" value="{{data.title_txt}}">
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">内容：</label>
        <div class="ctl">
          <textarea class="input-text input-xxh" name="data.body_txt">{{data.body_txt}}</textarea>
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