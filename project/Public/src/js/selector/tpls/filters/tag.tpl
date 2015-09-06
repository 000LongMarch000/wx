<label>{{name}}：</label>
{{#if data}}
<ul class="selector-filters-tag-list">
  <li class="selector-filters-tag-item"><button disabled="disabled">全部</button></li>
  {{#each data}}
  <li class="selector-filters-tag-item"><button value="{{id}}">{{value}}</button></li>
  {{/each}}
</ul>
{{else}}
<span class="selector-filters-tag-noresult">编辑商品时添加标签</span>
{{/if}}