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
      <th><span>分组标签</span></th>
      <th><span>商品数量</span></th>
    </tr>
  </thead>
  <tbody>
    {{#each data}}
    <tr{{#if isMemoried}} class="checked"{{/if}}{{#if ../isDisabled}}{{#unless isMemoried}} class="disabled"{{/unless}}{{/if}}>
      <td>
        <input type="checkbox" value="{{id}}"{{#if isMemoried}} checked="checked"{{/if}}{{#if ../isDisabled}}{{#unless isMemoried}} disabled="disabled"{{/unless}}{{/if}}>
        <a href="#"><span><i class="iconfont">&#xe651;</i></span></a>
      </td>
      <td class="align-left"><a href="#"><span>{{title}}</span></a></td>
      <td><a href="#"><span>{{count}}</span></a></td>
    </tr>
    {{/each}}
  </tbody>
</table>
{{else}}
<div class="selector-catalog-noresult">
  <i class="iconfont">&#xe601;</i>
  <div>没有可用的商品分组，请去创建商品分组</div>
</div>
{{/if}}
