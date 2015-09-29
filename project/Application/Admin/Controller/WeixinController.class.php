<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;

class WeixinController extends AdminController {

    public $weixin;

    public function __construct(){
        parent::__construct();
        $this->assign('menu', 'weixin');
        $this->assign('mLeft', 'weixin_' . strtolower(ACTION_NAME));
        $this->weixin = C('WEIXIN');    
    }

    public function index() {
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);

        $local = C('LOCAL_URL');

        $toShopId = $encodeShopId;
        $this->assign('shop_id', $shopId);
        $this->assign('k', 'index');
        $this->assign('website_qr_code','http://qr.wdwd.com/qr?size=144&txt='.$local.'shop/'.$toShopId);
        $this->assign('share_qr_code',$local.'shop/'.$toShopId);

        $this->assign('mLeft', 'weixin_auto');
        $this->display();
    }

    public function basic(){
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);

        $weixinMdl = D('Weixin');
        $weixin = $weixinMdl->getByShopId($shopId);

        if(empty($weixin['url'])){
            //$weixin['url']= 'http://'.C('SITE_URL')."/wxin.php?nid=".$shop_id;
            //$weixin['url']= "http://www.sandbox.wdwd.com/wxin.php?nid=".$shop_id;
            $weixin['url'] = C('SITE_URL') . 'wxin.php?nid='.$encodeShopId;
        }
        if(empty($weixin['token'])){
            $weixin['token']=md5($weixin['url']);
        }

        $this->assign('k', 'basic');
        $this->assign('wx_list', $weixin);
        $this->assign('backurl', '/admin/weixin/basic');
        $this->display();
    }

    public function wxSave(){
        header('Content-type: application/json');
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);
        $data = $_POST;

        if($data['admin_name'] == ''){
            echo json_encode(array('error' => 'true','msg' => '微信号不能为空'));
            exit();
        }

        if($data['admin_uname'] == ''){
            echo json_encode(array('error' => 'true','msg' => '微信号名称不能为空'));
            exit();
        }

        if($data['admin_email'] == ''){
            echo json_encode(array('error' => 'true','msg' => '微信号登录邮箱不能为空'));
            exit();
        }

        if($data['appid']!='' && $data['appsecret']!= ''){
            $wechat = new \Common\Lib\Wechat();
            $access_token = $wechat->checkAuth($data['appid'], $data['appsecret']);
            if(!$access_token){
                echo json_encode(array('error'=>'true','msg'=>'appid,appsecret填写不正确，请重新填写'));exit;
            }
        }

        $data['shop_id'] = $shopId;

        $weixinMdl = D('Weixin');

        $res = $weixinMdl->saveData($shopId, $data);

        echo json_encode($res);
        die();

    }

    public function auto(){
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);
        $weixinMdl = D('Weixin');
        $weixin = $weixinMdl->getByShopId($shopId);

        $this->assign('wxin', $weixin);
        $this->assign('k', 'auto');
        $this->display();
    }

    public function menu(){
        $menuMdl = D('Menu');
        $wxin_info_check = false;

        if($this->weixin['appid']!='' && $this->weixin['appsecret']!= ''){
            $wechat = new \Common\Lib\Wechat();
            $access_token = $wechat->checkAuth($this->weixin['appid'], $this->weixin['appsecret']);
            if($access_token){
                $wxin_info_check = true;
            }
        }

        $list = $menuMdl->getList(0);
        $count = count($list);
        if($count > 0){
            foreach($list as $key=>$val){
                $list[$key]['msg_data'] = unserialize(@$val['msg_data']);
                $sec_list = $menuMdl->getList($shopId, $val['id']);

                if($sec_list){
                    foreach ($sec_list as $s_k => $s_v) {
                        $sec_list[$s_k]['msg_data'] = unserialize($s_v['msg_data']);
                    }
                }
                $list[$key]['sec'] = $sec_list;
            }
        }

        $this->assign('menus', $list);
        $this->assign('count', $count);

        $this->assign('wxin', $this->weixin);
        $this->assign('k', 'menu');
        $this->assign('wxin_info_check', $wxin_info_check);
        $this->display();
    }

    public function fans(){
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);
        $weixinMdl = D('Weixin');
        $weixin = $weixinMdl->getByShopId($shopId);

        $this->assign('wxin', $weixin);
        $this->display();
    }

    public function msg_setting($act) {
        $wmsgMdl = D('Message');
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);
        $data = $wmsgMdl->getRow($shopId, $act);

        $data['msg_info_type'] = $data['msg_info_type'] ? $data['msg_info_type'] : '1';
        if($data['msg_info_type']==2){
            $data['msg_data'] = unserialize($data['msg_data']);
            unset($data['content']);
        }else{
            unset($data['msg_data']);
        }
        $data['count'] = (@count($data['msg_data'])>1)?count($data['msg_data']):1;

        $data['msg_type'] = $act;
        $data['shop_id'] = $shopId;
        $this->assign('weixin', $data);
        $this->assign('weixin1', json_encode($data));
        if( (@$_GET['type']==1 || !@$_GET['type'])){
            $html_url = 'Weixin:weixin_attention';
        }else if($_GET['type']==2 || $data['msg_info_type']==2){
            $html_url = 'Weixin:weixin_attention_tw';
        }

        $componentKeys = $this->get_list($params);

        $this->assign('componentKeys', $componentKeys);
        $this->assign('act', $act);
        $this->display($html_url);
    }

    /**
     * 配置关注自动回复
     */
    public function attention(){
        $act = ACTION_NAME;
        $this->msg_setting($act);
    }

    /**
     * 配置信息自动回复
     */
    public function message(){
        $act = ACTION_NAME;
        $this->msg_setting($act);
    }


    public function addMenu(){
        $menuMdl = D('Menu');

        $id = 0;
        if (isset($_GET['id']) && $_GET['id']) {
            $id = $_GET['id'];
        }
        $menu = $menuMdl->getRow($id);

        if ($menu) {
            $menu['msg_data'] = $menu['msg_data']?unserialize($menu['msg_data']):array();
            $sec_list = $menuMdl->getList($menu['id']);
            if (!$sec_list) {
                if ($menu['type'] == 'view') {
                    if (isset($menu['msg_data']['text']) && $menu['msg_data']['text']) {
                        $menu['first']['ww'] = 0;
                    }
                    else {
                        $menu['first']['ww'] = 1;
                    }
                }
                elseif ($menu['type'] == 'click') {
                    if($menu['msg_info_type'] == '1'){
                        $menu['first']['ww'] = 2;
                    }else{
                        $menu['first']['ww'] = 3;
                    }
                }
            }else{
                foreach ($sec_list as $key => $value) {
                    if($value['msg_data']){
                        $sec_list[$key]['msg_data'] = unserialize($value['msg_data']);
                    }

                    if ($value['type'] == 'view') {
                        if (isset($sec_list[$key]['msg_data']['text']) && $sec_list[$key]['msg_data']['text']) {
                            $sec_list[$key]['ww'] = 0;
                        }
                        else {
                            $sec_list[$key]['ww'] = 1;
                        }
                    }
                    elseif ($value['type'] == 'click') {
                        if($value['msg_info_type'] == '1'){
                            $sec_list[$key]['ww'] = 2;
                        }else{
                            $sec_list[$key]['ww'] = 3;
                        }
                    }
                    $sec_list[$key]['json'] = json_encode($sec_list[$key]);
                }
            }
            $menu['sec'] = $sec_list;
            $menu['sec_count'] = count($sec_list);
            /*echo "<pre>";
            print_r($menu);
            echo "</pre>";*/
        }else{
            $menu = array();
        }

        if($id && count($menu) == 0){
            echo "您不能修改此菜单";
            exit();
        }

        $menu['json'] = json_encode($menu);
        $this->assign('menus', $menu);
        $this->assign('k', 'menu');
        //获取有权限的组件

        $componentKeys = $this->get_list($params);
        $this->assign('componentKeys', $componentKeys);
        $this->assign('backurl','/admin/weixin/menu');
        $this->display('Weixin:weixin_menu1');
    }

    function deleteMenu(){
        $menuMdl = D('Menu');

        header('Content-type: application/json');
        $id = (int)$_GET['id'];
        if(!$id){
            echo json_encode(array('status' => 'error', 'msg' => 'id不能未空'));
            exit;
        }

        $f_rs = $menuMdl->deleteOp($id);
        if(!$f_rs){
            echo json_encode(array('status' => 'error', 'msg' => '操作失败'));
            exit;
        }
        $s_row = $menuMdl->getList($id);
        foreach ($s_row as $s_k => $s_v) {
            $s_rs = $menuMdl->delete($id);
            if (!$s_rs) {
                echo json_encode(array('status' => 'error', 'msg' => '操作失败'));
                exit;
            }
        }

        $weixinMdl = D('Weixin');
        $rs = $menuMdl->selectMenu($this->weixin);
        if($rs){
            echo json_encode(array('status' => 'success', 'msg' => '操作成功'));
            exit;
        }else{
            echo json_encode(array('status' => 'error', 'msg'=>'操作失败'));
            exit;
        }
    }

    /**
     * 配置菜单 保存
     */
    function saveMenu(){
        header('Content-type: application/json');
        $url = '/admin/weixin/menu';

        $menuMdl = D('Menu');

        $data = $_POST;
        $first = $menuMdl->getList(0);
        $first_count = count($first);

        if ($first_count >= 3 && !$data['id']) {
            echo json_encode(array('status'=>'error','msg'=>'最多添加3个一级菜单'));exit;
        }
        if (isset($data['sec'])) {
            $sec_count = count($data['sec']);
            if($data['sec'] && $sec_count>5){
                echo json_encode(array('status'=>'error','msg'=>'最多添加5个二级菜单'));exit;
            }
        }
        $first_len = strlen($data['name']);
        if ($first_len>16) {
            echo json_encode(array('status'=>'error','msg'=>'一级菜单最多16个字符'));exit;
        }

        $weixinMdl = D('Weixin');

        if(isset($data['id']) && $data['id']) $loc_info['id'] = (int)$data['id'];
        $loc_info['name'] = $data['name'];
        $loc_info['weight'] = (int)$data['weight'];
        $loc_info['parent_id'] = 0;
        $loc_info['active_state'] = 0;
        $loc_info['keyword_type'] = 'get';
        $loc_info['original_id'] = $info['original_id'];
        $loc_info['msg_type'] = 'menu';
        $loc_info['content'] = '';

        //先保存到本地
        if ($data['s']=='reply') {
            //回复内容
            $loc_info['type'] = 'view';
            if($data['first']['Which-one']=='2' || $data['first']['Which-one']=='3'){
                $loc_info['type'] = 'click';
            }
            if($data['first']['Which-one']=='0'){
                $loc_info['msg_data'] = serialize(array('text'=>$data['act_text'][0],'url'=>$data['act_url'][0]));
                $loc_info['msg_info_type'] = '0';
            }
            if($data['first']['Which-one']=='1'){
                $loc_info['msg_data'] = serialize(array('url'=>$data['url'][0]));
                $loc_info['msg_info_type'] = '0';
            }
            if($data['first']['Which-one']=='2'){
                $qq = json_decode(str_replace('\n', '', $data['qq'][0]),true);
                if($qq['content']){
                    $content = htmlspecialchars((string)$qq['content'],ENT_QUOTES);
                    if(isset($content{601})){
                        echo json_encode(array('status'=>'error','msg'=>'文字回复内容请调整到600字以内'));exit;
                    }
                    $loc_info['msg_info_type'] = '1';
                    $loc_info['content'] = $qq['content'];
                }
            }
            if($data['first']['Which-one']=='3'){
                $qq = json_decode(str_replace('\n', '', $data['qq'][0]),true);
                if($qq['items']){
                    foreach($qq['items'] as &$qi){
                        if(!$qi['picurl'] && $qi['image']){
                            $qi['picurl'] = $qi['image'];
                        }
                    }
                    $loc_info['msg_info_type'] = '2';
                    if($qq['sorted_ids']&&count($qq['items'])>1){
                        $loc_info['sorted_ids'] = $qq['sorted_ids'];
                        $ids = explode(',', $loc_info['sorted_ids']);
                        $loc_info['msg_data'] = $this->multi_array_sort($qq['items'],$ids);
                    }else{
                        $loc_info['msg_data'] = $qq['items'];
                    }

                    $loc_info['msg_data'] = serialize($loc_info['msg_data']);
                }
            }

            if (!$menuMdl->saveData($loc_info)) {
                echo json_encode(array('status' => 'error', 'msg' => '保存一级菜单失败'));
                exit;
            }
            if(!empty($data['sec'])){
                foreach($data['sec'] as $key=>$val){
                    if($val['parent_id'] && $val['id'] && !$val['name']){
                        $menuMdl->deleteOp($val['id']);
                        unset($data['sec'][$key]);
                        continue;
                    }
                }
            }
        }elseif($data['s']=='sub'){
            $loc_info['type'] = 'sub';
            //$loc_info['type'] = $data['first']['Which-one']=='2'?'click':'view';
            $loc_info['msg_info_type'] = '0';
            $loc_info['msg_data'] = '';
            //$rs = $wmenu_mdl->doUpdate($loc_info);
            $rs = $menuMdl->saveData($loc_info);

            if(!$rs){
                echo json_encode(array('status'=>'error','msg'=>'保存一级菜单失败'));exit;
            }

            //检查提交的内容是否有问题
            if(isset($data['sec']) && is_array($data['sec'])){
                foreach ($data['sec'] as $key => $val) {
                    $sec_len = strlen($val['name']);
                    if($sec_len>40){
                        echo json_encode(array('status'=>'error','msg'=>'二级菜单标题最多40个字符'));exit;
                    }
                    if($val['Which-one']=='2'){
                        $qq = json_decode(str_replace('\n', '', $val['qq']),true);
                        if($qq['content']){
                            $content = htmlspecialchars((string)$qq['content'],ENT_QUOTES);
                            if(isset($content{601})){
                                echo json_encode(array('status'=>'error','msg'=>'文字回复内容请调整到600字以内'));exit;
                            }
                        }
                    }
                }
            }

            //先删除已有的
            $rs_del = $menuMdl->deleteByPid($loc_info['id']);
            if(!$rs_del){
                \Common\Lib\Utils::log('wechat', 'wechat.log', '删除失败');
                echo json_decode(array('status'=>'error','msg'=>'保存失败'));
                exit();
            }
            unset($loc_info['id']);
            //开始创建新提交的内容
            foreach ($data['sec'] as $key => $val) {
                $loc_info['name'] = $val['name'];
                $loc_info['weight'] = (int)$val['weight'];
                $loc_info['parent_id'] = $rs;
                $loc_info['type'] = $val['Which-one']=='2'?'click':'view';

                if($val['Which-one']=='0'){
                    $loc_info['msg_data'] = serialize(array('text'=>$val['act_text'],'url'=>$val['act_url']));
                    $loc_info['msg_info_type'] = '0';
                }
                if($val['Which-one']=='1'){
                    $loc_info['msg_data'] = serialize(array('url'=>$val['url']));
                    $loc_info['msg_info_type'] = '1';
                }
                if($val['Which-one']=='2'){
                    $qq = json_decode(str_replace('\n', '', $val['qq']),true);
                    $loc_info['msg_info_type'] = '0';

                    if($qq['content']){
                        unset($loc_info['msg_data']);
                        $loc_info['msg_info_type'] = '1';
                        $loc_info['content'] = $qq['content'];
                    }
                }
                if($val['Which-one']=='3'){
                    $qq = json_decode(str_replace('\n', '', $val['qq']),true);
                    $loc_info['msg_info_type'] = '0';
                    if($qq['items']){
                        foreach($qq['items'] as &$qi){
                            if(!$qi['picurl'] && $qi['image']){
                                $qi['picurl'] = $qi['image'];
                            }
                        }
                        unset($loc_info['content']);
                        $loc_info['msg_info_type'] = '2';
                        if($qq['sorted_ids']&&count($qq['items'])>1){
                            $loc_info['sorted_ids'] = $qq['sorted_ids'];
                            $ids = explode(',', $qq['sorted_ids']);
                            $loc_info['msg_data'] = $this->multi_array_sort($qq['items'],$ids);
                        }else{
                            $loc_info['msg_data'] = $qq['items'];
                        }

                        $loc_info['msg_data'] = serialize($loc_info['msg_data']);
                    }
                }

                if(!$menuMdl->saveData($shopId, $loc_info)){
                    echo json_encode(array('status'=>'error','msg'=>'保存二级菜单失败'));exit;
                }

                unset($loc_info['id']);
            }
        }
        $rs = $menuMdl->selectMenu($this->weixin);

        //$logfile = RUNTIME_PATH . 'Logs/request.log';
        //error_log(json_encode($rs) . "\n", 3, $logfile);
        \Common\Lib\Utils::log('wechat', 'wechat.log', $rs);

        if($rs['status']=='success'){
            echo json_encode(array('status' => 'success'));exit;
        }else{
            echo json_encode(array('status'=>'error','msg'=>'保存失败'));exit;
        }
    }

    function filterData(&$data,$type){
        $data and $this->filterArray($data,$type);
    }

    function filterArray(&$data,$type){
        foreach ($data as $key => $value) {
            if( is_array($value) ){
                $this->filterArray($data[$key],$type);
            }else{
                $data[$key] = $this->filter($this->htmltotxt(urldecode($value)),$type);
            }
        }
    }

    /**
    * 获取有权限的组件列表
    */
    function get_list($params){
        /*
        $data = array();
        foreach($this->componentKeys as $key=>$val){
            if(!in_array($key, array('prism', 'open'))){
                $data[$key] = $val;
            }
        }
        return $data;
         */
        $data = array();
        foreach($this->componentKeys as $key=>$val){
            if(isset($val['open_url']) && $val['open_url']){
                $open_url = $val['open_url'];
            }else{
                $open_url = '/admin/data/getactive?id=' . $key;
            }
            $data[] = array('key' => $key, 'name' => $val['name'], 'url' => $open_url);
        }
        return json_encode($data);
    }

    /**
     * 配置信息自动回复 保存
     */
    public function msgSave(){
        header('Content-type: application/json');
        $wmsg_mdl = D('Message');

        $info = $_POST;
        $info['active_state'] = '0';
        if ($info['msg_info_type']==2) {
            unset($info['linked']);
            if($info['sorted_ids']) {
                $ids = explode(',', $info['sorted_ids']);
                if (count($info['msg_data']) > 1) {
                    $info['msg_data'] = $this->multi_array_sort_new($info['msg_data'],$ids);
                }
            }

            $info['msg_data'] = serialize($info['msg_data']);
            $info['content'] = '';
        }
        else {
            $info['msg_data'] = '';
            $content = htmlspecialchars_decode((string)$info['content'],ENT_QUOTES);
            $info['content'] = $content;
        }

        $res = $wmsg_mdl->saveData($info);

        echo json_encode($res);
        exit();
    }

    /**
     * 关键词自动回复
     */
    function keyword() {
        $keywordMdl = D('Keyword');

        $data = array();
        $data = $keywordMdl->getList();
        $this->assign('weixin', $data);
        $this->assign('weixin1', json_encode($data));
        $this->assign('weixin1', json_encode($data));
        $this->display('Weixin:weixin_keyword');
    }

    public function addKeyword(){
        $keywordMdl = D('Keyword');

        //获取有权限的组件
        $componentKeys = $this->get_list($params);
        $this->assign('componentKeys', $componentKeys);
        //end
        $this->assign('count', 1);
        $this->assign('backurl', '/admin/weixin/keyword');
        $this->display('Weixin:weixin_keyword1');
    }

    public function editKeyword(){
        $keywordMdl = D('Keyword');

        $id = $_GET['id'];

        $list = $keywordMdl->getRow($id);
        if(isset($list['msg_info_type']) && ($list['msg_info_type'] == '2')) $this->pagedata['active'] = 1;
        if(isset($list['msg_data'])) $list['msg_data'] = unserialize($list['msg_data']);
        $this->assign('weixin', $list);
        $this->assign('weixin1', json_encode($list));

        //获取有权限的组件
        $componentKeys = $this->get_list($params);
        $this->assign('componentKeys', $componentKeys);
        $this->assign('count', isset($list['msg_data']) ? count($list['msg_data']) : 1);
        $this->assign('backurl', '/admin/weixin/keyword');
        $this->display('Weixin:weixin_keyword1');
    }

    public function deleteKeyword(){
        $keywordMdl = D('Keyword');
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);

        $id = (int)$_GET['id'];

        $res = $keywordMdl->deleteById($id);

        header('Location: '.C('SITE_URL').'admin/weixin/keyword');
    }

    public function saveKeyword(){
        header('Content-type: application/json');

        $keywordMdl = D('Keyword');
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);

        $data = $_POST;

        $data['msg_keyword'] = strtolower(trim($data['msg_keyword']));
        $params = array(
            'shop_id' => $shopId,
            'msg_keyword' => $data['msg_keyword'],
            'id' => $data['id'],
        );

        if(!$keywordMdl->checkKeyword($params)){
            echo json_encode(array('error'=>'true','msg'=>'关键词重复，请重新添加'));exit;
        }

        $info['id'] = $data['id'];
        $info['msg_keyword'] = $data['msg_keyword'];
        $info['keyword_type'] = 'get';//get：发送被动响应消息 post:发送客服消息
        $info['active_state'] = '0';
        $info['shop_id'] = $shopId;
        if($data['which']=='0') {
            $info['msg_info_type']='1';
            $info['content'] = htmlspecialchars_decode((string)$data['text']['content'],ENT_QUOTES);
            $info['msg_data'] = '';
        }else{
            $info['msg_info_type'] = "2";
            //$info['sorted_ids'] = $data['sorted_ids'];
            $info['msg_data'] = $data['msg_data'];
            if ($data['sorted_ids']) {
                $ids = explode(',', $data['sorted_ids']);
                //unset($data['img']['sorted_ids'],$data['img']['editing_id']);
                if (count($data['msg_data']) > 1) {
                    $info['msg_data'] = $this->multi_array_sort_new($data['msg_data'],$ids);
                }
            }
            $info['content'] = '';
            $info['msg_data'] = serialize($info['msg_data']);
        }

        $res = $keywordMdl->saveData($info);

        echo json_encode($res);
        exit();
    }


    function multi_array_sort($arr,$shortKey)
    {
        if(isset($arr[0]) && $arr[0]){
            $new[0] = $arr[0];
        }else{
            $new[1] = $arr[1];
        }
        foreach ($shortKey as $k => $v) {
            $new[$v] = $arr[$v];
        }
        return $new;
    }

    function multi_array_sort_new($arr,$shortKey)
    {
        foreach ($shortKey as $k => $v) {
            $new[$k] = $arr[$v];
        }
        return $new;
    }

}
