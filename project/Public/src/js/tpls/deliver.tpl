<form action="/admin/order/delivery" method="post">
  {{#unless redeliver}}
  <div class="form-group">
    <label class="ctl-label">是否需要物流：</label>
    <div class="ctl">
      <label><input type="radio" name="deliver" class="wgt-icheck" value="1" checked>需要物流</label>
      <label><input type="radio" name="deliver" class="wgt-icheck" value="0">无需物流</label>
    </div>
  </div>
  {{/unless}}
  <div class="form-group">
    <label class="ctl-label">物流公司：</label>
    <div>
      <select name="company" class="input-large">
        <option></option>
        {{#each companies}}
        <option value="{{name}}" data-alias="{{alias}}" data-code="{{code}}">{{name}}</option>
        {{/each}}
      </select>
      <input type="hidden" name="code">
    </div>
  </div>
  <div class="form-group" style="display:none;">
    <label class="ctl-label">其他物流公司：</label>
    <input type="text" class="input-text required" name="other_company">
  </div>
  <div class="form-group">
    <label class="ctl-label">物流单号：</label>
    <input type="text" class="input-text required" name="number">
  </div>
  <div class="form-actions">
    <input type="hidden" name="trade_id" value="{{id}}">
    <button type="submit" class="btn btn-large btn-primary">确认发货</button>
  </div>
</form>
