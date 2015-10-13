<?php
namespace Common\Model;
use Think\Model;
class UserModel extends Model {
    public function __construct() {
        parent::__construct();
    }

    public function getRow($filter, $lock = false) {
        if ($lock) {
            $row = $this->lock(true)->where($filter)->find();
        }
        else {
            $row = $this->where($filter)->find();
        }
        return $row;
    }

    public function getList($filter, $limit=10, $page=1, $order="update_time desc") {
        $row = $this->where($filter)->limit($limit)->page($page)->order($order)->select();
        return $row;
    }

    public function getCount($filter) {
        $row = $this->where($filter)->count();
        return $row;
    }

    public function saveData($data) {
        if($this->create($data)){
            if(isset($data['id']) && $data['id']){
                $this->save();
                return array('status' => 'success', 'msg' => '修改保存成功');
            }else{
                $id = $this->add();
                return array('status' => 'success', 'msg' => '创建成功', 'data' => $id);
            }
        }else{
            return array('status' => 'fail', 'msg' => $this->getError());
        }
    }

    public function uplevel($user_id, $level, $up='share'){
        $flag =  false;
        if($user_id) {
            $shareMdl = D('Share');
            $useruplogMdl = D('Useruplog');
            if(!($useruplogMdl->getRow(array('user_id' => $user_id, 'up' => $up))))
            $shareCount = $shareMdl->getCount(array('source' => $user_id, 'subscribe' => 1));
            if($shareCount >= 10) {
                $user = $this->getRow(array('id' => $user_id));
                if($user) {
                    $due_at = $user['due_at']; 
                    if($due_at < time()) {
                        $due_at = time();
                    }
                    
                    switch($level) {
                        case '2':
                            $due_at += 7 * 86400;
                            break;
                        case '3':
                            $due_at += 30 * 86400;
                            break;
                        default:
                            break;
                    }
                    $this->saveData(array('id' => $user_id, 'due_at' => $due_at, 'updated_at' => time()));

                    $sql = "update items set due_at = $due_at where uid = $user_id and due_at > " . time();

                    $this->execute($sql);

                    $useruplogMdl->saveData(array('user_id' => $user_id, 'up' => 'share' , 'created_at' => time()));
                
                    $flag = true;
                }
            }
        }
        return $flag; 
    }
}
