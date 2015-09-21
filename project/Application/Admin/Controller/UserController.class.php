<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;

class UserController extends AdminController {

    public function __construct(){
        parent::__construct();
        $this->assign('menu', 'user');
        $this->assign('mLeft', 'user_' . strtolower(ACTION_NAME));
    }

    public function add() {
        if($_POST) {
            $userMdl = D('User');
            $p = I('post.');
            $nickname = $p['nickname'];
            $due_at = strtotime($p['due_at']);
            $params['nickname'] = $p['nickname'];
            $params['due_at'] = $p['due_at'];
            $params['due_at'] = $p['due_at'];

            if($id) {
                $this->redirect('/admin/product/lists');
            }
            echo "保存出错了";
            exit();

        }

        //时间控件写入当前时间
        $this->assign('curr_time', time() * 1000 );
        $this->display();
    }

    public function edit() {
        $userId = \Common\Lib\Idhandler::decode($_GET['id']);
        $usersMdl = D('User');
        $filter = array('id' => $userId);
        $user = $usersMdl->getRow($filter);

        if ($_POST) {
            $p = I('post.');
            $nickname = $p['nickname'];
            $level = $p['level'];
            $due_at = strtotime($p['due_at']);

            $id = $_POST['id'];
            $itemRes = $usersMdl->getRow(array('id' => $id)); 
            
            if($itemRes) {
                $params['id'] = $itemRes['id'];
                $params['nickname'] = $nickname;
                $params['level'] = $level;
                $params['due_at'] = $due_at;
                $params['updated_at'] = time();
                $usersMdl->saveData($params);
                $id = $itemRes['id'];
                $this->redirect('/admin/user/lists');
            }
            echo "保存出错";
            exit();
        }

        $this->assign('act', 'edit');
        $this->assign('user', $user);

        //时间控件写入当前时间
        $this->assign('curr_time', time() * 1000);
        $this->display('User/add');
    }

    public function save() {
        $encodeProductId = trim($_GET['id']);
        $productId = \Common\Lib\Idhandler::decode($encodeProductId);
        $productsMdl = D('Items');

        $filter = array('id' => $productId);
        $product = $productsMdl->getRow($filter);

        $product['product_url'] = C('LOCALURL') .'show/'. \Common\Lib\Idhandler::encode($productId);

        $utils = new \Common\Lib\Utils();

        $this->assign('product', $product);
        $this->assign('encodeProductId', $encodeProductId);
        $this->display();
    }

    public function lists() {
        $page = isset($_GET['p'])?$_GET['p']:1;

        $userMdl = D('User');
        $filter = array();

        //处理搜索问题
        $fValue = '';
        if(isset($_GET['f']) && in_array($_GET['f'], array('id'))){
             $field = $_GET['f'];
             $fValue = trim(urldecode($_GET['q']));

             if ('id' == $field) {
                 $filter['id'] = \Common\Lib\Idhandler::decode($fValue);
             }elseif ('nickname' == $field) {
                 $filter['nickname'] = array('like', '%'.trim($fValue).'%');
             }
        }

        $this->assign('field', $field);
        $this->assign('fv', $fValue);

        //处理排序问题
        $order = 'updated_at desc';
        if(isset($_GET['order']) && $_GET['order']){
             $order = str_replace('_', ' ', $_GET['order']);
        }

        $orderArr = explode(' ', $order);

        $this->assign('order', $orderArr);

        $count = $userMdl->getCount($filter);
        $utils = new \Common\Lib\Utils();
        $pagination = $utils->pagination($count, C('PAGE_LIMIT'));

        $users = $userMdl->getList($filter, C('PAGE_LIMIT'), $page, $order);

        foreach($users as &$user) {
            $user['id'] = \Common\Lib\Idhandler::encode($user['id']);
        }

        $this->assign('count', $count);
        $this->assign('page', $pagination);
        $this->assign('users', $users);
        $this->display();
    }

    public function del(){
        header('Content-type: application/json');
        $ids = $_POST['id'];
        if (!$ids) {
            echo json_encode(array('status' => 'error', 'msg' => '请选择要删除的商品'));
            exit;
        }

        $productsMdl = D('Items');
        $productsMdl->startTrans();

        $idArr = explode(',', $ids);

        $res = true;
        $current = time();

        foreach ($idArr as $id) {
            $id = \Common\Lib\Idhandler::decode($id);
            $filter = array('id' => $id);
            $product = $productsMdl->getRow($filter);
            if (!$product) {
                $productsMdl->rollback();
                echo json_encode(array('status' => 'error', 'msg' => '非法操作'));
                exit;
            }
        }

        foreach ($idArr as $id) {
            $id = \Common\Lib\Idhandler::decode($id);
            $rs = $productsMdl->delete($id);
            $res = $res & $rs;
        }

        if ($res) {
            $productsMdl->commit();
            echo json_encode(array('status' => 'success'));
            exit;
        }
        else {
            $productsMdl->rollback();
            echo json_encode(array('status' => 'error', 'msg' => '非法操作'));
            exit;
        }
    }

    public function findstrbykey($ua, $key) {
        $len = strlen($key);
        $start = strpos($ua, $key);

        $pos = strpos($ua, '&', $start + $len + 1);

        return substr($ua, $start + $len, $pos - $len - $start);
    }
}

