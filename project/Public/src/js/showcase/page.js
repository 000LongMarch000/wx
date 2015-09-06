define(function(require, exports, module){
  var WidgetsFactory = require('./widgets/index'),
      Widgets = require('./widgets'),
      MenuView = require('./menu_view'),
      utils = require('./utils');

  var Page = Backbone.NestedModel.extend({
    defaults: {
      title: '',
      sc_def_id: '',
      widgets: [],
      meta: {}
    }
  });

  var PageView = Backbone.View.extend({
    el: '#J_wgtPage',

    events: {
      'click #J_viewportStatsBar': 'openStatsBarEditor',
      'click .comp-field': 'openEditPanel',
      'mouseenter .comp-field': 'hoverField',
      'mouseleave .comp-field': 'hoverField',
      'click .edit-helper a': 'performAct',
      'click #J_btnSave': 'save',
      'click #J_btnPreview': 'preview'
    },

    initialize: function(opts){
      var model = this.model,
          groupedWidgets = _.groupBy(model.get('widgets'), 'container'),
          self = this;

      var mainCollection = new Widgets.Collection(groupedWidgets.main),
          bizCollection = new Widgets.Collection(groupedWidgets.biz);

      var mainCont = new Widgets.View({
            el: '#J_wgtContMain',
            collection: mainCollection
          }),
          bizCont = new Widgets.BizView({
            el: '#J_wgtContBiz',
            collection: bizCollection
          });

      this.conts = {
        biz: bizCont,
        main: mainCont
      };
      this.mainView = this.conts.main;

      this.menuView = new MenuView({
        el: '#J_wgtMenu',
        widgets: opts.widgets
      });

      this.sideMenuView = new MenuView({
        el: '#J_sideWgtMenu',
        widgets: opts.widgets,
        side: true
      });
      this.hideSideMenu();

      this.editors = [];
      this.actions = {
        up: function(cid, $field){
          var $prev = $field.prev('.comp-field'),
              collection = this.mainView.collection;

          if ($prev.length) {
            $field.removeClass('hover').insertBefore($prev);
            collection.moveModel(cid, '-1');
            this.showEditor(cid);
          }
        },

        down: function(cid, $field){
          var $next = $field.next('.comp-field'),
              collection = this.mainView.collection;

          if ($next.length) {
            $field.removeClass('hover').insertAfter($next);
            collection.moveModel(cid, '+1');
            this.showEditor(cid);
          }
        },

        del: function(cid, $field){
          this.mainView.collection.get({ cid: cid }).destroy();
          if (cid == this.curId) {
            this.curId = null;
          } else {
            this.showEditor(this.curId);
          }
        },

        add: function(cid, $field){
          var view = this.getEditor(this.curId || cid);
          if(view) view.$el.hide();
          this.showSideMenu(cid, $field);
        }
      };

      this.mainView.listenTo(this.menuView, 'addwidget', function(type){
        var Model = WidgetsFactory.getModel(type);
        if (Model) {
          var model = new Model();
          this.collection.add(model);
          $('#wgt_' + model.cid).trigger('click');
        }
      });

      this.mainView.listenTo(this.sideMenuView, 'addwidget', function(type){
        var Model = WidgetsFactory.getModel(type);
        if (Model) {
          self.hideSideMenu();
          var model = new Model();
          this.collection.add(model, { at: self.sideMenuView.atIndex });
          $('#wgt_' + model.cid).trigger('click');
        }
      });

      this.listenTo(mainCollection, 'destroy', function(model, collection){
        this.removeEditor(model.cid);
      });

      //status bar editor
      this.initStatusBar();
    },

    initStatusBar: function(){
      var Model = WidgetsFactory.getModel('statusbar'),
          View = WidgetsFactory.getView('statusbar'),
          $statusBar = $('#J_viewportStatsBar'),
          theModel = this.model,
          model = new Model({
            data: {
              title: theModel.get('title') || WD_CONFS.title,
              share_title: theModel.get('meta.share_title'),
              share_desc: theModel.get('meta.share_desc')
            }
          }),
          view = new View({
            el: $statusBar,
            model: model
          }),
          self = this;

      model.on('change:data', utils.latern(function(model, value, options){
        var meta = self.model.get('meta');
        _.extend(meta, {
          share_title: value.share_title,
          share_desc: value.share_desc
        });
        self.model.set('title', value.title);
      }));

      this.listenTo(this.model, 'change:title', function(){
        view.render();
      });

      $statusBar.on('click', function(){
        var cid = model.cid,
            editor = self.getEditor(cid, model);

        self.showEditor(editor);
      });
    },

    updateWidgets: function(){
      var views = this.conts,
          self = this,
          widgets = [];

      _.each(views, function(view){
        widgets = widgets.concat(view.collection.toJSON());
      });

      this.model.set('widgets', widgets);
    },

    hoverField: function(e){
      var $el = $(e.currentTarget);
      $el[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('hover');
    },

    openEditPanel: function(e){
      var $el = $(e.currentTarget),
          cid = $el[0].id.split('_')[1],
          $cont = $el.closest('.comps-cont'),
          container;

      if (!cid) return;
      container = $cont.data('cont');
      var model = this.conts[container].collection.get(cid),
          editor = this.getEditor(cid, model);

      if (!$el.hasClass('cur')) {
        this.$el.find('.comp-field').filter('.cur').removeClass('cur');
        $el.addClass('cur');
      }
      this.showEditor(editor);
    },

    performAct: function(e){
      e.stopPropagation();

      var $el = $(e.currentTarget),
          act = $el.data('act');
      if (!act) return false;
      if (act != 'add') this.hideSideMenu();

      var $field = $el.closest('.comp-field'),
          cid = $field[0].id.split('_')[1],
          fn = this.actions[act];

      if (cid && fn) fn.call(this, cid, $field);
    },

    getEditor: function(cid, model) {
      if (!cid) cid = this.conts['main'].collection.first().cid;

      var editor = _.findWhere(this.editors, { mcid: cid });
      if (!editor && model) {
        var type = model.getType(),
            EditorView = WidgetsFactory.getEditorView(type);

        //append dom at init
        var $editorEl = $('<div id="ed_' + model.cid + '" class="comp-editor"><div>').appendTo('#J_wgtEditor');
        editor = new EditorView({ model: model, el: $editorEl });
        this.editors.push(editor);
      }

      return editor;
    },

    removeEditor: function(editor){
      var editors = this.editors;

      if (typeof editor == 'string') {
        var cid = editor;
        editor = _.findWhere(editors, { mcid: cid });
      } else if(!editor || !editor.getCid()) {
        return false;
      }

      if (editor) {
        var idx = _.indexOf(editors, editor);
        editors.splice(idx, 1);
      }
    },

    showEditor: function(editor){
      var cid;
      if (typeof editor == 'string') {
        cid = editor;
        editor = this.getEditor(cid);
      } else if(editor && editor.getCid()) {
        cid = editor.getCid();
      }

      if (!editor) {
        editor = this.getEditor(this.curId);
      } else {
        if (this.curId != cid) {
          $('#ed_' + this.curId).hide();
          this.curId = cid;
        }
      }

      if (editor) {
        editor.show();
        return editor;
      }
    },

    showSideMenu: function(cid, $wgt){
      if (!$wgt || !$wgt.length) return;
      var self = this,
          sideMenuView = this.sideMenuView,
          $el = sideMenuView.$el,
          collection = this.mainView.collection,
          model = collection.get(cid),
          index = collection.indexOf(model),
          top;

      if (this.$wgtHelper) this.$wgtHelper.remove();
      this.$wgtHelper = $('<div class="comp-helper">请添加内容</div>').insertAfter($wgt);
      top = this.$wgtHelper.position().top;
      sideMenuView.hideMore();
      $el.show().css('top', top);
      sideMenuView.atIndex = index + 1;

      $(document).on('click.showcaseMenu', function(e){
        var $tgt = $(e.target);
        if (!$tgt.closest('.showcase-menu').length) {
          self.hideSideMenu();
        }
      });
    },

    hideSideMenu: function(){
      this.sideMenuView.$el.hide();
      if (this.$wgtHelper) {
        this.$wgtHelper.remove();
        this.$wgtHelper = null;
      }
      $(document).off('click.showcaseMenu');
    },

    validate: function(contView){
      contView = contView || 'main';
      var contView = this.conts[contView];
      if (!contView) return;

      var collection = contView.collection,
          self = this,
          error;

      error = collection.some(function(model){
        var valid = model.isValid(true);

        if (!valid) {
          var editor = self.showEditor(model.cid);
          if (editor) $(window).scrollTop(editor.$el.offset().top - 20);
          return !valid;
        };
      });

      return !error;
    },

    save: function(){
      var $btn = $('#J_btnSave').btn('loading'),
          self = this;

      setTimeout(function(){
        self.updateWidgets();
        if (!self.validate()) {
          $btn.btn('reset');
          return;
        }

        $.ajax({
          url: '/admin/showcase/save',
          type: 'post',
          data: { data: JSON.stringify(self.model.attributes), showcase: JSON.stringify(WD_CONFS.showcase) },
          complete: function(){
            $btn.btn('reset');
          },
          success: function(res){
            if (res.status && res.status == 'success') {
              $.notify('操作成功，正在跳转...', function(){
                location.href = res.data.redirect_url;
              });
            } else {
              $.notify(res.msg || '操作失败');
            }
          },
          error: function(){
            $.notify('操作失败，请稍后再试');
          }
        });
      }, 600);

      //console.info(this.model.attributes);
    },

    preview: function(){
      var $btn = $('#J_btnPreview').btn('loading'),
          self = this;

      setTimeout(function(){
        self.updateWidgets();
        if (!self.validate()) {
          $btn.btn('reset');
          return;
        }

        $.ajax({
          url: '/admin/showcase/preview',
          type: 'post',
          data: { data: JSON.stringify(self.model.attributes) },
          complete: function(){
            $btn.btn('reset');
          },
          success: function(res){
            if (res.status && res.status == 'success') {
              window.open(res.data.redirect_url);
            } else {
              $.notify(res.msg || '操作失败');
            }
          },
          error: function(){
            $.notify('操作失败，请稍后再试');
          }
        });
      }, 600);

      //console.info(this.model, this.model.attributes);
    }
  });



  function registerBiz(bizs, cb) {
    if (!_.isArray(bizs)) bizs = [bizs];

    _.each(bizs, function(biz){
      if (_.isString(biz)) registerViews(biz, cb);
    });
  }

  function toCamelCase(str){
    return str.replace(/(-|_)\w/g, function(match){
      return match.charAt(1).toUpperCase();
    });
  }

  function registerViews(name, cb) {
    var upperCaseName = toCamelCase(name),
        BizView = WidgetsFactory.getView('biz'),
        BizEditorView = WidgetsFactory.getEditorView('biz');;

    var Model = WidgetsFactory.getModel('biz'),
        View = BizView.extend({
          template: Handlebars.compile($('#T_' + upperCaseName).html())
        }),
        EditorView = BizEditorView.extend({
          template: Handlebars.compile($('#T_' + upperCaseName + 'Editor').html())
        });

    WidgetsFactory.register(name, {
      Model: Model,
      View: View,
      EditorView: EditorView
    });

    if (cb) cb(EditorView, View, Model);
  }

  exports.Model = Page;
  exports.View = PageView;
  exports.registerBiz = registerBiz;
});