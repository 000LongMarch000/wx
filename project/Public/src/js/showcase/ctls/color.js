define(function(require, exports, module){
  var CtlBase = require('./base'),
      tpl = require('../tpls/ctl_color.tpl'),
      utils = require('../utils'),
      isColorTypeSupport = (function() {
        var colorInput = $("<input type='color' value='!' />")[0];
        return colorInput.type === "color" && colorInput.value !== "!";
      })();

  var CtlColor = CtlBase.View.extend({
    template: Handlebars.compile(tpl),

    render: function(data){
      CtlBase.View.prototype.render.apply(this, arguments);
      var self = this,
          $color = this.$el.find('.input-color');
      if (isColorTypeSupport) {
        $color.on('change', utils.latern(function(){
          self.trigger('update', $color.val());
        }));
      } else {
        $color.spectrum({
          color: data.color || '',
          showButtons: false,
          change: function(color){
            self.trigger('update', color.toHexString());
          }
        });
      }
    },

    remove: function(){
      this.$el.find('.input-color').spectrum('destroy');
      CtlBase.View.prototype.remove.call(this);
    }
  });

  module.exports = CtlColor;
});