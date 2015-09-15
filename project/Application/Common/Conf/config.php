<?php
require_once dirname(__FILE__) . '/env.php';
$common = array(
    'DEBUG' => true,
    'ENV' => 'DEV',

    'URL_MODEL' => 2,
    'URL_CASE_INSENSITIVE' => true,
    'URL_CASE_INSENSITIVES' => true,
    'URL_HTML_SUFFIX' => '',

    'LOG_RECORD' => false,
    'LOG_LEVEL' => 'EMERG,ALERT,CRIT,ERR,WARN',
    'LOG_TYPE' => 'File', 

    'TMPL_ENGINE_TYPE' => 'Smarty', //模版引擎配置
    'TMPL_ENGINE_CONFIG' => array(
         'left_delimiter' => '<{',
         'right_delimiter' => '}>',
    ),

    'PAGE_LIMIT' => 10,

    'WEIXIN' => array('appid' => 'wx5c5eb81395daa40c', 'appsecret' => '2486f856156e4cee1ffe231658558b26', 'token' => '2d5d7e74c17bdcc3f753f3d46fc3abc0'),
    
    'ALIPAY_CONFIG' => array(
        'partner' => '2088411553059153',
        'seller_email' => '13641907392@163.com',
        'key' => 'u9hyo0kjybwil2bdboq0k840iipinfin',
        'sign_type' => 'MD5', 
        'input_charset' => 'utf-8',
        'cacert' => getcwd().'\\cacert.pem', 
        'transport' => 'http',
    ),  

    'ALIPAY_SETTING' => array(
        'payment_type' => '1',
        'notify_url' => 'http://wechat.shopflow.cn/pay/alipay/notify',
        'return_url' => 'http://wechat.shopflow.cn/pay/alipay/back',
    ),
);

return array_merge($common, $conf);
