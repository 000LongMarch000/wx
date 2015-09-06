<div class="comp comp-shop" {{style style}}>
  <a href="javascript:;" class="shop-cont">
    <span class="shop-name">{{shop_info.title}}</span>
    {{#ifCond shop_info.authenticated '==' '2'}}
      {{#ifCond shop_info.auth_type '==' 'personal'}}
        <span class="cert-info orange">个人商家</span>
      {{/ifCond}}
      {{#ifCond shop_info.auth_type '==' 'company'}}
        <span class="cert-info blue">企业商家</span>
      {{/ifCond}}
      {{#ifCond shop_info.auth_type '==' 'shop'}}
        {{#ifCond shop_info.auth_shop_type '==' 'B'}}
          <span class="cert-info orange">天猫商家</span>
        {{else}}
          <span class="cert-info orange">淘宝商家</span>
        {{/ifCond}}
      {{/ifCond}}
    {{/ifCond}}
    <div class="pull-right">
      进店逛逛 <i class="iconfont">&#xe619;</i>
    </div>
  </a>
</div>

{{> edit_helper}}