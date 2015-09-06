define(function(require, exports, module){
  var tpl = require('../tpls/ctl_margin.tpl'),
      DIRECTIONS = ['top', 'right', 'bottom', 'left'];

  var Margin = Backbone.Model.extend({
    defaults: {
      top: 4,
      right: 0,
      bottom: 4,
      left: 0
    },

    toJSON: function(){
      var margin = {},
          is_default = true,
          self = this;

      _.each(DIRECTIONS, function(name){
        var val = self.get(name);
        margin[name] = val;
        if (val != self.defaults[name]) is_default = false;
      });
      margin.is_default = is_default;

      return margin;
    },

    toStyle: function(){
      var self = this;

      return _.map(DIRECTIONS, function(name){
        return self.get(name) + 'px';
      }).join(' ');
    },

    isDefault: function(){
      var is_default = true,
          defaults = this.defaults,
          self = this;

      is_default = !_.some(DIRECTIONS, function(name){
        return self.get(name) != defaults[name];
      });

      return is_default;
    }
  });

  var CtlMargin = Backbone.View.extend({
    template: Handlebars.compile(tpl),

    events: {
      'change .input-num': 'updateMargin',
      'change input[name=default]': 'changeReset'
    },

    initialize: function(opts){
      opts = opts || {};
      var params = {};

      if (opts.defaults) {
        _.extend(params, opts.defaults);
      }
      if (opts.margin) {
        var margin = CtlMargin.formatMargin(opts.margin);
        if (margin) _.extend(params, margin);
      }

      this.options = {
        horizontal_enabled: !!opts.horizontal_enabled
      };
      this.model = new Margin(params);
      if (opts.defaults) {
        this.model.defaults = opts.defaults;
      }
      this.render();

      return this;
    },

    render: function(){
      var data = this.model.toJSON();
      if (this.options.horizontal_enabled) data.horizontal_enabled = true;
      this.$el.html(this.template(data));
      this.$reset = this.$el.find('input[name=default]');

      return this;
    },

    updateMargin: function(e){
      var $input = $(e.currentTarget),
          val = $input.val(),
          name = $input.attr('name'),
          parsedVal = parseInt(val, 10) || 0,
          max = 100;

      if (parsedVal != val || parsedVal > max || parsedVal < 0) {
        if (parsedVal > max) parsedVal = max;
        else if (parsedVal < 0) parsedVal = 0;

        $input.val(parsedVal);
      }

      this.model.set(name, parsedVal);
      var is_default = this.model.isDefault();
      this.$reset.prop('checked', is_default);
      this.trigger('update', this.model.toStyle(), is_default);
    },

    changeReset: function(e){
      if (e.currentTarget.checked) {
        var defaults = this.model.defaults;
        this.model.set(defaults);

        this.$el.find('.input-num').each(function(){
          var name = this.name,
              val = defaults[name];

          this.value = val;
        });
        this.trigger('update', this.model.toStyle(), this.model.isDefault());
      }
    }
  });

  _.extend(CtlMargin, {
    formatMargin: function(margin){
      var ret = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          };
      if (typeof margin == 'string') {
        var dirs = _.keys(ret);
        margin = margin.split(' ').slice(0, 4);

        _.each(margin, function(v, i){
          var name = dirs[i];
          if (name) ret[name] = parseInt(v, 10) || 0;
        });
      } else {
        _.each(margin, function(v, k){
          if (k in ret) {
            ret[k] = parseInt(v, 10) || 0;
          }
        });
      }

      return ret;
    }
  });

  module.exports = CtlMargin;
});