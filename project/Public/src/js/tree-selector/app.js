/*jslint nomen: true*/

/*global $, Handlebars, define*/

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
                        opts.data = $.extend({}, v);
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
                    $tree0,
                    $tree1,
                    map = {parents: []};
                
                // 缓存记住原始数据父节点的id及顺序
                $.each(data.tree0.data, function (k, node) {
                    var id = node.id;
                    
                    map[id] = [];
                    
                    $.each(node.children, function (k, child) {
                        map[id].push(child.id);
                    });
                    
                    map.parents.push(id);
                });
                
                // 渲染弹出层显示应用界面
                $el = $.dlg({
                    title: '选择可配送区域',
                    width: 870,
                    html: display($.extend(true, {
                        tree0: {title: '可选城市'},
                        tree1: {title: '已选城市'}
                    }, data)),
                    removeOnHide: true
                });
                
                $tree0 = $('.tree-0 .tree-data', $el[0]).tree({
                    closedIcon: '&#xe629;',
                    data: data.tree0.data,
                    keyboardSupport: false,
                    onCreateLi: function (node, $el) {
                        $el.find('.jqtree-element').append('<span class="selected-flag iconfont">&#xe658;</span>');
                    },
                    openedIcon: '&#xe62c;',
                    slide: false,
                    useContextMenu: false
                });
                
                $tree1 = $('.tree-1 .tree-data', $el[0]).tree({
                    closedIcon: '&#xe629;',
                    data: [],
                    keyboardSupport: false,
                    onCreateLi: function (node, $el) {
                        $el.find('.jqtree-element').append('<a href="#" class="J_buttonRemove iconfont" data-id="' + node.id + '">&#xe65b;</a>');
                    },
                    openedIcon: '&#xe62c;',
                    selectable: false,
                    slide: false,
                    useContextMenu: false
                });
                
                // 绑定事件
                $('.module-tree_selector', $el[0])
                    .on('click', '.J_buttonAdd', function (e) {
                        e.preventDefault();
                        
                        var state = $tree0.tree('getState'),
                            open_nodes = state.open_nodes,
                            selected_node = state.selected_node,
                            tree0 = JSON.parse($tree0.tree('toJson')),
                            tree1 = JSON.parse($tree1.tree('toJson')),
                            cache = [];
                        
                        // 缓存记住已选树的父节点
                        $.each(tree1, function (k, node) {
                            cache.push(node.id);
                        });
                        
                        // 添加子节点
                        $.each($tree0.tree('getSelectedNodes'), function (k, node) {
                            if (node.getLevel() === 1) {
                                return;
                            }
                            
                            var parent = node.parent,
                                parent_id = parent.id,
                                parent_index = $.inArray(parent_id, cache);
                            
                            // 如果已选树没有父节点就添加父节点并缓存记住
                            if ($.inArray(parent_id, cache) < 0) {
                                tree1.push({
                                    id: parent_id,
                                    name: parent.name,
                                    children: []
                                });
                                cache.push(parent_id);
                                parent_index = cache.length - 1;
                            }
                            
                            // 在已选树父节点中添加子节点
                            tree1[parent_index].children.push({
                                id: node.id,
                                name: node.name
                            });
                        });
                        
                        // 按原数据顺序排序已选树
                        $.each(tree1, function (k, node) {
                            var children = node.children,
                                children_map = map[node.id];
                            
                            children.sort(function (child1, child2) {
                                return $.inArray(child1.id, children_map) > $.inArray(child2.id, children_map) ? 1 : -1;
                            });
                            
                            tree1[k].children = children;
                        });
                        
                        tree1.sort(function (node1, node2) {
                            return $.inArray(node1.id, map.parents) > $.inArray(node2.id, map.parents) ? 1 : -1;
                        });
                        
                        // 在可选树中删除已选节点
                        tree0 = $(tree0).filter(function (k, node) {
                            var index = $.inArray(node.id, cache),
                                children;
                            
                            if (index < 0) {
                                return true;
                            }
                            
                            children = $(node.children).filter(function (k, child) {
                                return $.inArray(child.id, selected_node) < 0;
                            }).toArray();
                            
                            if (children.length === 0) {
                                return false;
                            }
                            
                            tree0[k].children = children;
                            
                            return true;
                        }).toArray();
                        
                        // 重载树
                        $tree0.tree('loadData', tree0);
                        $tree1.tree('loadData', tree1);
                        
                        // 渲染展开状态
                        $.each(open_nodes, function (k, id) {
                            if ($.inArray(id, cache) < 0) {
                                return;
                            }
                            
                            var node = $tree1.tree('getNodeById', id);
                            
                            $tree1.tree('openNode', node);
                        });
                    })
                    .on('click', '.J_buttonCancel', function (e) {
                        e.preventDefault();
                        
                        $el.remove();
                    })
                    .on('click', '.J_buttonConfirm', function (e) {
                        e.preventDefault();
                        
                        var callback = options.callback;

                        if (callback) {
                            callback.call(null, JSON.parse($tree1.tree('toJson')), JSON.parse($tree0.tree('toJson')));
                        }
                        
                        $el.remove();
                    });
                
                $tree0
                    .bind('tree.click', function (e) {
                        e.preventDefault();
                        
                        var $this = $(this),
                            node = e.node,
                            $node = $(node.element),
                            parent = node.parent,
                            $parent = $(parent.element),
                            selected_node = $tree0.tree('getState').selected_node;
                        
                        $node.removeClass('jqtree-partialSelected');
                        
                        if ($this.tree('isNodeSelected', node)) {
                            $this.tree('removeFromSelection', node);
                            
                            if (node.getLevel() > 1) {
                                if ($(parent.children).filter(function (k, child) { return $.inArray(child.id, selected_node) >= 0; }).length - 1) {
                                    $this.tree('removeFromSelection', parent);
                                    $parent.addClass('jqtree-partialSelected');
                                } else {
                                    $parent.removeClass('jqtree-partialSelected');
                                }
                            } else {
                                $.each(node.children, function (k, child) {
                                    $this.tree('removeFromSelection', child);
                                });
                            }
                        } else {
                            $this.tree('addToSelection', node);
                            
                            if (node.getLevel() > 1) {
                                if ($(parent.children).filter(function (k, child) { return $.inArray(child.id, selected_node) >= 0; }).length + 1 === parent.children.length) {
                                    $this.tree('addToSelection', parent);
                                    $parent.removeClass('jqtree-partialSelected');
                                } else {
                                    $parent.addClass('jqtree-partialSelected');
                                }
                            } else {
                                $.each(node.children, function (k, child) {
                                    $this.tree('addToSelection', child);
                                });
                            }
                        }
                    })
                    .bind('tree.open', function (e) {
                        var node = $tree1.tree('getNodeById', e.node.id);
                        if (node) {
                            $tree1.tree('openNode', node);
                        }
                    })
                    .bind('tree.close', function (e) {
                        var node = $tree1.tree('getNodeById', e.node.id);
                        if (node) {
                            $tree1.tree('closeNode', node);
                        }
                    });
                
                $tree1
                    .bind('tree.open', function (e) {
                        var node = $tree0.tree('getNodeById', e.node.id);
                        if (node) {
                            $tree0.tree('openNode', node);
                        }
                    })
                    .bind('tree.close', function (e) {
                        var node = $tree0.tree('getNodeById', e.node.id);
                        if (node) {
                            $tree0.tree('closeNode', node);
                        }
                    })
                    .on('click', '.J_buttonRemove', function (e) {
                        e.preventDefault();
                        
                        var node = $tree1.tree('getNodeById', $(this).data('id')),
                            parent = node.parent,
                            children = node.children,
                            tree0 = JSON.parse($tree0.tree('toJson')),
                            cache = [],
                            index;
                        
                        // 缓存记住可选树的父节点
                        $.each(tree0, function (k, node) {
                            cache.push(node.id);
                        });
                        
                        if (node.getLevel() > 1) {
                        // 如果删除的是子节点
                            // 检查可选树里是否有父节点
                            index = $.inArray(parent.id, cache);
                            if (index < 0) {
                                // 没有则增加父节点再添加
                                tree0.push({
                                    id: parent.id,
                                    name: parent.name,
                                    children: [{
                                        id: node.id,
                                        name: node.name
                                    }]
                                });
                            } else {
                                // 有则直接添加
                                tree0[index].children.push({
                                    id: node.id,
                                    name: node.name
                                });
                            }
                            
                            // 如果父节点仅有一个，则删除父节点，否则删除自身
                            if (parent.children.length === 1) {
                                $tree1.tree('removeNode', parent);
                            } else {
                                $tree1.tree('removeNode', node);
                            }
                        } else {
                        // 如果删除的是父节点
                            // 检查可选树里是否有父节点
                            index = $.inArray(node.id, cache);
                            if (index < 0) {
                                // 没有则增加父节点再添加
                                tree0.push({
                                    id: node.id,
                                    name: node.name,
                                    children: children
                                });
                            } else {
                                // 有则添加子节点
                                tree0[index].children = tree0[index].children.concat(children);
                            }
                            // 在已选树中删除已选节点
                            $tree1.tree('removeNode', node);
                        }
                        
                        // 按原数据顺序排序可选树
                        $.each(tree0, function (k, node) {
                            var children = node.children,
                                children_map = map[node.id];
                            
                            children.sort(function (child1, child2) {
                                return $.inArray(child1.id, children_map) > $.inArray(child2.id, children_map) ? 1 : -1;
                            });
                            
                            tree0[k].children = children;
                        });
                        
                        tree0.sort(function (node1, node2) {
                            return $.inArray(node1.id, map.parents) > $.inArray(node2.id, map.parents) ? 1 : -1;
                        });
                        
                        // 重载树
                        $tree0.tree('loadData', tree0);
                    });
            };
            
            return this;
        };
    
    module.exports = App;
});