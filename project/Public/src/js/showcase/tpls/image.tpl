<div class="comp comp-img img-list-{{data.show_type}}" {{style style}}>
  <ul class="imgs-list">
    {{#each data.imgs}}
    <li class="item">
      {{#if img}}
        <a href="javascript:;" class="img"><img src="{{img}}_320x.jpg"></a>
      {{else}}
        <a href="javascript:;" class="img img-placeholder c-{{@index}}"><img src="/statics/img/default/img_placeholder_100x100.png"></a>
      {{/if}}
    </li>
    {{else}}
    <li class="item-nil">
      <p class="note t-c">请添加图片</p>
    </li>
    {{/each}}
  </ul>

  {{#ifCond data.show_type '==' 'carousel'}}
    <div class="indicators-list">
      {{#each data.imgs}}
        <span class="item{{#if @first}} cur{{/if}}">{{@index}}</span>
      {{/each}}
    </div>
  {{/ifCond}}
</div>

{{> edit_helper}}