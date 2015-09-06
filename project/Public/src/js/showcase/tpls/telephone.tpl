<div class="comp comp-telephone" {{style style}}>
  <div class="tel-cont">
    {{#if data.tel_number}}
      <a href="tel:{{data.tel_number}}"><i class="iconfont">&#xe64c;</i>{{data.text_txt}} {{#if data.show_tel}}{{data.tel_number}}{{/if}}</a>
    {{else}}
      <i class="iconfont">&#xe64c;</i>{{data.text_txt}}
    {{/if}}
  </div>
</div>

{{> edit_helper}}