<?php
namespace Home\Controller;
use Think\Controller;
class PayController extends Controller {
    public function index() {
        $uid = $_GET['uid'];
 
        $this->display();
    }
}
