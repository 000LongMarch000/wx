<div class="ctl-link" data-ctl="{{ctl_id}}">
  <select class="select link-type" name="link[{{ctl_id}}][link_type]">
    <option value="none" {{#ifCond link_type '==' 'none'}}selected{{/ifCond}}>无链接</option>
    <option value="home" {{#ifCond link_type '==' 'home'}}selected{{/ifCond}}>店铺首页</option>
    <option value="page" {{#ifCond link_type '==' 'page'}}selected{{/ifCond}}>自定义页面</option>
    <option value="event" {{#ifCond link_type '==' 'event'}}selected{{/ifCond}}>活动</option>
    <option value="popular" {{#ifCond link_type '==' 'popular'}}selected{{/ifCond}}>拼人气活动</option>
    <option value="product" {{#ifCond link_type '==' 'product'}}selected{{/ifCond}}>商品</option>
    <option value="coupon" {{#ifCond link_type '==' 'coupon'}}selected{{/ifCond}}>优惠券</option>
    <option value="coupons_list" {{#ifCond link_type '==' 'coupons_list'}}selected{{/ifCond}}>优惠券列表</option>
    <option value="tags_group" {{#ifCond link_type '==' 'tags_group'}}selected{{/ifCond}}>分组标签</option>
    <option value="url" {{#ifCond link_type '==' 'url'}}selected{{/ifCond}}>外链</option>
  </select>
  {{#ifCond link_type '==' 'url'}}
    <input type="text" class="input-text link-url" name="link[{{ctl_id}}][link_url]" value="{{link_url}}" placeholder="http://">
  {{else}}
    {{#ifCond link_type '!=' 'none'}}
      <a href="javascript:;" class="link-select">{{link_name}}</a>
    {{/ifCond}}
  {{/ifCond}}
</div>