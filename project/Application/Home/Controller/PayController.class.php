<?php
namespace Home\Controller;
//use Think\Controller;
use Home\Controller\PubController;

class PayController extends PubController {
    public function index() {
        $user = session('user');
        $this->assign('user', $user);
        $this->display();
    }
}
