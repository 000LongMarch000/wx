<div class="event-selector">
  <ul class="event-types">
    {{#each types}}
      <li class="item" data-type="{{key}}"><a href="javascript:;">{{name}}</a></li>
    {{/each}}
  </ul>
  <div class="events-list">
    {{#each types}}
      {{#ifCond key '==' 'Product'}}
        <div class="event-comp products-frame">
          <div class="media-menus">
            <ul class="wgt-tabs media-tabs">
              <li class="tab"><a href="javascript:;">全部商品</a></li>
              <li class="tab tab-search"><a href="javascript:;" style="display:none">搜索结果</a></li>
            </ul>
            <form class="media-search" action="/admin/data/searchProducts" method="get" onsubmit="return false;">
              <select name="type">
                <option value="title">名称</option>
                <option value="sku">货号</option>
              </select>
              <input type="text" class="input-text" name="key_word" placeholder="请输入商品名称或货品编号">
              <button class="btn btn-mini btn-primary" type="submit">搜索</button>
            </form>
          </div>
          <div class="items-cont">
            <div class="items product-items">
              <p class="note">正在加载...</p>
            </div>
            <div class="pagination"></div>
          </div>
          <div class="items-cont items-search-cont">
          </div>
        </div>
      {{else}}
        <div class="event-comp">
          <div class="items">
            <p class="note">正在加载...</p>
          </div>
          <div class="pagination"></div>
        </div>
      {{/ifCond}}
    {{/each}}
  </div>
  <div class="btns"><button type="button" class="btn btn-large btn-save">确定</button></div>
</div>