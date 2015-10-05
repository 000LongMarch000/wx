<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:44
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Weixin/menu.html" */ ?>
<?php /*%%SmartyHeaderCode:27553808056121860382434-07979490%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7ed671967636d312328736f2b72adf5c25c7914c' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Weixin/menu.html',
      1 => 1444022250,
      2 => 'file',
    ),
    'f153ec6ac8c9464609498acec6b2d3eef2cefeae' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Layouts/default.html',
      1 => 1444022250,
      2 => 'file',
    ),
    '5ce5a11937ccf9c960034ca698c243ae11088644' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/product.html',
      1 => 1444022250,
      2 => 'file',
    ),
    'd3340f3d2b90110c700ef29827914e77df0100e5' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/weixin.html',
      1 => 1444022250,
      2 => 'file',
    ),
    '28402f3b4813fde06e02d02d15a6eb0eb1025949' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/user.html',
      1 => 1444022250,
      2 => 'file',
    ),
    '1e49fe16b8e9a7256862bd3ec09f19b33354d4db' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Shop/common/weixin_tabs.html',
      1 => 1444022250,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '27553808056121860382434-07979490',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'assets_path' => 0,
    'DEBUG' => 0,
    'menu' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_561218605bd25',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_561218605bd25')) {function content_561218605bd25($_smarty_tpl) {?><?php if (!is_callable('smarty_function_autover')) include '/usr/share/nginx/wx/ThinkPHP/Library/Vendor/Smarty/plugins/function.autover.php';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" >
  <title>shopflow</title>
  <link rel="stylesheet" href="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/css/index.css'),$_smarty_tpl);?>
" />
  
  
  <?php if ($_smarty_tpl->tpl_vars['DEBUG']->value){?>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/sea.js" id="seajsnode"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/sea/plugin-text.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/sea/plugin-css.js"></script>
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
/js/libs/jquery.transit.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/jquery.qtip.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/icheck.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/style-select.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/jquery.validate.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/accounting.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/nprogress.js"></script>

  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/main.js"></script>
  <script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/main.use.js"></script>
  <?php }else{ ?>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/sea.js'),$_smarty_tpl);?>
" id="seajsnode"></script>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/jquery-1.11.0.js'),$_smarty_tpl);?>
"></script>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/libs/index.js'),$_smarty_tpl);?>
"></script>
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/main.js'),$_smarty_tpl);?>
"></script>
  <?php }?>
  
  
  <!--[if lte IE 7]>
  <link rel="stylesheet" href="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/css/ie6.css'),$_smarty_tpl);?>
" />
  <script type="text/javascript" src="<?php echo smarty_function_autover(array('assets_path'=>$_smarty_tpl->tpl_vars['assets_path']->value,'filepath'=>'/js/ie6.js'),$_smarty_tpl);?>
"></script>
  <![endif]-->
</head>
<body class="page-yl">
<?php echo $_smarty_tpl->getSubTemplate ("../Common/header.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>


<div class="main container">
  <div class="main-side">
    
    <?php if ($_smarty_tpl->tpl_vars['menu']->value=='product'){?>
        <?php /*  Call merged included template "../Common/side_nav/product.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/product.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '27553808056121860382434-07979490');
content_5612186046778($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/product.html" */?>
    <?php }elseif($_smarty_tpl->tpl_vars['menu']->value=='weixin'){?>
        <?php /*  Call merged included template "../Common/side_nav/weixin.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/weixin.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '27553808056121860382434-07979490');
content_5612186048c6f($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/weixin.html" */?>
    <?php }elseif($_smarty_tpl->tpl_vars['menu']->value=='user'){?>
        <?php /*  Call merged included template "../Common/side_nav/user.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/user.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '27553808056121860382434-07979490');
content_561218604aa8a($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/user.html" */?>
    <?php }?>
    
  </div>

  <div class="main-cont">
    
<div class="page-header">
  <h2 class="page-title">自定义菜单</h2>
  <div class="btns">
    <a href="/admin/shop/lists">返回</a>
  </div>
</div>

