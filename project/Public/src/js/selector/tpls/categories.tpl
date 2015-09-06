<ul class="selector-categories-list">
  {{#each data}}
  <li class="selector-categories-item"><button value="{{id}}"{{#if isCurrent}} disabled="disabled"{{/if}}>{{name}}</button></li>
  {{/each}}
</ul>