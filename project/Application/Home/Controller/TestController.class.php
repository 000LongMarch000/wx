<?php
namespace Home\Controller;
use Think\Controller;
class TestController extends Controller {
    public function index() {
        $id = $_GET['id'];
        $due = false;
        if($id) {
            $itemsMdl = D('Items');
            $id = \Common\Lib\Idhandler::decode($id);
            $item = $itemsMdl->getRow(array('id' => $id));
            $itemsMdl->saveData(array('id' => $id, 'visits' => $item['visits'] + 1));
            $this->assign('item', $item);
            if($item['due_at'] < time()) {
                $due = true;
            }
        }

        $this->assign('due', $due);

        $app = '';
        $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        if(strpos($agent, 'iphone')) {
            $app ='ios';
        }
        $this->assign('app', $app); 
        $this->display();
    }
}
