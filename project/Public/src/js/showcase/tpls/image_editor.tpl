<div class="hd">图片</div>
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
        <label class="ctl-label">列表样式：</label>
        <div class="ctl">
          <label><input type="radio" name="data.show_type" value="1col" {{#ifCond data.show_type '==' '1col'}}checked{{/ifCond}}> 分开显示-大图</label>　
          <label><input type="radio" name="data.show_type" value="2col" {{#ifCond data.show_type '==' '2col'}}checked{{/ifCond}}> 分开显示-小图</label>　<br><br>
          <label><input type="radio" name="data.show_type" value="carousel" {{#ifCond data.show_type '==' 'carousel'}}checked{{/ifCond}}> 轮播显示-大图</label>
        </div>
      </div>
      <div class="form-group-line">
        <div class="ctl imgs-list-editor">
          从图片列表中选择
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