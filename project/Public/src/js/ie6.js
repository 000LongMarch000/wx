$(function(){
  var tpl = '<div id="J_FIE" class="f_ie"><div class="hd"><a href="#" onclick="$(\'#J_FIE\').hide();return false;" class="close">x</a></div><div class="bd"><p class="info"><strong>您正在使用的浏览器 IE6/7 </strong>，可能会影响部分功能正常使用，<br>为了更好的浏览体验，请升级您的浏览器：</p><ul class="ie-replace"><li class="cr"><a href="http://www.google.com/chrome/" target="_blank">chrome</a></li><li class="ff"><a href="http://www.mozilla.com/firefox/" target="_blank">firefox</a></li><li class="ie-edge"><a href="http://windows.microsoft.com/zh-CN/internet-explorer/products/ie/home" target="_blank">ie-edge</a></li></ul></div></div>';
  $(tpl).appendTo(document.body);
});
