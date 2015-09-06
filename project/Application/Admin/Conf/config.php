<?php
return array(
	//'配置项'=>'配置值'
    'DEFAULT_MODULE' => 'Admin', // 默认模块
    'DEFAULT_CONTROLLER' => 'Index', // 默认控制器名称
    'DEFAULT_ACTION' => 'index', // 默认操作名称

    //'VIEW_PATH' => dirname(dirname(__FILE__)) . '/View/Bak/',

    'URL_ROUTER_ON' => true, 
    'URL_ROUTE_RULES' => array(
        'product/edit/:product_id' => array('product/edit'),
        'product/save/:product_id' => array('product/save'),
        'product/qrtars/:product_id' => array('product/qrtars'),
        'account/authprotocol/:auth_type' => array('account/authprotocol'),
        'account/authtype/:auth_type' => array('account/authtype'),
    ),
);
