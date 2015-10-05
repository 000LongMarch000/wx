<?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:05:48
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/User/lists.html" */ ?>
<?php /*%%SmartyHeaderCode:1213218639561218675f0118-76483536%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0aeca8522813b8441eb12f3bbab0579fc0af58c2' => 
    array (
      0 => '/usr/share/nginx/wx/project/Application/Admin/View/User/lists.html',
      1 => 1444028254,
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
  ),
  'nocache_hash' => '1213218639561218675f0118-76483536',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.6',
  'unifunc' => 'content_56121867813a5',
  'variables' => 
  array (
    'assets_path' => 0,
    'DEBUG' => 0,
    'menu' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56121867813a5')) {function content_56121867813a5($_smarty_tpl) {?><?php if (!is_callable('smarty_function_autover')) include '/usr/share/nginx/wx/ThinkPHP/Library/Vendor/Smarty/plugins/function.autover.php';
if (!is_callable('smarty_modifier_date_format')) include '/usr/share/nginx/wx/ThinkPHP/Library/Vendor/Smarty/plugins/modifier.date_format.php';
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
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/product.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '1213218639561218675f0118-76483536');
content_5612214c57f41($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/product.html" */?>
    <?php }elseif($_smarty_tpl->tpl_vars['menu']->value=='weixin'){?>
        <?php /*  Call merged included template "../Common/side_nav/weixin.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/weixin.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '1213218639561218675f0118-76483536');
content_5612214c5a986($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/weixin.html" */?>
    <?php }elseif($_smarty_tpl->tpl_vars['menu']->value=='user'){?>
        <?php /*  Call merged included template "../Common/side_nav/user.html" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("../Common/side_nav/user.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0, '1213218639561218675f0118-76483536');
content_5612214c5d2ff($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /*  End of included template "../Common/side_nav/user.html" */?>
    <?php }?>
    
  </div>

  <div class="main-cont">
    
<div class="page-header">
  <h2 class="page-title">会员列表</h2>
</div>

<div class="cont-wrap cont-wrap-list">
  <div class="data-list-toolbar">
    <div class="search-bar search-bar-upper">
      <form action="/admin/user/lists/search/y" method="get">
        <select name="f" class="wgt-select" width="100">
            <option value="id" <?php if ($_smarty_tpl->tpl_vars['field']->value=='id'){?> selected <?php }?>>会员编号</option>
            <option value="id" <?php if ($_smarty_tpl->tpl_vars['field']->value=='nickname'){?> selected <?php }?>>会员昵称</option>
        </select>
        <input name="q" type="text" class="input-search" placeholder="输入搜索内容" value="<?php echo $_smarty_tpl->tpl_vars['fv']->value;?>
">
        <button class="btn" type="submit">搜索</button>
      </form>
    </div>
  </div>
  <div id="J_goodsList" class="data-list list-skin-1">
    <table>
      <thead>
        <tr>
          <th class="col-goods-media"><div class="cell">会员编号</div></th>
          <th><div class="cell">openid</div></th>
          <th><div class="cell">昵称</div></th>
          <th><div class="cell">等级</div></th>
          <th><div class="cell">创建时间</div></th>
          <th><div class="cell">过期时间</div></th>
          <th><div class="cell">操作</div></th>
        </tr>
      </thead>
      <tbody>
        <?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['users']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value){
$_smarty_tpl->tpl_vars['item']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['item']->key;
?>
        <tr id="g_<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
" data-id="<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
">
          <td><div class="cell">
              <?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>

          </div></td>
          <td><div class="cell">
               <?php echo $_smarty_tpl->tpl_vars['item']->value['openid'];?>

          </div></td>
          <td><div class="cell">
               <?php echo $_smarty_tpl->tpl_vars['item']->value['nickname'];?>

          </div></td>
          <td><div class="cell">
               <?php if ($_smarty_tpl->tpl_vars['item']->value['level']=='2'){?>银牌<?php }elseif($_smarty_tpl->tpl_vars['item']->value['level']=='3'){?>金牌<?php }else{ ?>暂无<?php }?>
          </div></td>
          <td><div class="cell">
               <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['item']->value['created_at'],"%Y-%m-%d %H:%M");?>

          </div></td>
          <td><div class="cell">
               <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['item']->value['due_at'],"%Y-%m-%d %H:%M");?>

          </div></td>
          <td><div class="cell opts">
            <a href="/admin/user/edit/id/<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
