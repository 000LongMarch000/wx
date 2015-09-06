<div class="hd">商品</div>
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
          <label><input type="radio" name="data.show_type" value="2col" {{#ifCond data.show_type '==' '2col'}}checked{{/ifCond}}> 平铺</label>　
          <label><input type="radio" name="data.show_type" value="1col" {{#ifCond data.show_type '==' '1col'}}checked{{/ifCond}}> 列表</label>　
          <label><input type="radio" name="data.show_type" value="1b2s" {{#ifCond data.show_type '==' '1b2s'}}checked{{/ifCond}}> 一大两小</label>　
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">&nbsp;</label>
        <div class="ctl">
          <label><input type="checkbox" name="data.show_pdt_name" {{#if data.show_pdt_name}}checked{{/if}}> 显示商品名称</label>
        </div>
        <div class="ctl">
          <label><input type="checkbox" name="data.show_buy_btn" {{#if data.show_buy_btn}}checked{{/if}}> 显示商品购买按钮</label>
        </div>
      </div>
      <div class="form-group-line">
        <div class="ctl pdts-list-editor">
          从商品列表中选择
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