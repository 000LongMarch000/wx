<div class="ctl-margin-tuner">
  <div class="margin-tuner-cont">
    <div class="margin-tuner-inner"></div>
    <div class="margin-adjust margin-top">
      <input type="text" name="top" class="input-text input-num" value="{{top}}"> px
      <i class="sc-ico ico-st-arr-t"></i>
    </div>
    <div class="margin-adjust margin-right">
      {{#if horizontal_enabled}}
        <input type="text" name="right" class="input-text input-num" value="{{right}}"> px
        <i class="sc-ico ico-st-arr-r"></i>
      {{else}}
        <span class="num">{{right}} px</span>
        <i class="sc-ico ico-st-arr-r-g"></i>
      {{/if}}
    </div>
    <div class="margin-adjust margin-bottom">
      <input type="text" name="bottom" class="input-text input-num" value="{{bottom}}"> px
      <i class="sc-ico ico-st-arr-b"></i>
    </div>
    <div class="margin-adjust margin-left">
      {{#if horizontal_enabled}}
        <input type="text" name="left" class="input-text input-num" value="{{left}}"> px
        <i class="sc-ico ico-st-arr-l"></i>
      {{else}}
        <span class="num">{{left}} px</span>
        <i class="sc-ico ico-st-arr-l-g"></i>
      {{/if}}
    </div>
  </div>
  <div class="tuner-reset">
    <label><input name="default" type="checkbox" {{#if is_default}}checked{{/if}}> 默认边距</label>
  </div>
</div>