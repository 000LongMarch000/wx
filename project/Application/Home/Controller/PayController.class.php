<?php
namespace Home\Controller;
//use Think\Controller;
use Home\Controller\PubController;

class PayController extends PubController {
    public function index() {
        $uid = $_GET['uid'];
        $this->display();
    }
}
