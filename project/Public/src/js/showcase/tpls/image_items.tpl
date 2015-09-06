<ul class="imgs-list">
  {{#each items}}
    <li class="item" data-cid="{{cid}}">
      <i class="ico ico-move-handler"></i>
      <div class="img">
        <img src="{{img}}?imageView2/2/w/100/h/100">
        <div class="btns">
          <a href="javascript:;" class="btn-edit-img">更改</a>
        </div>
      </div>
      <div class="img-url"></div>
      <a href="javascript:;" class="btn-del"><i class="iconfont">&#xe624;</i>删除</a>
    </li>
  {{/each}}
</ul>

<a href="javascript:;" class="btn-select"><strong>+</strong>选择图片</a>
<p class="help-block t-c">*最多添加6张图片，建议图片宽度 640px</p>