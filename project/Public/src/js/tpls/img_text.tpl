<script type="J_tpl/html" id="J_tplImgText">
  <form id="{{key}}-form">
  <input type="hidden" name="id" value="{{id}}"/>
  <input type="hidden" name="msg_info_type" value="2"/>
  <input type="hidden" name="msg_type" value="{{msg_type}}"/>
  <div class="imgtxt-wrap clearfix">
  
    <div class="imgtxt-preview">
      <h2>图文消息预览</h2>

      <div class="preview-con">
        <div class="preview-bd">

          <div id="{{key}}-preview-{{msg_data.0.itemId}}" class="preview-cover current">
            <div class="preview-cover-con">
              {{#if msg_data.0.picurl}}
                <img src="{{msg_data.0.picurl}}" width="252" height="142" />  
                <h3>{{msg_data.0.title}}</h3>
              {{else}}
                <img src="/src/img/w-cover.jpg" width="252" height="142" />
                <h3>标题</h3>
              {{/if}}
            </div>

            <div class="cover-action">
              <a id="{{key}}-mainedit-{{msg_data.0.itemId}}" class="action-edit" href="javascript:;">编辑</a>
            </div>
          </div>
          
          <ul class="preview-list">
            {{#each msg_data}}
              {{#ifCond @index '>' 0}}
                <li id="{{../key}}-preview-{{this.itemId}}">
                  <div class="preview-list-item clearfix">
                    <img src="{{this.picurl}}" width="49" height="49" />
                    <h3>{{this.title}}</h3>
                  </div>
                  <div class="list-action clearfix">
                    <a class="action-sort" href="javascript:;">拖动排序</a>
                    <a class="action-edit" href="javascript:;">编辑</a>
                    <a class="action-del" href="javascript:;">删除</a>
                  </div>
                </li>
              {{/ifCond}}
            {{/each}}
          </ul>

          <li class="preview-clone">
            <div class="preview-list-item clearfix">
              <img  src="/src/img/w-thumb.png" />
              <h3>标题</h3>
            </div>
            <div class="list-action clearfix">
              <a class="action-sort" href="javascript:;">拖动排序</a>
              <a class="action-edit" href="javascript:;">编辑</a>
              <a class="action-del" href="javascript:;">删除</a>
            </div>
          </li>

          <div class="add-btn clearfix">
            <span class="imgtxt-icon-add"></span>
            <span>添加一条图文</span>
          </div>

          <div class="maxlength-error">
            <i class="iconfont">&#xe623;</i>
            <span>最多添加{{maxlength}}条图文</span>
          </div>
        </div>

      </div>
    </div>

    <div class="imgtxt-edit">
      {{#each msg_data}}
        {{> editContent}}
      {{/each}}
    </div>
 
  </div>
  <div class="imgtxt-save">
    <button type="button" id="{{key}}-saveBtn" class="btn btn-large btn-primary">保存</button>
  </div>
 </form>
</script>



<script type="J_tpl/html" id="J_tplImgTextEdit">
  {{#ifCond @index '==' 0}}
  <ul class="show" id="{{key}}-edit-{{itemId}}">
  {{else}}
  <ul id="{{key}}-edit-{{itemId}}">
  {{/ifCond}}
    <li class="edit-group">
      <div class="edit-label">
        标题
        <em>*</em>
      </div>
      <div class="edit-controls">
        <div><input type="text" name="title-{{itemId}}" value="{{title}}" class="required" /></div>
      </div>
    </li>

    <li class="edit-group">
      <div class="edit-label">
        封面
        <em>*</em>
      </div>
      <div class="edit-controls">
        <div class="upload-area">
          <div class="upload-area-con">

            {{#if picurl}}
            <div id="{{key}}-uploadThumb-{{itemId}}" class="wgt-upload-thumb">
            {{else}}
            <div id="{{key}}-uploadThumb-{{itemId}}" class="wgt-upload-thumb" style="display:none">
            {{/if}}
              <img src="{{picurl}}" width="180" height="100" />
            </div>

            <input id="{{key}}-upload-{{itemId}}" class="wgt-upload" type="file">
            <input id="{{key}}-urlhidden-{{itemId}}" type="hidden"  class="upload-input required" name="uploadurl-{{itemId}}"  value="{{picurl}}"/>
          </div>
        </div>

      </div>
    </li>

    <li class="edit-group">

      <div class="edit-label">
        点击封面链接至
      </div>

      <div class="edit-controls">
        {{#ifCond radio '==' '2'}}       
          <label>
            <input type="radio" name="link-{{itemId}}" value="1" /> 链接
          </label>
          <label class="last-label">
            <input type="radio" name="link-{{itemId}}" value="2" checked="checked" /> 活动或商品
          </label>
        {{else}}
          <label>
            <input type="radio" name="link-{{itemId}}" value="1" checked="true"  /> 链接
          </label>
          <label class="last-label">
            <input type="radio" name="link-{{itemId}}" value="2" /> 活动或商品
          </label>
        {{/ifCond}}
      </div>

      {{#ifCond radio '==' '2'}}
        <div class="edit-controls check-option">        
          <div><input name="url-{{itemId}}" type="text" class="url" placeholder="http://" value="" /></div>
        </div>
        
        <div class="edit-controls check-option show">
          <button name="eventname-{{itemId}}" class="btn btn-large J_selEvent" type="button">{{text}}</button>
          <input name="eventurl-{{itemId}}" type="hidden" value="{{url}}"/>
        </div>
      {{else}}
        <div class="edit-controls check-option show">        
          <div><input name="url-{{itemId}}" type="text" class="url" placeholder="http://" value="{{url}}" /></div>
        </div>
        
        <div class="edit-controls check-option">
          <button name="eventname-{{itemId}}" class="btn btn-large J_selEvent" type="button">选择活动或商品</button>
          <input name="eventurl-{{itemId}}" type="hidden"/>
        </div>
      {{/ifCond}}

    </li>
  </ul>
</script>
