<?php
namespace Home\Controller;
use Think\Controller;
class ShowController extends Controller {
    public function index() {
        $id = $_GET['id'];
        if($id) {
            $itemsMdl = D('Items');
            $id = \Common\Lib\Idhandler::decode($id);
            $item = $itemsMdl->getRow(array('id' => $id));
            $itemsMdl->saveData(array('id' => $id, 'visits' => $item['visits'] + 1));
            $this->assign('item', $item);
        }
 
        $this->display();
    }
}
