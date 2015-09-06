/*global define*/

define(function (require, exports, module) {
    'use strict';
    
    var App = require('./app');
    
    module.exports.invoke = function () {
        var app = new App();
        
        // 初始化应用并传入参数
        app.init.apply(null, arguments);
        
        app.invoke();
    };
});