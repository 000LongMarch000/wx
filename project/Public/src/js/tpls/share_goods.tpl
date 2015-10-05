<div class="wgt-share">
  <div class="share-code">
    <img src="{{qr_img}}" width="125" height="125" class="loading" onload="$(this).removeClass('loading')">
    <a href="/admin/download/qrcode?url={{encode_qr_img}}">下载二维码</a>
  </div>
  <input type="text" class="input-text" readonly value="{{link}}">
  <a href="{{link}}" class="btn-open" target="_blank">打开</a>
  <a href="javascript:;" class="btn-copy">复制</a>
  <ul class="share-btns">
    <li><a href="javascript:;" data-share="qq"><i class="share-ico ico-share-qq"></i> QQ空间</a></li>
    <li><a href="javascript:;" data-share="weibo"><i class="share-ico ico-share-weibo"></i> 微博</a></li>
    <li><a href="javascript:;" data-share="renren"><i class="share-ico ico-share-renren"></i> 人人网</a></li>
    <li><a href="javascript:;" data-share="qq-weibo"><i class="share-ico ico-share-qq-weibo"></i> 腾讯微博</a></li>
    <li><a href="javascript:;" data-share="douban"><i class="share-ico ico-share-douban"></i> 豆瓣</a></li>
  </ul>
</div>