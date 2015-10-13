<?php
namespace Home\Controller;
//use Think\Controller;
use Home\Controller\PubController;

class EventsController extends PubController {
    public function share() {
        $source = $_GET['source']?$_GET['source']:'';
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
        
        if(!$source) {
            $this->redirect('/home/events/index?source=' . $user['id']);
            exit();
        }
        
        $shareMdl = D('Share');
        $curr_profile = 0;
        if($source == $user['id']) {
            $curr_profile = 1;
            $useruplogMdl = D('Useruplog');
            $useruplog = $useruplogMdl->getRow(array('user_id' => $id, 'up' => 'share'));
            $hasup = false;
            if($useruplog) {
                $hasup = true; 
            }

            $shareCount = $shareMdl->getCount(array('source' => \Common\Lib\Idhandler::decode($source), 'subscribe' => 1));

            $res = $userMdl->uplevel($id, '2');
            if($res) {
                $hasup = true; 
            }

            $this->assign('hasup', $hasup);
            $this->assign('share_count', $shareCount);
        }else{
            $params['source']  = \Common\Lib\Idhandler::decode($source);   
            $params['user_id'] = $id;
            $shareRes = $shareMdl->getRow($params);
            if(!$shareRes) {
                $params['subscribe'] = 0;
                $params['created_at'] = time();
                $params['updated_at'] = time();
                $shareMdl->saveData($params);
            }
                 
        }

        $this->assign('curr_profile', $curr_profile);
        $this->assign('user', $user);

        $this->display();
    }
}
