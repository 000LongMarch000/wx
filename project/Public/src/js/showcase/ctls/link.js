define(function(require, exports, module){
  var CtlBase = require('./base'),
      tpl = require('../tpls/ctl_link.tpl'),
      utils = require('../utils'),
      Selector = require('../../selector/index');

  var Model = Backbone.Model.extend({
    defaults: {
      link_type: 'none',
      link_id: '',
      link_name: '请选择...',
      link_url: ''
    },

    resetToDefauts: function(){
      var defaults = _.extend({}, this.defaults);
      delete defaults.link_type;

      this.set(defaults, { silent: true });
    }
  });

  var CtlLink = CtlBase.View.extend({
    template: Handlebars.compile(tpl),

    events: {
      'change .link-type': 'updateType',
      'click .link-select': 'openSelector',
      'change .link-url': 'updateUrl'
    },

    initialize: function(opts){
      opts = opts || {};
      opts.data = opts.data || {};

      var self = this,
          data = opts.data,
          params = _.pick(data, 'link_type', 'link_id', 'link_name', 'link_url');
      this.model = new Model(params);
      CtlBase.View.prototype.initialize.apply(this, arguments);

      this.listenTo(this.model, 'change', function(model, options){
        var type = model.get('link_type'),
            typeChanged = model.hasChanged('link_type'),
            defaults = model.defaults;

        if (typeChanged) {
          model.resetToDefauts();
          this.render(model.attributes);
        }

        if ((typeChanged && type != 'url') || (options && options.needsRender))
          this.render(model.attributes);

        this.trigger('update', model.attributes);
      });
    },

    getName: function(){
      if (!this._urlName) this._urlName = 'link[' + this.ctl_id + '][link_url]';

      return this._urlName;
    },

    render: function(){
      CtlBase.View.prototype.render.apply(this, arguments);

      var linkType = this.model.get('link_type'),
          $input = this.$el.find('.link-input');

      if (linkType == 'home' || linkType == 'coupons_list') {
        this.$el.find('.link-select').hide();
      }
    },

    openSelector: function(e){
      var model = this.model,
          linkType = model.get('link_type'),
          selectorType;

      switch (linkType) {
        case 'none':
          selectorType = 'none';
          break;
        case 'tags_group':
          selectorType = 'tags_group';
          break;
        default:
          selectorType = linkType + 's';
      }

      new Selector({
        type: selectorType,
        data: model.get('link_id'),
        callback: function(data){
          data = data || { id: '' };

          var obj = {
            link_id: data.id
          };
          obj.link_name = data.title || model.defaults.link_name;

          model.set(obj, {
            needsRender: true
          });
        }
      }).popup();
    },

    updateType: function(e){
      var type = $(e.currentTarget).val(),
          model = this.model,
          foundSelector;
      this.model.set('link_type', type);

      foundSelector = _.indexOf(['page', 'product', 'event', 'coupon', 'popular', 'tags_group'], type) >= 0;
      if (foundSelector) {
        this.openSelector();
      }
    },

    updateUrl: function(e){
      var value = $(e.currentTarget).val(),
          model = this.model,
          error;

      if (error = Backbone.Validation.validators.pattern(value, 'link_url', 'url')) {
        var errors = {};
        errors[this.getName()] = error;
        this.showErrors(errors);
      } else {
        this.hideErrors(this.getName());
        this.model.set('link_url', value);
      }
    }
  });

  module.exports = CtlLink;
});