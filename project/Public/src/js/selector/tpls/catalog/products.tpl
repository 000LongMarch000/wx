{{#if data}}
<table>
  <thead>
    <tr{{#if isPartialChecked}} class="partialChecked"{{/if}}{{#if isAllChecked}} class="allChecked"{{/if}}{{#if isDisabled}}{{#unless isPartialChecked}}{{#unless isAllChecked}} class="disabled"{{/unless}}{{/unless}}{{/if}}>
      <th>
        {{#if isMultiple}}
        <input type="checkbox" value="all"{{#if isPartialChecked}} checked="checked"{{/if}}{{#if isAllChecked}} checked="checked"{{/if}}>
        <a href="#"><span><i class="iconfont">&#xe651;</i></span></a>
        {{else}}
        <span>选择</span>
        {{/if}}
      </th>
      <th><span>商品名称</span></th>
      <th><span>商品编号</span></th>
      <th><span>销售价</span></th>
      <th><span>创建时间</span></th>
    </tr>
  </thead>
  <tbody>
    {{#each data}}
    <tr{{#if isMemoried}} class="checked"{{/if}}{{#if ../isDisabled}}{{#unless isMemoried}} class="disabled"{{/unless}}{{/if}}>
      <td>
        <input type="checkbox" value="{{id}}"{{#if isMemoried}} checked="checked"{{/if}}{{#if ../isDisabled}}{{#unless isMemoried}} disabled="disabled"{{/unless}}{{/if}}>
        <a href="#"><span><i class="iconfont">&#xe651;</i></span></a>
      </td>
      <td class="align-left">
        <a href="#">
          <span class="selector-catalog-item-thumb"><img src="{{img}}?imageView2/1/w/160/h/160" alt=""></span>
          <span>{{title}}</span>
          <span class="selector-catalog-item-thumb-preview">
            <!--[if lt IE 9]><span class="selector-catalog-item-thumb-preview-helper"></span><![endif]-->
            <img src="{{img}}?imageView2/1/w/160/h/160" alt="">
          </span>
        </a>
      </td>
      <td><a href="#"><span>{{product_id}}</span></a></td>
      <td><a href="#"><span>{{price}}</span></a></td>
      <td><a href="#"><span>{{formated_created_at}}</span></a></td>
    </tr>
    {{/each}}
  </tbody>
</table>
{{else}}
  {{#if isSearch}}
  <div class="selector-filters-search-noresult">
    <i class="iconfont">&#xe660;</i>
    <div>没有搜到您要的信息，请试试其他搜索条件或关键词</div>
  </div>
  {{else}}
  <div class="selector-catalog-noresult">
    <i class="iconfont">&#xe601;</i>
    <div>没有可用的商品，请去创建商品</div>
  </div>
  {{/if}}
{{/if}}