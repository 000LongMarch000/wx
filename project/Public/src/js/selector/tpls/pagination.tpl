<ul class="selector-pagination-list">
  <li class="selector-pagination-item selector-pagination-nav selector-pagination-first"><button value="1"{{#if isFirst}} disabled="disabled"{{/if}}><i class="iconfont">&#xe64d;</i></button></li>
  <li class="selector-pagination-item selector-pagination-page">
    <ul class="selector-pagination-page-list">
      {{#each pages}}
      <li class="selector-pagination-page-item"><button value="{{page}}"{{#if isCurrent}} disabled="disabled"{{/if}}>{{page}}</button></li>
      {{/each}}
      {{#if isOverflowed}}
      <li class="selector-pagination-page-item selector-pagination-page-helper"><span>...</span></li>
      {{/if}}
    </ul>
  </li>
  {{#if isHuge}}
  <li class="selector-pagination-item selector-pagination-select"><button value="{{total}}">共{{total}}页<i></i></button></li>
  {{/if}}
  <li class="selector-pagination-item selector-pagination-nav selector-pagination-last"><button value="{{total}}"{{#if isLast}} disabled="disabled"{{/if}}><i class="iconfont">&#xe64e;</i></button></li>
</ul>