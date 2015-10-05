define(function(require, exports, module){
  module.exports = function($){
    if (!window.accounting || $.fn.number) return;

    $.fn.number = function(){
      var args = Array.prototype.slice.call(arguments);

      return this.each(function(){
        var $this = $(this),
            val;

        if (this.tagName.toLowerCase() != 'input') {
          val = $this.text();
          if (val !== '') {
            args.unshift(val);
            $this.text(accounting.formatNumber.apply(accounting, args));
          }
        } else {
          val = $this.val();
          var format = function(){
            var v = $this.val();
            if (v !== '') {
              var params = [$this.val()].concat(args),
                  result = accounting.formatNumber.apply(accounting, params);
              $this.val(result);
              return result;
            }

            return v;
          };
          format();
          $this.on('change', format);
        }

        return this;
      });
    };
  };
});