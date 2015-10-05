<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:07:49
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/header.html" */ ?>
<?php /*%%SmartyHeaderCode:108970701561218605c6599-34937334%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8c61c2ee1914a85b0583e794fbbe201e2062bf1a' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Common/header.html',
      1 => 1444028868,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '108970701561218605c6599-34937334',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_561218605e027',
  'variables' => 
  array (
    'menu' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_561218605e027')) {function content_561218605e027($_smarty_tpl) {?><div class="top-header">
  <div class="container">
    <div class="logo">
       微淘秀
    </div>
    <div class="navs-list">
      <ul>
        <li <?php if ($_smarty_tpl->tpl_vars['menu']->value=='product'){?>class="cur"<?php }?>><a href="/admin/product/lists">商品列表</a></li>
        <li <?php if ($_smarty_tpl->tpl_vars['menu']->value=='user'){?>class="cur"<?php }?>><a href="/admin/user/lists">用户列表</a></li>
        <li <?php if ($_smarty_tpl->tpl_vars['menu']->value=='weixin'){?>class="cur"<?php }?>><a href="/admin/weixin/menu">微信菜单</a></li>
        <li><a href="/admin/passport/logout">退出</a></li>
      </ul>
    </div>
  </div>
</div>

<?php }} ?>