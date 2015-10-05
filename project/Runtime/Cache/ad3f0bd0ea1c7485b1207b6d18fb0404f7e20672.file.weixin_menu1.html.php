<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:58
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Weixin/weixin_menu1.html" */ ?>
<?php /*%%SmartyHeaderCode:18379091375612186e0392a6-43910549%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ad3f0bd0ea1c7485b1207b6d18fb0404f7e20672' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/Weixin/weixin_menu1.html',
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
  'nocache_hash' => '18379091375612186e0392a6-43910549',
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
  'unifunc' => 'content_5612186e58c03',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5612186e58c03')) {function content_5612186e58c03($_smarty_tpl) {?><?php if (!is_callable('smarty_function_autover')) include '/usr/share/nginx/wx/ThinkPHP/Library/Vendor/Smarty/plugins/function.autover.php';
if (!is_callable('smarty_modifier_regex_replace')) include '/usr/share/nginx/wx/ThinkPHP/Library/Vendor/Smarty/plugins/modifier.regex_replace.php';
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
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/product.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '18379091375612186e0392a6-43910549');
content_5612186e0fcd5($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/product.html" */?>
    <?php }elseif($_smarty_tpl->tpl_vars['menu']->value=='weixin'){?>
        <?php /*  Call merged included template "../Common/side_nav/weixin.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/weixin.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '18379091375612186e0392a6-43910549');
content_5612186e11e6d($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/weixin.html" */?>
    <?php }elseif($_smarty_tpl->tpl_vars['menu']->value=='user'){?>
        <?php /*  Call merged included template "../Common/side_nav/user.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/user.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '18379091375612186e0392a6-43910549');
content_5612186e142e8($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/user.html" */?>
    <?php }?>
    
  </div>

  <div class="main-cont">
    
<div class="page-header">
  <h2 class="page-title">自定义菜单</h2>
  <div class="btns">
    <a href="javascript:history.go(-1);" >返回</a>
  </div>
</div>

<div class="cont-wrap">
  <?php /*  Call merged included template "../Shop/common/weixin_tabs.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Shop/common/weixin_tabs.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '18379091375612186e0392a6-43910549');
content_5612186e170de($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Shop/common/weixin_tabs.html" */?>

  <div class="cont-wrap">
		<form action="/admin/weixin/savemenu" method="post" id="J_formWxmenu" class="wx-menu-form">
			<div class="form-group">
				<label for="name" class="ctl-label"><em>*</em>菜单名：</label>
				<input type="text" name="name" id="name" value="<?php echo $_smarty_tpl->tpl_vars['menus']->value['name'];?>
" class="input-text required">
			</div>
			<div class="form-group">
				<label for="weight" class="ctl-label">排序：</label>
				<input type="text" name="weight" id="weight" value="<?php if ($_smarty_tpl->tpl_vars['menus']->value['weight']){?><?php echo $_smarty_tpl->tpl_vars['menus']->value['weight'];?>
<?php }else{ ?>0<?php }?>" class="input-text number">
			</div>
			<div class="form-group">
				<label class="ctl-label">点击菜单：</label>
				<div class="ctl">
					<input type="radio" name="s" id="s_reply" value="reply"<?php if ($_smarty_tpl->tpl_vars['menus']->value['type']=='view'||$_smarty_tpl->tpl_vars['menus']->value['type']=='click'||!$_smarty_tpl->tpl_vars['menus']->value['id']){?> checked<?php }?>>
					<label for="s_reply"> 回复内容</label>
					<input type="radio" name="s" id="s_sub" value="sub"<?php if ($_smarty_tpl->tpl_vars['menus']->value['type']=='sub'&&$_smarty_tpl->tpl_vars['menus']->value['id']){?> checked<?php }?>>
					<label for="s_sub"> 弹出二级菜单</label>
				</div>
			</div>
			<div id="J_formWxreply"<?php if ($_smarty_tpl->tpl_vars['menus']->value['type']=='sub'&&$_smarty_tpl->tpl_vars['menus']->value['id']){?> class="hide"<?php }?>>
				<div class="form-group">
					<div class="ctl">
						<div class="wgt-tabs">
							<ul>
								<li class="tab">
									<label for="first[Which-one][0]"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==0){?> class="cur"<?php }?>>活动或商品</label>
									<input type="radio" name="first[Which-one]" id="first[Which-one][0]" value="0" class="hide"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==0){?> checked<?php }?>>
								</li>
								<li class="tab">
									<label for="first[Which-one][1]"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==1){?> class="cur"<?php }?>>链接</label>
									<input type="radio" name="first[Which-one]" id="first[Which-one][1]" value="1" class="hide"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==1){?> checked<?php }?>>
								</li>
								<li class="tab">
									<label for="first[Which-one][2]"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==2){?> class="cur"<?php }?>>文字</label>
									<input type="radio" name="first[Which-one]" id="first[Which-one][2]" value="2" class="hide"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==2){?> checked<?php }?>>
								</li>
								<li class="tab">
									<label for="first[Which-one][3]"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==3){?> class="cur"<?php }?>>图文消息</label>
									<input type="radio" name="first[Which-one]" id="first[Which-one][3]" value="3" class="hide"<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==3){?> checked<?php }?>>
								</li>
							</ul>
						</div>
						<div class="wgt-tabs-cont sub0<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']!=0){?> hide<?php }?>">
							<button type="button" class="J_selector btn btn-large"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['menus']->value['msg_data']['text'])===null||$tmp==='' ? "选择活动或商品" : $tmp);?>
