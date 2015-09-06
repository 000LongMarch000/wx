<div class="comp comp-pdt pdt-list-{{data.show_type}}" {{style style}}>
  <ul class="pdts-list">
    {{#each data.pdt_infos}}
    <li class="item">
      <div class="list-item">
        {{#if img}}
          <a href="javascript:;" class="pdt-img"><img src="{{img}}?imageView2/2/w/320/h/320"></a>
        {{else}}
          <a href="javascript:;" class="pdt-img img-placeholder c-{{@index}}"><img src="/statics/img/default/pdt_placeholder_100x100.png"></a>
        {{/if}}
        <div class="pdt-cont">
          {{#if ../data.show_pdt_name}}
            <a href="javascript:;" class="pdt-name">{{name}}</a>
          {{/if}}
          <span class="f-price">￥{{price}}</span>
          {{#if ../data.show_buy_btn}}<a href="javascript:;" class="btn-buy"><i class="iconfont">&#xe647;</i></a>{{/if}}
        </div>
      </div>
    </li>
    {{else}}
    <li class="item-nil">
      <p class="note">请添加商品</p>
    </li>
    {{/each}}
  </ul>
</div>

{{> edit_helper}}