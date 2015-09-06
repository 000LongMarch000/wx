<div class="comp comp-title {{alignCls data.align}}" {{style style}}>
  {{#if data.url}}
    <h3><a href="{{data.url}}">{{data.text_txt}}</a></h3>
  {{else}}
    <h3>{{data.text_txt}}</h3>
  {{/if}}
</div>

{{> edit_helper}}