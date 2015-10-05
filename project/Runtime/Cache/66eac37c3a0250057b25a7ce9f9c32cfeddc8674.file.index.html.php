<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:24:32
         compiled from "/usr/share/nginx/wx/project/Application/Pay/View/Alipay/index.html" */ ?>
<?php /*%%SmartyHeaderCode:1159829851561225b0a07631-24209806%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '66eac37c3a0250057b25a7ce9f9c32cfeddc8674' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Pay/View/Alipay/index.html',
      1 => 1444022250,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1159829851561225b0a07631-24209806',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'user_id' => 0,
    'level' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_561225b0a5307',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_561225b0a5307')) {function content_561225b0a5307($_smarty_tpl) {?><html>
<head>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body>
<iframe src="/pay/alipay/buy/user/<?php echo $_smarty_tpl->tpl_vars['user_id']->value;?>
/level/<?php echo $_smarty_tpl->tpl_vars['level']->value;?>
" width="100%" height="100%" frameborder="0"></iframe>
</body>
</html>
<?php }} ?>