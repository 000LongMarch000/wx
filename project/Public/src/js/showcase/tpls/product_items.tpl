<ul class="pdts-list">
  {{#each items}}
    <li class="item" data-id="{{id}}">
      <i class="ico ico-move-handler"></i>
      <div class="pdt-img"><img src="{{img}}?imageView2/2/w/45/h/45"></div>
      <div class="pdt-name">{{name}}</div>
      <div class="pdt-price">￥{{price}}</div>
      <a href="javascript:;" class="btn-del"><i class="iconfont">&#xe624;</i>删除</a>
    </li>
  {{/each}}
</ul>

<a href="javascript:;" class="btn-select"><strong>+</strong>选择商品</a>
<p class="help-block t-c">*最多添加12个商品</p>