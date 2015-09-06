<div class="hd">标题</div>
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
          <textarea class="input-text" name="data.text_txt" placeholder="请添加文字">{{data.text_txt}}</textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">对齐：</label>
        <div class="ctl">
          <label><input type="radio" name="data.align" value="left" {{#ifCond data.align '==' 'left'}}checked{{/ifCond}}> 居左</label>　
          <label><input type="radio" name="data.align" value="center" {{#ifCond data.align '==' 'center'}}checked{{/ifCond}}> 居中</label>　
          <label><input type="radio" name="data.align" value="right" {{#ifCond  data.align '==' 'right'}}checked{{/ifCond}}> 居右</label>　
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">链接：</label>
        <div class="ctl-link-wrap"></div>
      </div>
    </div>

    <div class="tab-item">
      <div class="form-group">
        <div class="ctl-label">文字颜色：</div>
        <div class="ctl ctl-color-wrap"></div>
      </div>
      <div class="form-group">
        <div class="ctl-label">背景颜色：</div>
        <div class="ctl ctl-color-wrap"></div>
      </div>
      <div class="form-group-line">
        <label class="ctl-label">调整间距：</label>
        <div class="box-tuner-wrap"></div>
      </div>
    </div>
  </form>
</div>