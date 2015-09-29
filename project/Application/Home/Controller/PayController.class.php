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
        $out_trade_no = \Common\Lib\Idhandler::decode($_GET['out_trade_no']);
        
        $trade_no = $_GET['trade_no'];
        
        $trade_status = $_GET['trade_status'];
        \Common\Lib\Utils::log('trade', 'alipay.log', $_GET);
        
        if($_GET['trade_status'] == 'TRADE_FINISHED' || $_GET['trade_status'] == 'TRADE_SUCCESS') {
            $tradeMdl = D('Trade');
            $params = array('id' => $out_trade_no, 'status' => 'success', 'pay_from' => 'taobao', 'pay_no' => $trade_no, 'paid_at' => time(), 'updated_at' => time(), 'pay_user' => $_GET['buyer_email']);

            \Common\Lib\Utils::log('trade', 'alipay.log', $params);
            $res = $tradeMdl->saveData($params);
            \Common\Lib\Utils::log('trade', 'alipay.log', $res);
            if($res['status'] == 'success') {
                $trade = $tradeMdl->getRow(array('id' => $out_trade_no));
                \Common\Lib\Utils::log('trade', 'alipay.log', $trade);
                //更新用户的due_at    
                $level = $trade['level'];
                $level_str = '';
                switch($level) {
                    case '1':
                        $due_at = time() + 5 * 86400;
                        $level_str = '银牌会员';
                        break;
                    case '2':
                        $due_at = time() + 30 * 86400;
                        $level_str = '金牌会员';
                        break;
                    default:
                        break;
                }

                $userMdl = D('User');
                $uparams['id'] = $trade['user_id'];
                $uparams['due_at'] = $due_at;

                \Common\Lib\Utils::log('trade', 'alipay.log', $uparams);
                $res = $userMdl->saveData($uparams);
                    
                \Common\Lib\Utils::log('trade', 'alipay.log', $res);
                //更新有效商品的时间
                $sql = "update items set due_at = $due_at where user_id = {$trade['user_id']} and due_at > " . time();

                \Common\Lib\Utils::log('trade', 'alipay.log', $sql);
                $res = $tradeMdl->execute($sql);

                \Common\Lib\Utils::log('trade', 'alipay.log', $res);
                $this->assign('level', $level_str);
            }
        }else {
            $this->assign('error', '支付失败');
        }
        		
        $this->display();
    }
}
