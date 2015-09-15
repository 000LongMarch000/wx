<?php
namespace Common\Model;
use Think\Model;
class TradeModel extends Model {
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

    public function getList($filter, $limit=10, $page=1, $order="updated_at desc") {
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
}
