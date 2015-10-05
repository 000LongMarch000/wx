<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:48:07
         compiled from "/usr/share/nginx/wx/project/Application/Home/View/Pay/index.html" */ ?>
<?php /*%%SmartyHeaderCode:72598974656121da98746c0-52419286%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8cc46e8344fafdf29d2e2741abc0ef9dd48ce883' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Home/View/Pay/index.html',
      1 => 1444031164,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '72598974656121da98746c0-52419286',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_56121da98d9c7',
  'variables' => 
  array (
    'user' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56121da98d9c7')) {function content_56121da98d9c7($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
  	<meta name="format-detection" content="telephone=no">

  	<link rel="stylesheet" type="text/css" href="/src/css/h5/reset.css" />
  	<link rel="stylesheet" type="text/css" href="/src/css/h5/fail.css" />
	<title>会员购买</title>
</head>
<body>
    <div class="title">
    <?php if ($_smarty_tpl->tpl_vars['user']->value['level']){?>
    您已经是<?php if ($_smarty_tpl->tpl_vars['user']->value['level']=='2'){?>银牌<?php }elseif($_smarty_tpl->tpl_vars['user']->value['level']=='3'){?>金牌<?php }?>会员
    <?php }else{ ?>
    您还不是会员。
    <?php }?>
    </div>
	<a class="btn silver-vip" href="/pay/alipay/index/user/<?php echo $_smarty_tpl->tpl_vars['user']->value['id'];?>
/level/2">购买银牌会员</a>
	<a class="btn gold-vip" href="/pay/alipay/index/user/<?php echo $_smarty_tpl->tpl_vars['user']->value['id'];?>
/level/3">购买金牌会员</a>
</body>
</html>
<?php }} ?>