</button>
							<input type="hidden" name="act_text[0]" value="<?php echo $_smarty_tpl->tpl_vars['menus']->value['msg_data']['text'];?>
">
							<input type="hidden" name="act_url[0]" value="<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==0){?>http://<?php echo smarty_modifier_regex_replace($_smarty_tpl->tpl_vars['menus']->value['msg_data']['url'],'/http:\/\//','');?>
<?php }?>">
						</div>
						<div class="wgt-tabs-cont sub1<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']!=1){?> hide<?php }?>">
							<input type="text" name="url[0]" value="<?php echo smarty_modifier_regex_replace($_smarty_tpl->tpl_vars['menus']->value['msg_data']['url'],'/http:\/\//','');?>
" class="input-text input-url">
						</div>
						<div class="wgt-tabs-cont sub2<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']!=2){?> hide<?php }?>"><?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==2){?>
                          <div class="text-kindeditor"><?php echo $_smarty_tpl->tpl_vars['menus']->value['content'];?>
</div>
                          <button type="button" class="J_text btn btn-large">编辑文字消息</button>
                          <input type="hidden" name="qq[0]" value="<?php echo rawurlencode($_smarty_tpl->tpl_vars['menus']->value['json']);?>
"><?php }else{ ?>
                          <button type="button" class="J_text btn btn-large">添加文字消息</button>
                          <input type="hidden" name="qq[0]" value=""><?php }?>
                        </div>
						<div class="wgt-tabs-cont sub3<?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']!=3){?> hide<?php }?>"><?php if ($_smarty_tpl->tpl_vars['menus']->value['first']['ww']==3){?>
                          <div class="imgtxt-wrap clearfix">
                            <div class="imgtxt-preview">
                              <h2>图文消息预览</h2>
                              <div class="preview-con">
                                <div class="preview-bd">
                                  <div class="preview-cover current">
                                    <div class="preview-cover-con">
                                        <img src="<?php echo (($tmp = @$_smarty_tpl->tpl_vars['menus']->value['msg_data'][0]['image'])===null||$tmp==='' ? "/src/img/w-cover.jpg" : $tmp);?>
" width="252" height="142" />
                                        <h3><?php echo (($tmp = @$_smarty_tpl->tpl_vars['menus']->value['msg_data'][0]['title'])===null||$tmp==='' ? "标题" : $tmp);?>
</h3>
                                    </div>
                                    <div class="cover-action">
                                      <a class="action-edit" href="javascript:;">编辑</a>
                                    </div>
                                  </div>
                                  <ul class="preview-list"><?php  $_smarty_tpl->tpl_vars['i'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['i']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['menus']->value['msg_data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['i']->key => $_smarty_tpl->tpl_vars['i']->value){
$_smarty_tpl->tpl_vars['i']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['i']->key;
?><?php if ($_smarty_tpl->tpl_vars['k']->value>0){?>
                                    <li>
                                      <div class="preview-list-item clearfix">
                                        <img src="<?php echo $_smarty_tpl->tpl_vars['i']->value['image'];?>
" width="49" height="49" />
                                        <h3><?php echo $_smarty_tpl->tpl_vars['i']->value['title'];?>
</h3>
                                      </div>
                                      <div class="list-action clearfix">
                                        <a class="action-sort" href="javascript:;">拖动排序</a>
                                        <a class="action-edit" href="javascript:;">编辑</a>
                                        <a class="action-del" href="javascript:;">删除</a>
                                      </div>
                                    </li><?php }?><?php } ?>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="button" class="J_news btn btn-large">编辑图文消息</button>
                          <input type="hidden" name="qq[0]" value="<?php echo rawurlencode($_smarty_tpl->tpl_vars['menus']->value['json']);?>
"><?php }else{ ?>
                          <button type="button" class="J_news btn btn-large">添加图文消息</button>
                          <input type="hidden" name="qq[0]" value=""><?php }?>
                        </div>
					</div>
				</div>
			</div>
			<div id="J_formWxsubmenu"<?php if ($_smarty_tpl->tpl_vars['menus']->value['type']=='view'||$_smarty_tpl->tpl_vars['menus']->value['type']=='click'||!$_smarty_tpl->tpl_vars['menus']->value['id']){?> class="hide"<?php }?>><?php if (!$_smarty_tpl->tpl_vars['menus']->value['sec']){?>
				<div class="form-group">
					<label for="sec[0][name]" class="ctl-label"><em>*</em>二级菜单：</label>
					<input type="text" name="sec[0][name]" id="sec[0][name]" value="" class="input-text required">
					<a href="#">删除此菜单</a>
				</div>
				<div class="form-group">
					<label for="sec[0][weight]" class="ctl-label">排序：</label>
					<input type="text" name="sec[0][weight]" id="sec[0][weight]" value="0" class="input-text number">
					<span class="help-inline">数字越小越排在前面</span>
				</div>
				<div class="form-group">
					<label for="" class="ctl-label"><em>*</em>回复内容：</label>
					<div class="wgt-tabs">
						<ul>
							<li class="tab">
								<label for="sec[0][Which-one][0]" class="cur">活动或商品</label>
								<input type="radio" name="sec[0][Which-one]" id="sec[0][Which-one][0]" value="0" class="hide" checked>
							</li>
							<li class="tab">
								<label for="sec[0][Which-one][1]">链接</label>
								<input type="radio" name="sec[0][Which-one]" id="sec[0][Which-one][1]" value="1" class="hide">
							</li>
							<li class="tab">
								<label for="sec[0][Which-one][2]">文字</label>
								<input type="radio" name="sec[0][Which-one]" id="sec[0][Which-one][2]" value="2" class="hide">
							</li>
							<!-- <li class="tab">
								<label for="sec[0][Which-one][3]">图文消息</label>
								<input type="radio" name="sec[0][Which-one]" id="sec[0][Which-one][3]" value="3" class="hide">
							</li> -->
						</ul>
					</div>
					<div class="wgt-tabs-cont sub0">
						<button type="button" class="J_selector btn btn-large">选择活动或商品</button>
						<input type="hidden" name="sec[0][act_text]" value="">
						<input type="hidden" name="sec[0][act_url]" value="">
					</div>
					<div class="wgt-tabs-cont sub1 hide">
						<input type="text" name="sec[0][url]" value="" class="input-text input-url">
					</div>
					<div class="wgt-tabs-cont sub2 hide">
                      <button type="button" class="J_text btn btn-large">添加文字消息</button>
                      <input type="hidden" name="sec[0][qq]" value="">
                    </div>
					<div class="wgt-tabs-cont sub3 hide">
                      <button type="button" class="J_news btn btn-large">添加图文消息</button>
                      <input type="hidden" name="sec[0][qq]" value="">
                    </div>
				</div><?php }else{ ?><?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['menus']->value['sec']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value){
$_smarty_tpl->tpl_vars['item']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['item']->key;
?>
				<div class="form-group">
					<label for="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][name]" class="ctl-label"><em>*</em>二级菜单：</label>
					<input type="text" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][name]" id="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][name]" value="<?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
