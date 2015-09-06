<div class="comp comp-share" {{style style}}>
  {{#ifCond data.show_share '&&' data.show_favor}}
    <div class="btns">
      <a href="javascript:;" class="btn btn-share" {{#if data.share_bg}}style="background: {{data.share_bg}};"{{/if}}><i class="iconfont">&#xe61b;</i>分享</a>
      <span class="spacer"></span>
      <a href="javascript:;" class="btn btn-favor" {{#if data.favor_bg}}style="background: {{data.favor_bg}};"{{/if}}><i class="iconfont">&#xe655;</i>收藏</a>
    </div>
  {{else}}
    <div class="btns btns-line">
      {{#if data.show_share}}
        <a href="javascript:;" class="btn btn-share" {{#if data.share_bg}}style="background: {{data.share_bg}};"{{/if}}><i class="iconfont">&#xe61b;</i>分享</a>
      {{/if}}
      {{#if data.show_favor}}
        <a href="javascript:;" class="btn btn-favor" {{#if data.favor_bg}}style="background: {{data.favor_bg}};"{{/if}}><i class="iconfont">&#xe655;</i>收藏</a>
      {{/if}}
    </div>
  {{/ifCond}}
</div>

{{> edit_helper}}