<ul class="comps-list">
  {{#each widgets}}
    <li class="item" data-type="{{id}}">
      <div class="sc-ico-cont"><i class="sc-ico ico-sc-{{id}}"></i><span class="vm-span"></span></div>
      <span class="comp-name">{{name}}</span>
    </li>
  {{else}}
    <li class="item item-nil">无可用组件</li>
  {{/each}}
</ul>
{{#if _more}}
  <a href="javascript:;" class="btn-more">展开更多</a>
{{/if}}