" class="input-text required">
                    <input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][id]" value="<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
">
					<a href="#">删除此菜单</a>
				</div>
				<div class="form-group">
					<label for="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][weight]" class="ctl-label">排序：</label>
					<input type="text" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][weight]" id="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][weight]" value="<?php echo $_smarty_tpl->tpl_vars['item']->value['weight'];?>
" class="input-text number">
					<span class="help-inline">数字越小越排在前面</span>
				</div>
				<div class="form-group">
					<label for="" class="ctl-label"><em>*</em>回复内容：</label>
					<div class="wgt-tabs">
						<ul>
							<li class="tab">
								<label for="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][0]"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==0){?> class="cur"<?php }?>>活动或商品</label>
								<input type="radio" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one]" id="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][0]" value="0" class="hide"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==0){?> checked<?php }?>>
							</li>
							<li class="tab">
								<label for="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][1]"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==1){?> class="cur"<?php }?>>链接</label>
								<input type="radio" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one]" id="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][1]" value="1" class="hide"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==1){?> checked<?php }?>>
							</li>
							<li class="tab">
								<label for="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][2]"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==2){?> class="cur"<?php }?>>文字</label>
								<input type="radio" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one]" id="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][2]" value="2" class="hide"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==2){?> checked<?php }?>>
							</li>
							<!-- <li class="tab">
								<label for="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][3]"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==3){?> class="cur"<?php }?>>图文消息</label>
								<input type="radio" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one]" id="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][Which-one][3]" value="3" class="hide"<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==3){?> checked<?php }?>>
							</li> -->
						</ul>
					</div>
					<div class="wgt-tabs-cont sub0<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']!=0){?> hide<?php }?>">
						<button type="button" class="J_selector btn btn-large"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['item']->value['msg_data']['text'])===null||$tmp==='' ? '选择活动或商品' : $tmp);?>
