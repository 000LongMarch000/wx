<?php
namespace Home\Controller;
//use Think\Controller;
use Home\Controller\PubController;

class GoodsController extends PubController {
    public function index() {
        $user = session('user');
        if($user) {
            $userMdl = D('User');
            $userRes = $userMdl->getRow(array('id' => $user['id']));
            if($userRes) {
                $user = $userRes;
                session('user', $user);
            }
        }

        $id = $user['id'];
        $user['id'] = \Common\Lib\Idhandler::encode($user['id']);

        $itemMdl = D('Items');
        $items = $itemMdl->getList(array('uid' => $id), 1000, 1 , 'created_at desc');
        if($items) {
            foreach($items as &$item) {
                $item['id'] = \Common\Lib\Idhandler::encode($item['id']);
            }
        }
        $this->assign('items', $items);
        $this->assign('user', $user);
        $this->display();
    }
}
