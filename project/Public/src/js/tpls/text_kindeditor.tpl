<form class="text-kindeditor">
	<input type="hidden" name="msg_info_type" value="1"/>
  	<input type="hidden" name="msg_type" value="{{msg_type}}">
  	<input type="hidden" name="id" value="{{id}}">
	<ul>
	    <li>
	        <textarea class="required" name="content" style="width:{{width}}; height:{{height}}">{{content}}</textarea>
	    </li>
	    <li>
	      <div class="">
	      	<span class="word-count">还可以输入<em class="word-limit">{{maxLength}}</em>字</span>
	      	<span class="word-count2" style="display:none">已超出<em class="word-limit2">0</em>字，请调整到{{maxLength}}字以内。</span>
	      </div>
	    </li>
	    <li>
	      	<button class="btn btn-large btn-primary J_saveBtn" type="button">保存</button>
	    </li>
  </ul>
</form>