">编辑</a>
          </div></td>
        </tr>
        <?php } ?>
      </tbody>
    </table>
  </div>

  <?php echo $_smarty_tpl->tpl_vars['page']->value;?>

</div>


  </div>
</div>

<?php echo $_smarty_tpl->getSubTemplate ("../Common/footer.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>



<script id="T_goodsListEdit" type="text/x-tpl">
<form id="J_formGoodsListEdit" class="form">
  <div class="form-group">
    <label class="ctl-label">改价方式：</label>
    <select name="type" class="select">
      <option value="0">减价</option>
      <option value="1">涨价</option>
      <option value="2">一口价</option>
    </select>
  </div>
  <div class="form-group">
    <div class="ctl J_toggle">打 <input type="text" name="value" class="input-text input-mini required number" min="0.1" max="9.9" decimal="1" value=""> 折 <span class="help-inline">必须大于0，精确到0.1</span></div>
    <div class="ctl hide J_toggle">涨 <input type="text" name="value" class="input-text input-mini required number" min="0.1" decimal="1" value=""> 倍 <span class="help-inline">必须大于0，精确到0.1</span></div>
    <div class="ctl hide J_toggle">一口价：<input type="text" name="value" class="input-text input-small required number" min="0.01" decimal="2" value=""> 元 <span class="help-inline">必须大于0，精确到0.01</span></div>
    <div class="help-block">一旦确定， 改价方式将不能修改。只能修改本页选中的价格。</div>
  </div>
  <div class="form-actions">
    <button type="submit" class="btn btn-primary">确定</button>
    <button type="button" class="btn btn-close">取消</button>
  </div>
</form>
</script>
<script src="<?php echo $_smarty_tpl->tpl_vars['assets_path']->value;?>
/js/libs/plupload/plupload.full.min.js"></script>
<script>
seajs.use(['p.goods_list'], function(app){
  app.init();
});
</script>

</body>
</html>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:05:48
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/product.html" */ ?>
<?php if ($_valid && !is_callable('content_5612214c57f41')) {function content_5612214c57f41($_smarty_tpl) {?><div class="side-navs">
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
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:05:48
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/weixin.html" */ ?>
<?php if ($_valid && !is_callable('content_5612214c5a986')) {function content_5612214c5a986($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>微信菜单
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('weixin_basic','weixin_auto','weixin_menu','weixin_attention','weixin_message','weixin_keyword','weixin_addmenu'))){?>class="cur"<?php }?> href="/admin/weixin/menu">微信菜单管理</a></li>
    </ul>
  </div>
</div>
<?php }} ?><?php /* Smarty version Smarty-3.1.6, created on 2015-10-05 15:05:48
         compiled from "/usr/share/nginx/wx/project/Application/Admin/View/Common/side_nav/user.html" */ ?>
<?php if ($_valid && !is_callable('content_5612214c5d2ff')) {function content_5612214c5d2ff($_smarty_tpl) {?><div class="side-navs">
  <div class="nav-sec">
    <div class="hd">
      <i class="ico ico-nav-shop"></i>会员管理
    </div>
    <ul class="navs">
      <li><a <?php if (in_array($_smarty_tpl->tpl_vars['mLeft']->value,array('user_lists'))){?>class="cur"<?php }?> href="/admin/user/lists">会员列表</a></li>
    </ul>
  </div>
</div>
<?php }} ?>