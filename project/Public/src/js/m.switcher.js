define(function(require, exports, module){
  module.exports = function($){
    if ($.fn.switcher) return;

    $.fn.switcher = function (options) {
      var settings = {
        startIndex: 0,
        activeCls: "cur",
        tabCls: ".tab",
        itemCls: ".tab-item",
        delay: 0,
        duration: 5000,
        autoPlay: false,
        trigger: "click",
        effect: false,
        reActive: false
      };

      var opts = $.extend({}, settings, options);
      opts.trigger = (opts.trigger == 'hover') ? 'mouseenter' : opts.trigger;

      this.each(function () {
        var $this = $(this),
          tabs = $this.find(opts.tabCls),
          items = $this.find(opts.itemCls),
          current = -1,
          timer, autoRunning;

        items.hide();
        show(opts.startIndex);
        if (opts.autoPlay) {
          startPlay();
          $this.hover(function () {
            if (autoRunning) clearTimeout(autoRunning);
          }, function () {
            startPlay();
          });
        }

        tabs.each(function (index, el) {
          if (opts.delay > 0) {
            $(el).hover(function () {
              timer = setTimeout(function () {
                show(index);
              }, opts.delay);
            }, function () {
              if (timer) clearTimeout(timer);
            });
          } else {
            $(el).bind(opts.trigger, function (e) {
              if (e.type == 'click') e.preventDefault();
              show(index);
            });
          }
        });

        function show(index) {
          if (!opts.reActive && index === current) return false;

          tabs.eq(current).removeClass(opts.activeCls);
          items.eq(current).hide();
          if (opts.effect) {
            if (opts.effect == 'slide') items.eq(index).fadeIn({
              queue: false,
              duration: 300
            });
            else items.eq(index).fadeIn({
              queue: false,
              duration: 300
            });
          } else {
            items.eq(index).show();
          }
          tabs.eq(index).addClass(opts.activeCls);
          current = index;
          if (opts.onShow) opts.onShow.apply(this, [current, tabs, items]);
        }

        function showNext() {
          var next = (current >= tabs.length - 1) ? 0 : current + 1;
          show(next);
        }

        function startPlay() {
          autoRunning = setInterval(function () {
            showNext();
          }, opts.duration);
        }
      });

      return this;
    };
  };

});