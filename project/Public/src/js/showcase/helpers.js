define(function(require, exports, module){
  var Register = function(Handlebars){
    var SafeString = Handlebars.SafeString;
    var helpers = {
      alignCls: function(align) {
        var ret = '';
        switch(align) {
          case 'center':
            ret = 't-c';
            break;
          case 'right':
            ret = 't-r';
            break;
          default:;
        }

        return new SafeString(ret);
      },

      style: function(style) {
        var ret = [];
        _.each(style, function(val, rule){
          if (val || val != '') ret.push(rule + ': ' + val);
        });

        ret = ret.join(';');
        if (ret.length) ret = 'style="' +ret+ '"';

        return new SafeString(ret);
      }
    };

    _.each(helpers, function(fn, key){
      Handlebars.registerHelper(key, fn);
    });

    return Handlebars;
  };

  module.exports = Register;
});