define(function(require, exports, module) {
  var uploadify_onSelectError = function(file, errorCode, errorMsg) {        
    var msgText = "上传失败\n";        
    switch (errorCode) {            
      case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
           //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
          if (this.settings.queueSizeLimit > errorMsg) {
            if (errorMsg <= 0) msgText += "已到上传数量上限";
            else msgText += "最多还能上传 " + errorMsg + "个文件";
          } else {
            msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
          }
        break;            
      case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
          msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
        break;            
      case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
          msgText += "文件大小为0";
        break;            
      case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
          msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
        break;            
      default:
          msgText += "错误代码：" + errorCode + "\n" + errorMsg;        
    }        
    $.notify(msgText);    
  }; 
  var uploadify_onUploadError = function(file, errorCode, errorMsg, errorString) {         // 手工取消不弹出提示
    if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED) {            
      return;        
    }        
    var msgText = "上传失败\n";        
    switch (errorCode) {            
      case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
          msgText += "HTTP 错误\n" + errorMsg;
        break;            
      case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
          msgText += "上传文件丢失，请重新上传";
        break;            
      case SWFUpload.UPLOAD_ERROR.IO_ERROR:
          msgText += "IO错误";
        break;            
      case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
          msgText += "安全性错误\n" + errorMsg;
        break;            
      case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
          //msgText += "每次最多上传 " + this.settings.uploadLimit + "个";
        break;            
      case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
          msgText += errorMsg;
        break;            
      case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
          msgText += "找不到指定文件，请重新操作";
        break;            
      case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
          msgText += "参数错误";
        break;            
      default:
          msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n" + errorMsg + "\n" + errorString;        
    }

    if (!this.settings.multi) this.wrapper.uploadify('disable', false);        
    $.notify(msgText);    
  };

  module.exports = function($){
    var _uploadify = $.fn.uploadify;

    try {
      var flashVer = swfobject.getFlashPlayerVersion();
      if (!flashVer.major) $.notify('您还未安装flash，请先安装flash，才能使用上传功能', { autoHide: false });
      if (flashVer.major && flashVer.major <= 10) $.notify('您的flash版本不是新版，将影响上传功能使用，请先升级', { autoHide: false });
    } catch(e) {};

    $.fn.uploadify = function(opts){
      if (typeof opts === 'object' || !opts) {
        opts = $.extend({
          wmode: 'transparent',
          multi: false,
          fileSizeLimit: '1MB',
          uploader: '/basicupload.php',
          swf: '/src/img/uploadify/uploadify.swf',
          buttonClass: 'btn-upload',
          buttonText: '上传文件',
          fileTypeDesc: '支持格式:jpg/gif/jpeg/png/bmp',
          fileTypeExts: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.gif;*.GIF;*.png;*.PNG;*.bmp;*.BMP',
          overrideEvents: ['onDialogClose', 'onUploadError', 'onSelectError'],
          onUploadError: uploadify_onUploadError,
          onSelectError: uploadify_onSelectError,
          onUploadStart: function(){
            if (!this.settings.multi) this.wrapper.uploadify('disable', true);
          },
          onUploadComplete: function(){
            if (!this.settings.multi) this.wrapper.uploadify('disable', false);
          },
          // onUploadProgress: function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal){
          //   var percentage       = Math.round(totalBytesUploaded / totalBytesTotal * 100);
          //   $('#' + file.id).find('.progress').text(percentage + '%');
          // },
          itemTemplate: '<div id="${fileID}" class="uploadify-queue-item"><i class="ico ico-loading"></i>正在上传...<span class="progress"><span></div>'
        }, opts || {});
        return _uploadify.call(this, opts);
      } else {
        return _uploadify.apply(this, arguments);
      }
    };

    $.fn.uploadImg = function(opts){
      return this.each(function(){
        var $this = $(this),
            that = this,
            $thumb = $this.siblings('.wgt-upload-thumb'),
            $input = $this.siblings('.upload-input'),
            name = $this.attr('name');

        $this.uploadify({
          uploader: '/basicupload.php',
          multi: false,
          fileSizeLimit: '2MB',
          formData: {
          },
          onUploadSuccess: function(file, data, res){
            data = $.parseJSON(data);
            if (data && data.status == 'success') {
              var item = data.data,
                  width = opts.width || 100,
                  height = opts.height || 100;

              $thumb.html('<img src="'+item.url+'" width="'+width+'" height="'+height+'">');
              $input.val(item.url);
              if(opts.onSuccess) opts.onSuccess.call(that, file, data, res)
            } else {
              $.notify(data.msg || '操作失败，请稍后再试');
            }
          }
        });
      });
    };

    $.fn.uploadifyForm = function(opts){
      var $form = this.first();
      if (!opts.shop_id) return false;

      $form.find('.wgt-upload').uploadImg(opts);
    };
  };
});
