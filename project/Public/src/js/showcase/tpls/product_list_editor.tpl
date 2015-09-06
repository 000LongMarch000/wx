<div class="hd">商品列表</div>
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
        <label class="ctl-label">商品来源：</label>
        <div class="ctl">
          <label><input type="radio" name="data.pdt_filter_type" value="all" {{#ifCond data.pdt_filter_type '==' 'all'}}checked{{/ifCond}}> 全部</label>　
          <label><input type="radio" name="data.pdt_filter_type" value="tags" {{#ifCond data.pdt_filter_type '==' 'tags'}}checked{{/ifCond}}> 按标签</label>　
        </div>
        <div class="ctls ctls-selector">
        </div>
      </div>
      <div class="form-group-div"></div>
      <div class="form-group">
        <label class="ctl-label">商品排序：</label>
        <div class="ctl">
          <label><input type="radio" name="data.pdt_sort" value="updated_at" data-render="0" {{#ifCond data.pdt_sort '==' 'updated_at'}}checked{{/ifCond}}> 按时间</label>　
          <label><input type="radio" name="data.pdt_sort" value="sell_count" data-render="0" {{#ifCond data.pdt_sort '==' 'sell_count'}}checked{{/ifCond}}> 按销量</label>　
          <label><input type="radio" name="data.pdt_sort" value="like_total" data-render="0" {{#ifCond data.pdt_sort '==' 'like_total'}}checked{{/ifCond}}> 按人气</label>　
          <label><input type="radio" name="data.pdt_sort" value="price" data-render="0" {{#ifCond data.pdt_sort '==' 'price'}}checked{{/ifCond}}> 按价格</label>　
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">列表样式：</label>
        <div class="ctl">
          <label><input type="radio" name="data.show_type" value="2col" {{#ifCond data.show_type '==' '2col'}}checked{{/ifCond}}> 平铺</label>　
          <label><input type="radio" name="data.show_type" value="1col" {{#ifCond data.show_type '==' '1col'}}checked{{/ifCond}}> 列表</label>　
          <label><input type="radio" name="data.show_type" value="1b2s" {{#ifCond data.show_type '==' '1b2s'}}checked{{/ifCond}}> 一大两小</label>　
        </div>
      </div>
      <div class="form-group">
        <label class="ctl-label">显示个数：</label>
        {{pdt_list_select data.show_count}}
      </div>
      <div class="form-group">
        <label class="ctl-label">&nbsp;</label>
        <div class="ctl">
          <label><input type="checkbox" name="data.show_pdt_name" {{#if data.show_pdt_name}}checked{{/if}}> 显示商品名称</label>
        </div>
        <div class="ctl">
          <label><input type="checkbox" name="data.show_buy_btn" {{#if data.show_buy_btn}}checked{{/if}}> 显示购物车按钮</label>
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