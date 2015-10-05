/*jslint nomen: true*/

/*global $, Handlebars, accounting, WD, define*/

define(function (require, exports, module) {
    'use strict';
    
    var template = require('./views/app.tpl'),
        App = function () {
            var options = {},
                display = Handlebars.compile(template);

            this.init = function () {
                var _opts = Array.prototype.slice.call(arguments),
                    opts = {};
                
                $.each(_opts || [], function (k, v) {
                    if ($.isPlainObject(v)) {
                        opts.data = $.extend({
                            orderID: '无',
                            address: '无',
                            items: [],
                            deliveryFee: 0
                        }, v);
                        return;
                    }

                    if ($.isFunction(v)) {
                        opts.callback = v;
                        return;
                    }
                });
                
                $.extend(options, opts);
            };

            this.invoke = function () {
                var data = options.data,
                    $el,
                    total = 0,
                    totalFee = 0;
                
                // 预处理数据以便渲染
                $.each(data.items, function (k, v) {
                    var price = accounting.toFixed(v.price, 2),
                        subtotal = accounting.toFixed(v.count_price, 2);
                    
                    data.items[k].price = accounting.formatNumber(price, 2);
                    data.items[k].originPrice = price;
                    data.items[k].subtotalPrice = accounting.formatNumber(subtotal, 2);
                    data.items[k].originSubtotalPrice = subtotal;
                    
                    total += Number(price);
                });
                
                totalFee = total + Number(data.deliveryFee) - Number(data.discount);
                
                totalFee = totalFee > 0 ? totalFee : 0;
                
                data.deliveryFee = accounting.formatNumber(data.deliveryFee, 2);
                data.originDeliveryFee = accounting.toFixed(data.deliveryFee, 2);
                data.totalPrice = accounting.formatNumber(total, 2);
                data.originTotalPrice = accounting.toFixed(total, 2);
                data.totalFee = accounting.formatNumber(totalFee, 2);
                data.discount = accounting.formatNumber(data.discount, 2);
                
                // 渲染弹出层显示应用界面
                $el = $.dlg({
                    title: '修改订单金额',
                    width: 900,
                    html: display(data),
                    removeOnHide: true
                });

                // 绑定事件
                $('.app-price_modifier', $el[0])
                    .on('keydown', 'input[type=text]', function (e) {
                        if (e.keyCode === 13) {
                            $(this).trigger('blur');
                        }
                    })
                    
                    .on('focus', '.J_inputModifiedDeliveryFee, .J_inputModifiedPrice', function () {
                        var $this = $(this);
                        $this.data('value', $this.val()).val('');
                    })
                    
                    .on('blur', '.J_inputModifiedDeliveryFee, .J_inputModifiedPrice', function () {
                        var $this = $(this),
                            value = $this.val();
                        if ($.trim(value).length === 0) {
                            $this.val($this.data('value')).data('value', '');
                        } else {
                            value = Number(value) > 0 ? accounting.formatNumber(value, 2) : '0.00';
                            
                            $this.val(value);
                        }
                    })
                    
                    .on('input', '.J_inputModifiedDeliveryFee, .J_inputModifiedPrice', function () {
                        $(this).data('value', '0.00');
                    })
                    
                    .on('input', '.J_inputModifiedDeliveryFee', function (e) {
                        var value = Number(accounting.toFixed($(this).val(), 2));
                        
                        value = value > 0 ? value : 0;
                        
                        $('.J_spanModifiedDeliveryFee', e.delegateTarget).html(accounting.formatNumber(value, 2)).trigger('update');
                    })
                    
                    .on('input', '.J_inputModifiedPrice', function (e) {
                        var $this = $(this),
                            total = 0;
                        
                        $('.J_inputModifiedPrice', e.delegateTarget).each(function () {
                            var value = Number(accounting.toFixed($(this).val(), 2));
                            
                            value = value > 0 ? value : 0;
                            
                            total += value;
                        });
                        
                        $('.J_spanModifiedTotalPrice', e.delegateTarget).html(accounting.formatNumber(total, 2)).trigger('update');
                    })
                    
                    .on('update', '.J_spanModifiedDeliveryFee, .J_spanModifiedTotalPrice', function (e) {
                        var $this = $(this),
                            $parent = $this.parent(),
                            $diff = $('.' + $this[0].className.match(/\s?(J_span\S+)/)[1].replace('Modified', 'Changed'), e.delegateTarget),
                            $diff_parent = $diff.parent(),
                            value = accounting.unformat($this.html()),
                            another_value = accounting.unformat($parent.siblings().filter(function () {
                                return $('.J_spanModifiedDeliveryFee, .J_spanModifiedTotalPrice', this).length > 0;
                            }).children().html()),
                            discount = accounting.unformat($parent.siblings('.J_spanDiscount').html()),
                            diff_value = value - $this.data('original'),
                            totalFee = 0;
                        
                        $diff.html(accounting.formatNumber(diff_value, 2));
                        
                        totalFee = value + another_value - discount;
                        totalFee = totalFee > 0 ? totalFee : 0;
                        
                        $('.J_spanModifiedTotalFee', e.delegateTarget).html(accounting.formatNumber(totalFee, 2));
                        
                        $diff_parent.removeClass('flag-rise flag-fall');
                        $parent.removeClass('flag-rise flag-fall');
                        
                        if (0 < diff_value) {
                            $diff_parent.addClass('flag-rise');
                            $parent.addClass('flag-rise');
                        } else if (diff_value < 0) {
                            $diff_parent.addClass('flag-fall');
                            $parent.addClass('flag-fall');
                        }
                    })
                    
                    .on('click', function (e) {
                        e.preventDefault();
                    })
                    
                    .on('click', '.J_buttonFreeDeliveryFee', function (e) {
                        $('.J_inputModifiedDeliveryFee', e.delegateTarget).val('0.00').trigger('input').trigger('blur');
                    })
                    
                    .on('click', '.J_buttonConfirm', function (e) {
                        var $delivery = $('.J_inputModifiedDeliveryFee', e.delegateTarget),
                            deliveryFee = accounting.unformat($delivery.val()),
                            data = {};
                        
                        data.delivery_fee = accounting.toFixed(deliveryFee, 2);
                        data.changed_delivery_fee = accounting.toFixed(deliveryFee - accounting.unformat($delivery.data('original')), 2);
                        data.items = [];
                        
                        $('.J_inputModifiedPrice', e.delegateTarget).each(function () {
                            var $this = $(this),
                                value = accounting.unformat($this.val());
                            
                            data.items.push({
                                id: $this.closest('tr').data('id'),
                                value: accounting.toFixed(value, 2),
                                changed_value: accounting.toFixed(value - accounting.unformat($this.data('original')), 2)
                            });
                        });
                        
                        WD.ajax({
                            url: $('form', e.delegateTarget).attr('action'),
                            type: 'POST',
                            data: $.extend({
                                action: 'price',
                                trade_id: options.data.orderID
                            }, data),
                            success: function (msg) {
                                if (msg) {
                                    $.notify(msg);
                                }
                                
                                $el.close();
                                
                                if (options.callback) {
                                    options.callback.call(null, data);
                                }
                            }
                        });
                    })
                    
                    .on('click', '.J_buttonCancel', function () {
                        $el.close();
                    });
                
                
            };

            return this;
        };
    
    module.exports = App;
});