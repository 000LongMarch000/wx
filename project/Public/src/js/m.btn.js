define(function(require, exports, module){
  var defaultOpts = {
    loadingText: '正在提交...',
    loadingImg: false
  };

  var btn = function(method, prop){
    return this.each(function(){
      var $this = $(this);
      if (prop === undefined) {
        if (method == 'loading') {
          var origText;
          if ($this.is('input')) {
            origText = $this.val();
            $this.val(defaultOpts.loadingText);
          } else {
            origText = $this.html();
            $this.text(defaultOpts.loadingText);
          }
          $this.prop('disabled', true).addClass('disabled').data('text.orig', origText);
        } else if (method == 'reset') {
          $this.prop('disabled', false).removeClass('disabled');
          if ($this.is('input')) $this.val($this.data('text.orig'));
          else $this.html($this.data('text.orig'));
        }
      } else {
        if (method == 'defaultOpts') {
          $.extend(defaultOpts, prop);
        }
      }
    });
  };

  module.exports = function($){
    if ($.fn.btn) return false;

    $.fn.btn = btn;
  };
});