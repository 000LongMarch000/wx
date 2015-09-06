/*jslint nomen: true*/

/*global define, WD_CONFS, $, _*/

define(function (require, exports, module) {
  'use strict';

  require('../m.notify.js')($);
  require('../m.dialog.js')($);

  var App = require('./app.js');

  module.exports = function (options) {
    var
      model = {
        el: options.el || '<div class="selector-instance-' + _.now() + '" />'
      },
      setup = {
        type: options.type,
        setup: options.setup || {},
        options: options.options || {},
        data: options.data,
        callback: options.callback
      },
      selector, notify, dialog;

    if (!setup.setup.shop_id && typeof WD_CONFS !== 'undefined' && typeof WD_CONFS.shop_id !== 'undefined') {
      setup.setup.shop_id = WD_CONFS.shop_id;
    }


    selector = new App(model, setup);

    this.popup = function () {
      selector.$el.delegate('.selector-actions-confirm', 'click', function () {
        dialog.remove();
      });
      dialog = $.dlg({
        title: options.type === 'images' ? '选择图片' : (options.type === 'products' ? '选择商品' : (options.type === 'events' ? '选择活动列表' : (options.type === 'pages' ? '选择自定义页面' : (options.type === 'populars' ? '选择拼人气活动' : (options.type === 'coupons' ? '选择优惠券列表' : (options.type === 'tags_group' ? '选择商品分组' : '')))))),
        removeOnHide: true,
        draggable: false,
        width: options.type === 'images' ? 870 : (options.type === 'products' ? 900 : 800),
        html: selector.$el[0],
        onHide: function () {
          selector.destroy();
        }
      });
      selector.$el.find('.selector-app').trigger('renderCompleted');
      return this;
    };

    this.on = function (event, callback) {
      var self = this;
      selector.$el.bind('memoryChange', function (e, backbone_event, backbone_collection, backbone_changed) {
        if (event === 'all') {
          callback.call(selector, backbone_changed, backbone_collection, backbone_event);
          return self;
        }
        if (event === backbone_event) {
          callback.call(selector, backbone_changed, backbone_collection, backbone_event);
          return self;
        }
      });
    };

    this.destroy = function () {
      selector.destroy();
    };

    return this;
  };
});