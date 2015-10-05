<div class="selector-app">
  {{#if categories}}
  <div class="selector-layout-aside">
    {{#if categories}}
    <div class="selector-categories"></div>
    {{/if}}
  </div>
  {{/if}}
  <div class="selector-layout-main">
    {{#if filters}}
    <div class="selector-layout-header">
      {{#each filters}}
      <div class="selector-filters selector-filters-{{@key}}"></div>
      {{/each}}
    </div>
    {{/if}}
    <div class="selector-layout-body">
      <div class="selector-catalog selector-catalog-{{type}}"><div class="selector-catalog-preloader"></div></div>
      <div class="selector-memory"></div>
      <div class="selector-pagination"></div>
    </div>
    <div class="selector-layout-footer">
      <div class="selector-actions">
        <ul class="selector-actions-list">
          <li class="selector-actions-item selector-actions-confirm"><button>确定</button></li>
          {{#with uploader}}
          <li class="selector-actions-item selector-actions-upload"><button id="J_selectorUpload"><i class="iconfont">&#xe650;</i><span>{{name}}</span></button></li>
          {{/with}}
        </ul>
      </div>
    </div>
  </div>
  {{#if uploader}}
  <div class="selector-layout-helper">
    {{#if uploader}}
    <div class="selector-uploader"></div>
    {{/if}}
  </div>
  {{/if}}
</div>