define(function(require, exports, module){
  $('<div id="J_passportBG" class="passport-bg"></div>').appendTo(document.body);

  var timer,
      $footer = $('.footer'),
      minH = $footer.offset().top + $footer.outerHeight();

  function onReszie(){
    var h = Math.max($(window).outerHeight(), minH);
    $('#J_passportBG').css('height', h);
  }

  module.exports = {
    init: function(){
      onReszie();
      $(window).on('resize.pbg', function(){
        if (timer) clearTimeout(timer);
        timer = setTimeout(onReszie, 200);
      });
    }
  };

});