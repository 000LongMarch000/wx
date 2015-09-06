define(function(require, exports, module){
  var CtlBaseView = Backbone.View.extend({
    template: function(){},

    initialize: function(options){
      this.ctl_id = 'ctl' + _.uniqueId();
      this.render(options.data);

      return this;
    },

    render: function(data){
      data.ctl_id = data.ctl_id || this.ctl_id;
      this.$el.html(this.template(data));
      this.bindEvents();

      return this;
    },

    bindEvents: function(){
      return this;
    },

    showErrors: function(errors){
      var $el = this.$el;

      _.each(errors, function(msg, name){
        var $input = $el.find("[name='" + name + "']"),
            $error = $input.parent().find('label.error');

        if ($error.length) {
          $error.show().html(msg);
        } else {
          $error = $('<label class="error">'+msg+'</label>');
          $error.insertAfter($input);
        }
      });
    },

    hideErrors: function(names){
      if (!_.isArray(names)) names = [names];
      var $el = this.$el;
      _.each(names, function(name){
        var $input = $el.find("[name='" + name + "']");
        $input.removeClass('error').parent().find('label.error').empty().hide();
      });
    },

    bindUpdate: function(otherView){
      this.on('update', function(data){
        var model = otherView.model,
            d = model.get('data');
        model.set('data', _.extend({}, d, data));
      });
    }
  });

  exports.View = CtlBaseView;
});