</button>
						<input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][act_text]" value="<?php echo $_smarty_tpl->tpl_vars['item']->value['msg_data']['text'];?>
">
						<input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][act_url]" value="<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==0){?>http://<?php echo smarty_modifier_regex_replace($_smarty_tpl->tpl_vars['item']->value['msg_data']['url'],'/http:\/\//','');?>
<?php }?>">
					</div>
					<div class="wgt-tabs-cont sub1<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']!=1){?> hide<?php }?>">
						<input type="text" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][url]" value="<?php echo smarty_modifier_regex_replace($_smarty_tpl->tpl_vars['item']->value['msg_data']['url'],'/http:\/\//','');?>
" class="input-text input-url">
					</div>
					<div class="wgt-tabs-cont sub2<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']!=2){?> hide<?php }?>"><?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==2){?>
                      <div class="text-kindeditor"><?php echo $_smarty_tpl->tpl_vars['item']->value['content'];?>
</div>
                      <button type="button" class="J_text btn btn-large">编辑文字消息</button>
                      <input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][qq]" value="<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['json']);?>
"><?php }else{ ?>
                      <button type="button" class="J_text btn btn-large">添加文字消息</button>
                      <input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][qq]" value=""><?php }?>
                    </div>
					<div class="wgt-tabs-cont sub3<?php if ($_smarty_tpl->tpl_vars['item']->value['ww']!=3){?> hide<?php }?>"><?php if ($_smarty_tpl->tpl_vars['item']->value['ww']==3){?>
                      <div class="imgtxt-wrap clearfix">
                        <div class="imgtxt-preview">
                          <h2>图文消息预览</h2>
                          <div class="preview-con">
                            <div class="preview-bd">
                              <div class="preview-cover current">
                                <div class="preview-cover-con">
                                    <img src="<?php echo (($tmp = @$_smarty_tpl->tpl_vars['item']->value['msg_data'][0]['image'])===null||$tmp==='' ? "/src/img/w-cover.jpg" : $tmp);?>
" width="252" height="142" />
                                    <h3><?php echo (($tmp = @$_smarty_tpl->tpl_vars['item']->value['msg_data'][0]['title'])===null||$tmp==='' ? "标题" : $tmp);?>
</h3>
                                </div>
                                <div class="cover-action">
                                  <a class="action-edit" href="javascript:;">编辑</a>
                                </div>
                              </div>
                              <ul class="preview-list"><?php  $_smarty_tpl->tpl_vars['i'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['i']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['item']->value['msg_data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['i']->key => $_smarty_tpl->tpl_vars['i']->value){
$_smarty_tpl->tpl_vars['i']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['i']->key;
?><?php if ($_smarty_tpl->tpl_vars['k']->value>0){?>
                                <li>
                                  <div class="preview-list-item clearfix">
                                    <img src="<?php echo $_smarty_tpl->tpl_vars['i']->value['image'];?>
" width="49" height="49" />
                                    <h3><?php echo $_smarty_tpl->tpl_vars['i']->value['title'];?>
</h3>
                                  </div>
                                  <div class="list-action clearfix">
                                    <a class="action-sort" href="javascript:;">拖动排序</a>
                                    <a class="action-edit" href="javascript:;">编辑</a>
                                    <a class="action-del" href="javascript:;">删除</a>
                                  </div>
                                </li><?php }?><?php } ?>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="J_news btn btn-large">编辑图文消息</button>
                      <input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][qq]" value="<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['json']);?>
