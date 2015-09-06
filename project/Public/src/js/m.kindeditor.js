 define(function(require, exports, module){
  module.exports = {
    create: function(el, opts){
      opts = $.extend({
        uploadJson: '/editor_upload.php',
        resizeType: 1,
        //allowFileManager: 'true',
        themeType : 'simple',
        items: ['source', '|', 'undo', 'redo', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                    'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                    'insertunorderedlist', '|', 'image', 'link']
      }, opts);

      return KindEditor.create(el, opts);
    }
  };
});