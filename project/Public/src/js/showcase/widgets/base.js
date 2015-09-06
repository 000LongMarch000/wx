define(function(require, exports, module){
  require('../../m.switcher')($);

  var edit_helper_tpl = require('../tpls/edit_helper.tpl'),
      CtlMargin = require('../ctls/margin');

  Handlebars.registerPartial('edit_helper', edit_helper_tpl);

  var Model = Backbone.NestedModel.extend({
    defaults: {
      container: 'main',
      editable: true,
      data: {},
      style: {}
    },

    initialize: function(attributes){
      Backbone.NestedModel.prototype.initialize.apply(this, arguments);
      var attrs = attributes || {};
      attrs = $.extend(true, {}, _.result(this, 'defaults'), attrs);
      this.set(attrs, { silent: true });

      return this;
    },

    demoData: function(){
      return this.toJSON();
    },

    getType: function(){
      return this.get('wgt_def_id');
    },

    getData: function(){
      var json = this.toJSON();
      return json.data || {};
    },

    setStyle: function(name, val){
      return this.set('style.' + name, val);
    }
  });

  Model.extendWithDefaults = extendWithDefaults;

  var Collection = Backbone.Collection.extend({
    moveModel: function(cid, to){
      var model = this.get(cid),
          models = this.models,
          index = this.indexOf(model);
      if (typeof to == 'string') {
        to = parseInt(to, 10);
        if (isNaN(to)) to = index;
        else to = index + to;
      }
      if (index != to) {
        to = Math.max(0, Math.min(to, models.length - 1));
      }
      models.splice(to, 0, models.splice(index, 1)[0]);

      return model;
    }
  });

  var View = Backbone.View.extend({
    className: 'comp-field',

    id: function(){ return 'wgt_' + this.model.cid; },

    initialize: function(){
      var self = this,
          timer;

      this.listenTo(this.model, 'change:data change:style', render);
      this.render();

      function render(model, value, options){
        options = options || {};
        if (options.needsRender !== undefined && !options.needsRender) return;

        if (timer) clearTimeout(timer);
        if (options.immediate) {
          self.render();
        } else {
          timer = setTimeout(_.bind(self.render, self), 400);
        }
      }
    },

    render: function(data){
      data = data || this.model.attributes;
      if (this.template) {
        //console.info('render', this.model.getType(), this.model.cid);
        this.$el.html(this.template(data));
      };

      return this;
    }
  });

  View.extendWithTpl = extendWithTpl;

  var EditorView = Backbone.View.extend({
    events: {
      'change :input[name^="data."]': 'update'
    },

    initialize: function(){
      this.mcid = this.model.cid;
      this.render();
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(data){
      data = data || this.model.attributes;
      data = _.extend({ mcid: this.mcid }, data);

      var model = this.model,
          self = this;

      this.$el.html(this.template(data));

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

      //tabs
      if (this.$el.find('.wgt-tabs')) {
        this.$el.switcher({
          onShow: function(){
            self.show();
          }
        });
      }

      //margin tuner
      var $tunerWrap = this.$el.find('.box-tuner-wrap');
      if ($tunerWrap.length) {
        var type = model.getType(),
            params = { margin: model.get('style.margin') },
            config = $tunerWrap.data('config');

        if (config && _.isObject(config)) {
          _.extend(params, config);
        }
        var tuner = new CtlMargin(params);

        tuner.$el.appendTo($tunerWrap);
        model.listenTo(tuner, 'update', function(padding, is_default){
          if (is_default) {
            this.set('style.margin', '');
          } else {
            this.set('style.margin', padding);
          }
        });
      }
    },

    show: function(){
      this.$el.show();
      this.alignTo('#wgt_' + this.mcid);
    },

    alignTo: function(el){
      var $el = $(el);
      if (!$el.length) return;
      var $cont = $('#J_viewportCont'),
          $arr = this.$el.children('.arr-l'),
          eh = this.$el.height(),
          relH = $el.height(),
          contT = $cont.offset().top,
          sTop = $(window).scrollTop(),
          top = $el.position().top,
          bottom = $cont.height(),
          arrOffset = 50,
          arrSize = 42,
          screenLimit = [sTop - contT, Math.min(sTop - contT + $(window).height(), bottom)],
          arrLimit = [top, top + relH - arrSize],
          elLimit = [0, bottom - eh],
          arrTop, elTop;

      arrTop = limit(top, [screenLimit[0], screenLimit[1] - arrSize], arrLimit);
      elTop = limit(arrTop - arrOffset, [screenLimit[0], screenLimit[1] - eh + arrSize], elLimit, [arrTop - eh + arrSize, arrTop]);
      arrTop = limit(arrTop + arrOffset, [top, top + relH - arrSize], [elTop, elTop + eh - arrSize ]);

      this.$el.css('top', elTop);
      $arr.css('top', arrTop - elTop);

      function limit() {
        var args = _.toArray(arguments),
            val = args.shift(),
            min, max;

        for (var i = 0; i < args.length; i++) {
          min = args[i][0];
          max = args[i][1];
          val = Math.max(min, Math.min(val, max));
        }

        return val;
      }
    },

    update: function(e){
      var $el = $(e.currentTarget),
          model = this.model,
          name = $el.attr('name'),
          val = $el.is(':checkbox') ? $el.is(':checked') : $el.val(),
          needsRender = true;

      //if radio convert string value to boolean
      if ($el.is(':radio') && (val === 'true' || val === 'false')) val = (val === 'true');
      if ($el.data('render') != undefined) needsRender = !!$el.data('render');

      var error = this.preVali(name, val);
      if (!error) {
        var data = {};
        data[name] = val;
        model.set(data, { needsRender: needsRender });
      }
    },

    //attr, val | attrs
    preVali: function(){
      var args = _.toArray(arguments),
          model = this.model,
          errors = model.preValidate.apply(model, args);

      if (errors) {
        if (_.isString(errors)) this.showErrors(args[0], errors);
        else this.showErrors(errors);
      } else {
        if (_.isString(args[0])) this.hideErrors(args[0]);
        else this.hideErrors(_.keys(args[0]));
      }

      return errors;
    },

    showErrors: function(name, err){
      var errors = {},
          $el = this.$el;

      if (_.isString(name) && err)  errors[name] = err;
      else errors = name;

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
        if ($input.length)$input.removeClass('error').parent().find('label.error').empty().hide();
      });
    },

    addCtl: function(ctl, el){
      if (!this.ctls) this.ctls = [];
      this.ctls.push(ctl);

      return this;
    },

    getCid: function(){
      return this.model.cid;
    },

    remove: function(){
      Backbone.Validation.unbind(this);

      //cleanup ctls
      if (this.ctls && this.ctls.length) {
        _.each(this.ctls, function(ctl){
          if (ctl.remove) ctl.remove();
        });
      }
      Backbone.View.prototype.remove.call(this);
    }
  });

  EditorView.extendWithTpl = extendWithTpl;

  module.exports = {
    Model: Model,
    Collection: Collection,
    View: View,
    EditorView: EditorView
  };

  function extendWithDefaults(params, opts){
    params = params || {};
    opts = opts || {};

    opts = _.extend({
      defaults: _.extend({}, Model.prototype.defaults, params)
    }, opts);

    return this.extend(opts);
  }

  function extendWithTpl(tplStr, opts){
    opts = opts || {};
    opts = _.extend({
      template: Handlebars.compile(tplStr)
    }, opts);

    return this.extend(opts);
  }
});