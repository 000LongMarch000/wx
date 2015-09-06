define(function(require, exports, module){
  var utils = {
    latern: function(fn, bind, delay){
      delay = delay || 400;
      var timer;
      return function(){
        if (timer) clearTimeout(timer);
        var args = arguments;
        timer = setTimeout(function(){
          fn.apply(bind, args);
        }, delay);
      };
    }
  };

  module.exports = utils;
});