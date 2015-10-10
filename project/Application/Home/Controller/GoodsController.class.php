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
                $item['d_status'] = 'normal';
                if($item['due_at'] < time()) {
                    $item['d_status'] = 'dued';
                }elseif(($item['due_at'] - time()) < 86400) {
                    $item['d_status'] = 'soon_due';
                }
                
                $item['url'] = $item['s_url']?$item['s_url']:'http://i.vtshow.top/show/' . $item['id'];
                $item['vurl'] = 'http://i.vtshow.top/show/' . $item['id'];
               
            }
        }
        $this->assign('items', $items);
        $this->assign('user', $user);
        $this->display();
    }
}
