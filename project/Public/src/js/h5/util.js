define(function(require, exports, module){
  
  module.exports = {
    inherits: function(base, parent){
      var fn = function(){};
      fn.prototype = parent.prototype;

      base.prototype = new fn();
      base.prototype.constructor = base;
      base.prototype.parent = parent.prototype;
      
      return base;
    },

    empty: function(){
    }


  };

});