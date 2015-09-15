<?php
namespace Home\Controller;
//use Think\Controller;
use Home\Controller\PubController;

class PayController extends PubController {
    public function index() {
        $user = session('user');
        $user['id'] = \Common\Lib\Idhandler::encode($user['id']);
        $this->assign('user', $user);
        $this->display();
    }

    public function success() {
        $user = session('user');
        $user['id'] = \Common\Lib\Idhandler::encode($user['id']);
        $this->assign('user', $user);
        $this->display();
    }
}
