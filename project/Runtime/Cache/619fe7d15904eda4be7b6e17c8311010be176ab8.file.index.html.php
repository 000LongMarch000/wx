<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:39:41
         compiled from "/usr/share/nginx/wx/project/Application/Home/View/Show/index.html" */ ?>
<?php /*%%SmartyHeaderCode:1595842887561224d0552c40-15099969%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '619fe7d15904eda4be7b6e17c8311010be176ab8' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Home/View/Show/index.html',
      1 => 1444030018,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1595842887561224d0552c40-15099969',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_561224d05aaed',
  'variables' => 
  array (
    'due' => 0,
    'item' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_561224d05aaed')) {function content_561224d05aaed($_smarty_tpl) {?><html>
<head>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body>
<?php if (!$_smarty_tpl->tpl_vars['due']->value){?>
<iframe src="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" width="100%" height="100%" frameborder="0"></iframe>
<?php }else{ ?>
<div>
页面已经过期，不能访问喽
</div>
<?php }?>
</body>
</html>
<?php }} ?>