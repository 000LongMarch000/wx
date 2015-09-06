<span>
  <span class="selector-pagination-select-up"><i></i></span>
  <ul class="selector-pagination-select-list">
    {{#each pages}}
    <li class="selector-pagination-select-item"><button value="{{page}}"{{#if isCurrent}} disabled="disabled"{{/if}}>{{page}}</button></li>
    {{/each}}
  </ul>
  <span class="selector-pagination-select-down"><i></i></span>
</span>