<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:34:50
         compiled from "/usr/share/nginx/wx/project/Application/Home/View/Pay/success.html" */ ?>
<?php /*%%SmartyHeaderCode:2935111545612281abe39d1-64493835%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8248f01aeb78dd007d9c11990b9e156cbc705ef1' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Home/View/Pay/success.html',
      1 => 1444022250,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2935111545612281abe39d1-64493835',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'error' => 0,
    'level' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_5612281ac3ff0',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5612281ac3ff0')) {function content_5612281ac3ff0($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
  	<meta name="format-detection" content="telephone=no">
  	<link rel="stylesheet" type="text/css" href="/src/css/h5/reset.css" />
  	<link rel="stylesheet" type="text/css" href="/src/css/h5/success.css" />
	<title></title>
</head>
<body>
    <?php if ($_smarty_tpl->tpl_vars['error']->value){?>
    <div class="title"><?php echo $_smarty_tpl->tpl_vars['error']->value;?>
</title>
    <?php }else{ ?>
    <div class="title">支付成功 !</div>
    <?php if ($_smarty_tpl->tpl_vars['level']->value){?>
	<div class="subtitle">恭喜，您已经成为<?php echo $_smarty_tpl->tpl_vars['level']->value;?>
</div>
    <?php }?>
    <?php }?>

	
</body>
</html>

<html>
<head>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body>
<div>

    </div>
</body>
</html>
<?php }} ?>