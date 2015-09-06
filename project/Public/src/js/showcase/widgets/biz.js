define(function(require, exports, module){
  var Base = require('./base');

  exports.Model = Base.Model.extend({
    defaults: _.extend({}, Base.Model.prototype.defaults, {
      container: 'biz'
    })
  });

  exports.View = Base.View;

  exports.EditorView = Base.EditorView.extend({
    initialize: function(){
      this.mcid = this.model.cid;
      this.render();
      this.bindEvents();
    },

    bindEvents: function(){},

    render: function(){
      var model = this.model;
      this.$el.html(this.template(model.attributes));

      //arrow
      this.$el.append('<i class="arr-l"><i class="arr-inner"></i></i>');

      //bind Validation
      Backbone.Validation.bind(this, {
        selector: '.bind-data',

        valid: function(view, attr, selector) {
          view.hideErrors(attr);
        },

        invalid: function(view, attr, error, selector) {
          var errors = {};
          errors[attr] = error;
          view.showErrors(errors);
        }
      });
    }
  });
});