"><?php }else{ ?>
                      <button type="button" class="J_news btn btn-large">添加图文消息</button>
                      <input type="hidden" name="sec[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][qq]" value=""><?php }?>
                    </div>
				</div><?php } ?><?php }?>
				<div class="form-actions">
					<a href="#" class="ctl-label"><i class="iconfont">&#xe626;</i> 添加子菜单</a>
				</div>
			</div>
			<div class="form-actions">
				<input type="hidden" name="id" value="<?php echo $_smarty_tpl->tpl_vars['menus']->value['id'];?>
">
				<button type="submit" class="btn btn-primary">保存</button>
			</div>
		</form>
	</div>
</div>

  </div>
</div>

<?php echo $_smarty_tpl->getSubTemplate ("../Common/footer.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>



<script src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/jquery-ui.js" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/kindeditor/kindeditor.js" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/kindeditor/lang/zh_CN.js" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/jquery.uploadify.js" type="text/javascript"></script>
<script type="text/x-tpl" id="T_subAdd">
	<div class="form-group">
		<label for="sec[{{key}}][name]" class="ctl-label"><em>*</em>二级菜单：</label>
		<input type="text" name="sec[{{key}}][name]" id="sec[{{key}}][name]" value="" class="input-text required">
		<a href="#">删除此菜单</a>
	</div>
	<div class="form-group">
		<label for="sec[{{key}}][weight]" class="ctl-label">排序：</label>
		<input type="text" name="sec[{{key}}][weight]" id="sec[{{key}}][weight]" value="0" class="input-text number">
		<span class="help-inline">数字越小越排在前面</span>
	</div>
	<div class="form-group">
		<label for="" class="ctl-label"><em>*</em>回复内容：</label>
		<div class="wgt-tabs">
			<ul>
				<li class="tab">
					<label for="sec[{{key}}][Which-one][0]" class="cur">活动或商品</label>
					<input type="radio" name="sec[{{key}}][Which-one]" id="sec[{{key}}][Which-one][0]" value="0" class="hide" checked>
				</li>
				<li class="tab">
					<label for="sec[{{key}}][Which-one][1]">链接</label>
					<input type="radio" name="sec[{{key}}][Which-one]" id="sec[{{key}}][Which-one][1]" value="1" class="hide">
				</li>
				<li class="tab">
					<label for="sec[{{key}}][Which-one][2]">文字</label>
					<input type="radio" name="sec[{{key}}][Which-one]" id="sec[{{key}}][Which-one][2]" value="2" class="hide">
				</li>
			</ul>
		</div>
		<div class="wgt-tabs-cont sub0">
			<button type="button" class="J_selector btn btn-large">选择活动或商品</button>
			<input type="hidden" name="sec[{{key}}][act_text]" value="">
			<input type="hidden" name="sec[{{key}}][act_url]" value="">
		</div>
		<div class="wgt-tabs-cont sub1 hide">
			<input type="text" name="sec[{{key}}][url]" value="" class="input-text input-url">
		</div>
		<div class="wgt-tabs-cont sub2 hide">
          <button type="button" class="J_text btn btn-large">添加文字消息</button>
          <input type="hidden" name="sec[{{key}}][qq]" value="">
        </div>
		<div class="wgt-tabs-cont sub3 hide">
          <button type="button" class="J_news btn btn-large">添加图文消息</button>
          <input type="hidden" name="sec[{{key}}][qq]" value="">
        </div>
	</div>
</script>
<script type="text/x-tpl" id="T_wxNews">
  <div class="imgtxt-wrap clearfix">
    <div class="imgtxt-preview">
      <h2>图文消息预览</h2>
      <div class="preview-con">
        <div class="preview-bd">
          <div class="preview-cover current">
            <div class="preview-cover-con">
              {{#if msg_data.0.picurl}}
                <img src="{{msg_data.0.picurl}}" width="252" height="142" />
                <h3>{{msg_data.0.title}}</h3>
              {{else}}
                <img src="/src/img/w-cover.jpg" width="252" height="142" />
                <h3>标题</h3>
              {{/if}}
            </div>
            <div class="cover-action">
              <a class="action-edit" href="javascript:;">编辑</a>
            </div>
          </div>
          <ul class="preview-list">
            {{#each msg_data}}
              {{#ifCond @index '>' 0}}
                <li>
                  <div class="preview-list-item clearfix">
                    <img src="{{this.picurl}}" width="49" height="49" />
                    <h3>{{this.title}}</h3>
                  </div>
                  <div class="list-action clearfix">
                    <a class="action-sort" href="javascript:;">拖动排序</a>
                    <a class="action-edit" href="javascript:;">编辑</a>
                    <a class="action-del" href="javascript:;">删除</a>
                  </div>
                </li>
              {{/ifCond}}
            {{/each}}
          </ul>
        </div>
      </div>
    </div>
  </div>
</script>

<script>
	seajs.use(['p.event_selector','m.text_edit','m.imgtext'],function(Selector,Text,News){
		var tpls={
			subAdd: Handlebars.compile($('#T_subAdd').html()),
            wxNews: Handlebars.compile($('#T_wxNews').html())
		}
		$('#J_formWxmenu').on('change','[name="s"]',function(){
			if($(this).val()=='reply'){
				$('#J_formWxsubmenu').hide();
				$('#J_formWxreply').show();
			}else{
				$('#J_formWxreply').hide();
				$('#J_formWxsubmenu').show();
			}
		}).on('change','.tab input',function(){
			if($(this).prev().is('.cur'))
				return;
			$(this).parents('.wgt-tabs').find('.cur').removeClass('cur');
			$(this).prev().addClass('cur');
			$(this).parents('.wgt-tabs').nextAll('.sub'+$(this).val()).show().siblings('.wgt-tabs-cont').hide();
		}).on('click','.J_selector',function(){
			var $this=$(this);
			var selector=new Selector({
				data:{types:<?php echo $_smarty_tpl->tpl_vars['componentKeys']->value;?>
},
				onSave:function(data){
					$this.html(data.name).next().val(data.name).next().val(data.url);
				}
			});
		}).on('click','.J_text',function(){
            var $this=$(this),
                $elem=$(this).siblings('input'),
                data=$elem.val();
            if(data){
              data=decodeURIComponent(data);
              data=JSON.parse(data);
            }else{
              data={
                shop_id:'<?php echo $_smarty_tpl->tpl_vars['shop_id']->value;?>
'
              }
            }
            var dlg=$.dlg({
              title:'编辑文字消息',
              width:720,
              removeOnHide:true,
              draggable:true,
              html:$('<div id="J_wxText">')
            });
            new Text({
              content:$('#J_wxText'),
              width:'100%',
              data:data,
              types:<?php echo $_smarty_tpl->tpl_vars['componentKeys']->value;?>
,
              onSave:function(data){
                $this.prevAll().remove();
                $this.before($('<div class="text-kindeditor">'));
                $this.prevAll('.text-kindeditor').html(data.content);
                $this.html('编辑文字消息');
                data=JSON.stringify(data);
                data=encodeURIComponent(data);
                $elem.val(data);
                dlg.close();
              }
            });
        }).on('click','.J_news',function(){
            var $this=$(this),
                $elem=$(this).siblings('input'),
                data=$elem.val();
            if(data){
              data=decodeURIComponent(data);
              data=JSON.parse(data);
            }else{
              data={
                shop_id:'<?php echo $_smarty_tpl->tpl_vars['shop_id']->value;?>
'
              }
            }
            if(data.msg_data){
              for(var i=0;i<data.msg_data.length;i++){
                data.msg_data[i].picurl=data.msg_data[i].image||'';
                delete data.msg_data[i].image;
              }
            }
            var dlg=$.dlg({
              title:'编辑图文消息',
              width:800,
              removeOnHide:true,
              draggable:true,
              html:$('<div id="J_wxNews">')
            });
            $(function(){
              new News({
                content:$('#J_wxNews'),
                data:data,
                types:<?php echo $_smarty_tpl->tpl_vars['componentKeys']->value;?>
,
                onSave:function(data){
                  $this.prevAll('.imgtxt-wrap').remove();
                  $this.before(tpls.wxNews(data));
                  $this.html('编辑图文消息');
                  var d={}
                  d.shop_id=data.shop_id;
                  d.sorted_ids=data.sorted_ids||'';
                  d.msg_data=[];
                  for(var i=0;i<data.msg_data.length;i++){
                    d.msg_data[i]={
                      id:data.msg_data[i].itemId,
                      title:data.msg_data[i].title,
                      image:data.msg_data[i].picurl,
                      text:data.msg_data[i].text,
                      url:data.msg_data[i].url
                    }
                  }
                  d=JSON.stringify(d);
                  d=encodeURIComponent(d);
                  $elem.val(d);
                  dlg.close();
                }
              });
              dlg.moveCenter();
            });
        }).on('click','#J_formWxsubmenu .form-group a',function(e){
			e.preventDefault();
			var id=$(this).prev().attr('name').match(/sec\[(\d*)\]/)[1];
			$(this).parent().siblings().andSelf().filter(function(){
				return $(this).find('[name^="sec['+id+']"]').length>0;
			}).remove();
			if($('#J_formWxsubmenu [name^="sec"]').length<1){
				$('#J_formWxmenu [name="s"][value="reply"]').trigger("click");
				$('#J_formWxsubmenu .form-actions').before(tpls.subAdd({key:0}));
			}
		}).on('click','#J_formWxsubmenu .form-actions a',function(e){
			e.preventDefault();
			var id=0;
			$('#J_formWxsubmenu [name]').each(function(){
				if($(this).attr('name').match(/sec\[(\d*)\]/)[1]>id)
					id=$(this).attr('name').match(/sec\[(\d*)\]/)[1];
			});
			$('#J_formWxsubmenu .form-actions').before(tpls.subAdd({key:++id}));
			if($('#J_formWxsubmenu [name$="[name]"]').length<5)
				$('#J_formWxsubmenu .form-actions').show();
			else
				$('#J_formWxsubmenu .form-actions').hide();
		}).validate({
			submitHandler:function(form){
                $('[name]', form).filter(function(){
                  return $(this).attr('name').match(/qq/) && $(this).closest('.wgt-tabs-cont').is(':hidden');
                }).each(function(){
                  $(this).remove();
                });
				WD.ajaxForm(form,{
                    beforeSend:function(){
                      var data=this.data;
                      data=data.split('&');
                      var d={}
                      for(var i=0;i<data.length;i++){
                        var m=data[i].split('=');
                        d[decodeURIComponent(m[0])]=decodeURIComponent(m[1].replace(/\+/g,'%20'));
                      }
                      for(var name in d){
                        if(d[name]&&name.match(/qq/)){
                          d[name]=decodeURIComponent(d[name]);
                          d[name]=JSON.parse(d[name]);
                          if(d[name].content){
                            d[name]={
                              content:d[name].content
                            }
                          }else{
                            d[name].items=d[name].msg_data;
                            delete d[name].msg_data;
                          }
                          d[name]=JSON.stringify(d[name]);
                        }
                        if(d[name]&&name.match(/url/))
                          d[name]=d[name].indexOf('http://')<0?'http://'+d[name]:d[name];
                        var match=name.match(/^sec\[(\d+)\]/);
                        if(d[name]&&match)
                          d['sec['+match[1]+'][parent_id]']=d.id;
                      }
                      this.data=$.param(d);
                    },
					success:function(){
				      location.href='/admin/weixin/menu';
					}
				});
			}
		});
	});
</script>

</body>
</html>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:58
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/product.html" */ ?>
<?php if ($_valid && !is_callable('content_5612186e0fcd5')) {function content_5612186e0fcd5($_smarty_tpl) {?><div class="side-navs">
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
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:58
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/weixin.html" */ ?>
<?php if ($_valid && !is_callable('content_5612186e11e6d')) {function content_5612186e11e6d($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>微信菜单
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('weixin_basic','weixin_auto','weixin_menu','weixin_attention','weixin_message','weixin_keyword','weixin_addmenu'))){?>class="cur"<?php }?> href="/admin/weixin/menu">微信菜单管理</a></li>
    </ul>
  </div>
</div>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:58
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/user.html" */ ?>
<?php if ($_valid && !is_callable('content_5612186e142e8')) {function content_5612186e142e8($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>会员管理
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('user_lists'))){?>class="cur"<?php }?> href="/admin/user/lists">会员列表</a></li>
    </ul>
  </div>
</div>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 14:27:58
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Shop/common/weixin_tabs.html" */ ?>
<?php if ($_valid && !is_callable('content_5612186e170de')) {function content_5612186e170de($_smarty_tpl) {?><div class="wgt-tabs">
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