<?php
$conf = array(
     //'配置项'=>'配置值'
    'DB_TYPE' => 'mysql', // 数据库类型
    'DB_HOST' => 'localhost', // 服务器地址
    'DB_NAME' => 'vtshow', // 数据库名
    'DB_USER' => 'root', // 用户名
    'DB_PWD' => '123456', // 密码
    'DB_PORT' => '3306', // 端口
    'DB_PREFIX' => '', // 数据库表前缀
    'DB_CHARSET' => 'utf8', // 数据库编码默认采用utf8
    'PRODUCTS' => array(
         '2' => array('title' => '银牌会员', 'desc' => '欢迎您成为银牌会员', 'price' => '88.00'),
         '3' => array('title' => '金牌会员', 'desc' => '欢迎您成为金牌会员', 'price' => '299.00'),
    ),
);