<div class="cont-wrap">
  <?php /*  Call merged included template "../Shop/common/weixin_tabs.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Shop/common/weixin_tabs.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '27553808056121860382434-07979490');
content_561218604ff21($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Shop/common/weixin_tabs.html" */?>

	<div class="cont-wrap"><?php if ($_smarty_tpl->tpl_vars['wxin']->value){?><?php if ($_smarty_tpl->tpl_vars['wxin_info_check']->value){?>
		<ul class="wx-menu-list">
			<li><?php if ($_smarty_tpl->tpl_vars['count']->value>=3){?>
				<span class="alert"><i class="iconfont">&#xe623;</i> 最多添加3个一级菜单</span><?php }else{ ?>
				<a href="/admin/weixin/addmenu"><i class="iconfont">&#xe626;</i> 添加菜单</a><?php }?>
			</li><?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['menus']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value){
$_smarty_tpl->tpl_vars['item']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['item']->key;
?>
			<li>
				<div class="col-0"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</div>
				<div class="col-1"><?php if ($_smarty_tpl->tpl_vars['item']->value['type']=='view'){?>打开：<?php echo $_smarty_tpl->tpl_vars['item']->value['msg_data']['url'];?>
<?php }elseif($_smarty_tpl->tpl_vars['item']->value['type']=='click'){?>回复：<?php if ($_smarty_tpl->tpl_vars['item']->value['msg_info_type']=='1'){?>文字信息<?php }elseif($_smarty_tpl->tpl_vars['item']->value['msg_info_type']=="2"){?>图文信息<?php }?><?php }?></div>
				<div class="col-2"><a href="/admin/weixin/addmenu?id=<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
"><i class="iconfont">&#xe657;</i> 编辑</a><a href="/admin/weixin/deletemenu?id=<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" class="J_btnDel red"><i class="iconfont">&#xe625;</i> 删除</a></div><?php if ($_smarty_tpl->tpl_vars['item']->value['sec']){?>
					<ul class="wx-submenu-list"><?php  $_smarty_tpl->tpl_vars['sec_item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['sec_item']->_loop = false;
 $_smarty_tpl->tpl_vars['sec_key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['item']->value['sec']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['sec_item']->key => $_smarty_tpl->tpl_vars['sec_item']->value){
$_smarty_tpl->tpl_vars['sec_item']->_loop = true;
 $_smarty_tpl->tpl_vars['sec_key']->value = $_smarty_tpl->tpl_vars['sec_item']->key;
?>
						<li>
							<!--[if lt IE 8]><div class="sub-helper"></div><![endif]-->
							<div class="col-0"><?php echo $_smarty_tpl->tpl_vars['sec_item']->value['name'];?>
</div>
							<div class="col-1"><?php if ($_smarty_tpl->tpl_vars['sec_item']->value['type']=='view'){?>打开：<?php echo $_smarty_tpl->tpl_vars['sec_item']->value['msg_data']['url'];?>
<?php }elseif($_smarty_tpl->tpl_vars['sec_item']->value['type']=='click'){?>回复：<?php if ($_smarty_tpl->tpl_vars['sec_item']->value['msg_info_type']=='1'){?>文字信息<?php }elseif($_smarty_tpl->tpl_vars['sec_item']->value['msg_info_type']=="2"){?>图文信息<?php }?><?php }?></div>
						</li><?php } ?>
					</ul><?php }?>
			</li><?php } ?>
		</ul><?php }else{ ?>
		<div class="alert-info"><i class="icon-info"></i>该功能需要填写APP ID和APP Secret，<a href="/admin/weixin/basic">去填写</a></div><?php }?><?php }else{ ?>
		<div class="alert-info"><i class="icon-error"></i>请先<a href="/admin/weixin/basic">配置微信公共账号</a>，才能使用该功能</div><?php }?>
	</div>
</div>

  </div>
</div>

<?php echo $_smarty_tpl->getSubTemplate ("../Common/footer.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>



<script>
	seajs.use([],function(){
		$('.J_btnDel').click(function(e){
			e.preventDefault();
			var url=$(this).attr('href');
			$.confirm('确认删除吗？',function(){
				WD.ajax({
					url:url,
					success:function(){
						location.reload();
					}
				});
			});
		});
	});
</script>

</body>
</html>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:44
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/product.html" */ ?>
<?php if ($_valid && !is_callable('content_5612186046778')) {function content_5612186046778($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>商品管理
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('product_lists'))){?>class="cur"<?php }?> href="/admin/product/lists">商品列表</a></li>
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('product_add','product_edit'))){?>class="cur"<?php }?> href="/admin/product/add">添加商品</a></li>
    </ul>
  </div>
</div>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:44
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/weixin.html" */ ?>
<?php if ($_valid && !is_callable('content_5612186048c6f')) {function content_5612186048c6f($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>微信菜单
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('weixin_basic','weixin_auto','weixin_menu','weixin_attention','weixin_message','weixin_keyword','weixin_addmenu'))){?>class="cur"<?php }?> href="/admin/weixin/menu">微信菜单管理</a></li>
    </ul>
  </div>
</div>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:44
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/user.html" */ ?>
<?php if ($_valid && !is_callable('content_561218604aa8a')) {function content_561218604aa8a($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>会员管理
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('user_lists'))){?>class="cur"<?php }?> href="/admin/user/lists">会员列表</a></li>
    </ul>
  </div>
</div>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:44
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Shop/common/weixin_tabs.html" */ ?>
<?php if ($_valid && !is_callable('content_561218604ff21')) {function content_561218604ff21($_smarty_tpl) {?><div class="wgt-tabs">
  <div class="tabs">
    <ul>
      <!--
      <li class="tab <?php if ($_smarty_tpl->tpl_vars['k']->value=='auto'){?>cur<?php }?>"><a href="/admin/weixin/auto">自动回复</a></li>
      -->
      <li class="tab <?php if ($_smarty_tpl->tpl_vars['k']->value=='menu'){?>cur<?php }?>"><a href="/admin/weixin/menu">自定义菜单</a></li>
    </ul>
  </div>
</div>
<?php }} ?>