<?php
namespace Pay\Controller;
use Pay\Controller\CommonController;
class AlipayController extends CommonController {
    public function __construct() {
        parent::__construct();
        vendor('Alipay.Corefunction');
        vendor('Alipay.Md5function');
        vendor('Alipay.Notify');
        vendor('Alipay.Submit');
    }
    
    public function index() {
        $user_id = $_GET['user'];
        $level = $_GET['level'];
        if(!$user_id || !$level) {
            echo "参数错误";
            exit();
        }

        $this->assign('user_id', $user_id);
        $this->assign('level', $level);
        $this->display();
    }

    public function buy() {
        $level = $_GET['level'];
        $user_id = $_GET['user_id'];
        if(!$user_id || !$level || !in_array($level, array('1','2'))) {
            echo "参数错误";
            exit();
        }

        $product = array();
        switch($level) {
            case '1':
                $product['title'] = '银牌会员';
                $product['desc'] = '欢迎您成为银牌会员';
                $product['price'] = '0.01';
                break;
            case '2':
                $product['title'] = '金牌会员';
                $product['desc'] = '欢迎您成为金牌会员';
                $product['price'] = '0.01';
                break;
            default:
                break;
        }

        //生成订单
        $current = time();
        $tradeMdl = D('Trade');
        $data = array(
            'user_id' => \Common\Lib\Idhandler::decode($user_id),
            'level' => $level,
            'price' => $product['price'],
            'status' => 'pending',
            'pay_from' => '',
            'created_at' => $current,
            'updated_at' => $current,
        );

        $trade = $tradeMdl->saveData($data);
        $trade_id = '';
        if($trade['status'] == 'success'){
            $trade_id = \Common\Lib\Idhandler::encode($trade['data']);
        }else{
            echo "创建订单失败";
            exit();
        }

        //生成交易链接
        $sHtml = "<form id='buyfrm' name='buyfrm' action='http://wechat.shopflow.cn/pay/alipay/pay' method='post'>";
        $sHtml.= "<input type='hidden' name='out_trade_no' value='" . $trade_id . "'/>";
        $sHtml.= "<input type='hidden' name='subject' value='" . $product['title'] . "'/>";
        $sHtml.= "<input type='hidden' name='total_fee' value='" . $product['price'] . "'/>";
        $sHtml.= "<input type='hidden' name='body' value='" . $product['desc'] . "'/>";
        $sHtml.= "<input type='hidden' name='show_url' value='http://wechat.shopflow.cn/home/pay/index' />";

		//submit按钮控件请不要含有name属性
        $sHtml = $sHtml."<input type='submit' value='确认'></form>";
		$sHtml = $sHtml."<script>document.forms['buyfrm'].submit();</script>"; 
        echo $sHtml;
        exit;
    }

    public function pay() {
        $alipay_config = C('ALIPAY_CONFIG');
        //防钓鱼时间戳
        $anti_phishing_key = "";
        //若要使用请调用类文件submit中的query_timestamp函数
        //客户端的IP地址
        $exter_invoke_ip = $_SERVER["REMOTE_ADDR"]; 
        //构造要请求的参数数组，无需改动
        $parameter = array(
        	"service" => "create_direct_pay_by_user",
        	"partner" => $alipay_config['partner'],
        	"seller_email" => $alipay_config['seller_email'],
        	"payment_type" => C('ALIPAY_SETTING.payment_type'),
        	"notify_url" => C('ALIPAY_SETTING.notify_url'),
        	"return_url" => C('ALIPAY_SETTING.return_url'),
        	"out_trade_no" => trim($_POST['out_trade_no']),
        	"subject" => trim($_POST['subject']),
        	"total_fee"	=> trim($_POST['total_fee']),
        	"body" => trim($_POST['body']),
        	"show_url" => trim($_POST['show_url']),
        	"anti_phishing_key"	=> $anti_phishing_key,
        	"exter_invoke_ip" => $exter_invoke_ip,
        	"_input_charset" => $alipay_config['input_charset']
        );

        //建立请求
        $alipaySubmit = new \AlipaySubmit($alipay_config);
        $html_text = $alipaySubmit->buildRequestForm($parameter,"get", "确认");
        echo $html_text;
        exit;
    }

