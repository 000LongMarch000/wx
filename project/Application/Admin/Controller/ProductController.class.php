<?php
namespace Admin\Controller;
use Admin\Controller\AdminController;

class ProductController extends AdminController {

    public function __construct(){
        parent::__construct();
        $this->assign('menu', 'product');
        $this->assign('mLeft', 'product_' . strtolower(ACTION_NAME));
    }

    public function add() {
        if($_POST) {
            $productMdl = D('Items');
            $p = I('post.');
            $url = $p['url'];
            $due_at = strtotime($p['due_at']);

            $url_arr = parse_url($url);
            $type = '';
            $host = $url_arr['host'];
            if(preg_match('/tmall.com/', $host) || preg_match('/taobao.com/', $host)) {
                $type = 'taobao';
            }elseif(preg_match('/jd.com/', $host)) {
                $type = 'jd';
            }
            
            $nid = '';
            if($type == 'taobao') {
                if($url_arr['query']) {
                    $url_arr['query'] = htmlspecialchars_decode($url_arr['query']);
                    parse_str($url_arr['query'], $query); 
                    $nid = $query['id'];
                }
            }elseif($type == 'jd') {
                $path = $url_arr['path'];
                if($path){
                    $nid = substr($path, 1, strlen($path) - 6);
                }
            }

            if($nid) {
                //判断是否已经生成
                $itemRes = $productMdl->getRow(array('nid' => $nid)); 
            }else{
                $itemRes = $productMdl->getRow(array('url' => $content)); 
            }
            
            if($itemRes) {
                $params['id'] = $itemRes['id'];
                $params['url'] = $url;
                $params['due_at'] = $due_at;
                $params['updated_at'] = time();
                $productMdl->saveData($params);
                $id = $itemRes['id'];
            }else{
                $params['url'] = $url;
                $params['nid'] = $nid;
                $params['platform'] = $type;
                $params['created_at'] = time();
                $params['updated_at'] = time();
                $params['due_at'] = $due_at;
                $res = $productMdl->saveData($params);
                if($res['status'] == 'success') {
                    $id = $res['data'];
                } 
            }  

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
        $productId = \Common\Lib\Idhandler::decode($_GET['id']);
        $productsMdl = D('Items');
        $filter = array('id' => $productId);
        $product = $productsMdl->getRow($filter);

        if ($_POST) {
            $p = I('post.');
            $url = $p['url'];
            $due_at = strtotime($p['due_at']);

            $id = $_POST['id'];
            $itemRes = $productsMdl->getRow(array('id' => $id)); 
            
            if($itemRes) {
                $params['id'] = $itemRes['id'];
                $params['url'] = $url;
                $params['due_at'] = $due_at;
                $params['updated_at'] = time();
                $productsMdl->saveData($params);
                $id = $itemRes['id'];
                $this->redirect('/admin/product/lists');
            }
            echo "保存出错";
            exit();
        }

        $this->assign('act', 'edit');
        $this->assign('product', $product);

        //时间控件写入当前时间
        $this->assign('curr_time', time() * 1000);
        $this->display('Product/add');
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

        $productMdl = D('Items');
        $userMdl = D('User');
        $filter = array();

        //处理搜索问题
        $fValue = '';
        if(isset($_GET['f']) && in_array($_GET['f'], array('id'))){
             $field = $_GET['f'];
             $fValue = trim(urldecode($_GET['q']));

             if ('id' == $field) {
                 $filter['id'] = \Common\Lib\Idhandler::decode($fValue);
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

        $count = $productMdl->getCount($filter);
        $utils = new \Common\Lib\Utils();
        $pagination = $utils->pagination($count, C('PAGE_LIMIT'));

        $products = $productMdl->getList($filter, C('PAGE_LIMIT'), $page, $order);

        $hosts = C('LOCALHOST');
        if($products){
            foreach($products as &$p){
                $p['id'] = \Common\Lib\Idhandler::encode($p['id']);
                $user = array(); 
                if($p['uid'] > 0) {
                    $user = $userMdl->getRow(array('id' => $p['uid']));
                    $user['id'] = \Common\Lib\Idhandler::encode($user['id']);
                }
                $p['user'] = $user;
                $p['product_url'] = $hosts. 'show/' . $p['id'];
            }
        }

        $this->assign('count', $count);
        $this->assign('page', $pagination);
        $this->assign('products', $products);
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

