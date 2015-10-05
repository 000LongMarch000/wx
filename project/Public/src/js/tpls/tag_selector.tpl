<div class="wgt-tag-selector">
  <div class="handler-cont">
    <a href="javascript:;" class="handler">从商品标签中选择</a>
  </div>
  <div class="selected-tags">
    <i class="iconfont">&#xe63d;</i>
    <ul class="tags-list">
      {{#each tags}}
        {{#if selected}}
          <li class="item" data-id="{{id}}" title="{{name}}">{{name}}<a href="javascript:;" class="del">x</a></li>
        {{/if}}
      {{/each}}
    </ul>
  </div>
  <div class="tag-selector">
    <div class="sel-tit"><i class="iconfont">&#xe63d;</i>选择标签</div>
    <div class="sel-cont">
      <ul class="tags-list">
        {{#each tags}}
          <li class="item"><label><input type="checkbox" name="wgt_tag[{{../cid}}][{{id}}]" data-id="{{id}}" {{#if selected}}checked{{/if}}> {{name}}</label></li>
        {{else}}
          <li><p class="note">暂无标签</p></li>
        {{/each}}
      </ul>
    </div>
  </div>
</div>