    public function notify() {
        \Common\Lib\Utils::log('alipay', 'notify.log', $_POST);
        $alipay_config = C('ALIPAY_CONFIG');
        $alipayNotify = new \AlipayNotify($alipay_config);
        $verify_result = $alipayNotify->verifyNotify();
        
        if ($verify_result) {//验证成功
        	$out_trade_no = $_POST['out_trade_no'];
        	$trade_no = $_POST['trade_no'];
        	$trade_status = $_POST['trade_status'];
            if ($_POST['trade_status'] == 'TRADE_FINISHED') {
        		//判断该笔订单是否在商户网站中已经做过处理
        			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
        			//如果有做过处理，不执行商户的业务程序
        				
        		//注意：
        		//退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
        
                //调试用，写文本函数记录程序运行情况是否正常
                //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
            }
            else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {
        		//判断该笔订单是否在商户网站中已经做过处理
        			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
        			//如果有做过处理，不执行商户的业务程序
        				
        		//注意：
        		//付款完成后，支付宝系统发送该交易状态通知
        
                //调试用，写文本函数记录程序运行情况是否正常
                //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
            }
        
        	//——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
                
        	echo "success";		//请不要修改或删除
        }
        else {
            //验证失败
            echo "fail";
        
            //调试用，写文本函数记录程序运行情况是否正常
            //logResult("这里写入想要调试的代码变量值，或其他运行的结果记录");
        }
    }

    public function back() {
        \Common\Lib\Utils::log('alipay', 'back.log', $_GET);
        $alipay_config = C('ALIPAY_CONFIG');
        //计算得出通知验证结果
        $alipayNotify = new \AlipayNotify($alipay_config);
        $verify_result = $alipayNotify->verifyReturn();
        if ($verify_result) {//验证成功
        	//请在这里加上商户的业务逻辑程序代码
        	
        	//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
            //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表
        
        	//商户订单号
        	$out_trade_no = \Common\Lib\Idhandler::decode($_GET['out_trade_no']);
        
        	//支付宝交易号
        	$trade_no = $_GET['trade_no'];
        
        	//交易状态
        	$trade_status = $_GET['trade_status'];
            \Common\Lib\Utils::log('trade', 'alipay.log', $_GET);
        
            if($_GET['trade_status'] == 'TRADE_FINISHED' || $_GET['trade_status'] == 'TRADE_SUCCESS') {
                $tradeMdl = D('Trade');
                $params = array('id' => $out_trade_no, 'status' => 'success', 'pay_from' => 'taobao', 'pay_no' => $trade_no, 'paid_at' => time(), 'updated_at' => time());

                \Common\Lib\Utils::log('trade', 'alipay.log', $params);
                $res = $tradeMdl->saveData($params);
                \Common\Lib\Utils::log('trade', 'alipay.log', $res);
                if($res['status'] == 'success') {
                    $trade = $tradeMdl->getRow(array('id' => $out_trade_no));
                    \Common\Lib\Utils::log('trade', 'alipay.log', $trade);
                    //更新用户的due_at    
                    $level = $trade['level'];
                    switch($level) {
                        case '1':
                            $due_at = time() + 5 * 86400;
                            break;
                        case '2':
                            $due_at = time() + 30 * 86400;
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

                    echo "<script>localtion.href='/home/pay/success'</script>";
                    exit();
                }
        		//判断该笔订单是否在商户网站中已经做过处理
        			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
        			//如果有做过处理，不执行商户的业务程序
            }
            else {
              echo "trade_status=".$_GET['trade_status'];
            }
        		
        	echo "验证成功<br />";
        
        	//——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
        	
        	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
        else {
            //验证失败
            //如要调试，请看alipay_notify.php页面的verifyReturn函数
            echo "验证失败";
        }
        exit();
    }
}
