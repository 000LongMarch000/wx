/*global seajs, $*/

seajs.config({
  alias: {
    'plupload': '../libs/plupload/plupload.full.min.js',
    'm.dialog': '../m.dialog.js',
    'selector': '/src/js/selector/index.js'
  }
});
seajs.use(['selector', 'm.dialog', 'plupload'], function (Selector, Dialog) {
  'use strict';

  $('button').on('click', function () {
    var s = new Selector({
      /*el: '#app',*/
      type: 'tags_group',
      setup: {
        /*shop_id: 'DLJ88'*/
      },
      options: {
        multiple: false,
        max: 4
      },
      data: ['XT63'],
      callback: function (data) {
        console.log(JSON.stringify(data));
      }
    }).popup().on('all', function (changed, collection, event) {
      console.log(changed, collection, event);
    });
  });
});
