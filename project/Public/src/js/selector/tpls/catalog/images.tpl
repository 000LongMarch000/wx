{{#if data}}
<ul class="selector-catalog-list">
  {{#each data}}
  <li class="selector-catalog-item">
    <a href="#"{{#if isMemoried}} class="checked"{{/if}}{{#if ../isDisabled}}{{#unless isMemoried}} class="disabled"{{/unless}}{{/if}}>
      <input type="checkbox" value="{{id}}"{{#if isMemoried}} checked="checked"{{/if}}{{#if ../isDisabled}}{{#unless isMemoried}} disabled="disabled"{{/unless}}{{/if}}>
      <span class="selector-catalog-thumb"><img src="{{url}}?imageView2/1/w/120/h/120" alt=""></span>
      <span class="selector-catalog-thumb-info">
        <!--[if lt IE 9]><span class="selector-catalog-thumb-info-bg"></span><![endif]-->
        <span class="selector-catalog-thumb-info-fg">{{w}}&times;{{h}}</span>
      </span>
      <span class="selector-catalog-overlay"><span><i class="iconfont">&#xe658;</i></span></span>
    </a>
  </li>
  {{/each}}
</ul>
{{else}}
<div class="selector-catalog-noresult">
  <i class="iconfont">&#xe601;</i>
  <div>请上传图片</div>
</div>
{{/if}}