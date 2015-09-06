define(function(require, exports, module){
  var idCaches = {};

  module.exports = {
    uid: function(prefix){
      if (!prefix) prefix = 'wd';
      if (idCaches[prefix] === undefined) idCaches[prefix] = 0;
      else idCaches[prefix] ++;

      return idCaches[prefix];
    },

    inherits: function(base, parent){
      var fn = function(){};
      fn.prototype = parent.prototype;

      base.prototype = new fn();
      base.prototype.constructor = base;
      base.prototype.parent = parent.prototype;

      return base;
    },

    empty: function(){
    },

    decimal: function(num, symbol){
      symbol = symbol || '￥';
      return symbol + this.formatDecimal(num);
    },

    formatDecimal: function(num, n){
      n = n || 2;
      var power = Math.pow(10, n),
          fixed = (Math.round(num * power) / power).toString();

      if(n === 0 || fixed == 'NaN') return fixed;

      if(fixed.indexOf('.') < 0) fixed += '.';
      var padding = n + 1 - (fixed.length - fixed.indexOf('.'));
      for(var i = 0; i < padding; i++) fixed += '0';

      return fixed;
    }
  };

});