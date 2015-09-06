<div class="hd">地图</div>
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
        <label class="ctl-label">地图标注：</label>
        <div class="ctl-map-wrap"></div>
      </div>

      <h4 class="sub-tit">地址描述</h4>
      <div class="form-group">
        <label class="ctl-label">名称：</label>
        <input type="text" class="input-text input-large" name="data.name_txt" value="{{data.name_txt}}">
      </div>
      <div class="form-group">
        <label class="ctl-label">地址：</label>
        <input type="text" class="input-text input-large" name="data.address_txt" value="{{data.address_txt}}">
      </div>
      <div class="form-group">
        <label class="ctl-label">交通：</label>
        <input type="text" class="input-text input-large" name="data.traffic_txt" value="{{data.traffic_txt}}">
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