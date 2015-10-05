<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:18:11
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Passport/login.html" */ ?>
<?php /*%%SmartyHeaderCode:193051032156121623c3f5d7-08203434%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7a76f4fe6f1a97c33e6a686c6843573b4d917ca6' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Passport/login.html',
      1 => 1444024835,
      2 => 'file',
    ),
    '794d22911d854de125d4667563263416e8ef0571' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Layouts/passport.html',
      1 => 1444022250,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '193051032156121623c3f5d7-08203434',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'assets_path' => 0,
    'DEBUG' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_56121623d28b8',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56121623d28b8')) {function content_56121623d28b8($_smarty_tpl) {?><?php if (!is_callable('smarty_function_autover')) include '/usr/share/nginx/wx/ThinkPHP/Library/Vendor/Smarty/plugins/function.autover.php';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta property="wb:webmaster" content="137c8d655239750" />
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" >
  <title></title>
  <link rel="stylesheet" href="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/css/passport.css'),$_smarty_tpl);?>
" />
  
  <style>
     .passport-bg{
          background:none;
          background: #f0f0f0;
     }
  </style>
  
  <?php if ($_smarty_tpl->tpl_vars['DEBUG']->value){?>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/sea.js" id="seajsnode"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/sea/plugin-text.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/config.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/jquery-1.11.0.js"></script>

  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/underscore.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/json2.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/handlebars-1.3.0.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/jquery.validate.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/icheck.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/jquery.transit.js"></script>

  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/main.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/main.use.js"></script>
  <?php }else{ ?>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/sea.js'),$_smarty_tpl);?>
" id="seajsnode"></script>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/jquery-1.11.0.js'),$_smarty_tpl);?>
"></script>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/libs/passport.js'),$_smarty_tpl);?>
"></script>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/main.js'),$_smarty_tpl);?>
"></script>
  <?php }?>
  
  
</head>
<body class="page-yl page-passport">

<div class="main">
  
<div class="mod-passport">
  <div class="mod-title">
    <h1><span>ShopFlow</span></h1>
  </div>

  <div class="passport-panel">
    <div class="mod-hd"><h3>登录</h3></div>
    <div class="mod-bd">
      <form id="J_loginForm" action="/admin/passport/verify" method="POST">
        <?php if ($_smarty_tpl->tpl_vars['errmsg']->value){?><div class="alert-error"><?php echo $_smarty_tpl->tpl_vars['errmsg']->value;?>
</div><?php }?>
        <div class="form-group-line">
          <input type="text" name="mobile" class="input-text input-xlarge required mobile" placeholder="使用手机号登录">
        </div>
        <div class="form-group-line">
          <input type="password" name="password" class="input-text input-xlarge required" placeholder="请输入密码">
        </div>
        <div class="form-group-line">
          <button type="submit" class="btn btn-primary btn-large btn-line">登录</button>
        </div>
      </form>
    </div>
  </div>
</div>


</div>


<script>
seajs.use(['p.login', 'm.placeholder'], function(app, $placeholder){
  $placeholder($);
  app.init();
  $('#J_loginForm').validate();
  $('#J_loginForm').find('input[placeholder]').placeholder();
});
</script>



</body>
</html>
<?php }} ?>