define(function(require, exports, module){
  module.exports = function($){
    if ($.fn.togglers) return;

    $.fn.toggler = function(){
      return this.each(function(opts){
        var $this = $(this),
            cachedOpts = $this.data('togglerOpts'),
            $toggler = $($this.data('toggle')),
            isVisible = $toggler.is(':visible');

        if (cachedOpts) {
          $.extend(cachedOpts, opts || {});
          $this.data('togglerOpts', opts);
          return this;
        }

        opts = $.extend({
          onChange: function(status){},
          cls: 'on',
          onText: $this.data('on-text') ? $this.data('on-text') : $this.text(),
          offText: $this.data('off-text') ? $this.data('off-text') : $this.text()
        }, opts || {});

        $this.data('togglerOpts', opts);
        $this.on('click', function(e){
          var opts = $this.data('togglerOpts');

          if ($toggler.is(':visible')) {
            $this.removeClass(opts.cls);
            $toggler.hide();
            if (opts.onChange) opts.onChange.call(this, false);
            if (opts.onText != opts.offText) $this.text(opts.offText);
          } else {
            $this.addClass(opts.cls);
            $toggler.show();
            if (opts.onChange) opts.onChange.call(this, true);
            if (opts.onText != opts.offText) $this.text(opts.onText);
          }
        });
      });
    };
  };
});