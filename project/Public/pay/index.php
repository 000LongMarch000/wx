<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>支付宝即时到账交易</title>
</head>
<?php
error_reporting(E_ERROR);

require_once("alipay.config.php");
require_once("lib/alipay_submit.class.php");
include_once("../lib/log.php");

$total_fee = NULL;
$out_trade_no = NULL;
if(!isset($_POST['out_trade_no'])){
   echo "订单错误，请返回重新购买";
   exit;
}

$t_id = $_POST['out_trade_no'];

//$product['quantity'] = 100;
//$product['amount'] = 0.01;

$price = 0.00;
if(isset($_POST['total_fee']) && $_POST['total_fee'] > 0){
    $price = $_POST['total_fee'];
}else{
    echo "充值金额有误！";
    exit;
}

$o_status = true;
if($o_status){
//构造要请求的参数数组
$parameter = array(
    "service"           => "create_direct_pay_by_user",
    //"service"           => "mobile.securitypay.pay",
    "partner"           => trim($alipay_config['partner']),
    "payment_type"      => trim($alipay_config['payment_type']),
    "notify_url"        => trim($alipay_config['notify_url']),
    "return_url"        => trim($alipay_config['return_url']),
    "seller_email"      => trim($alipay_config['seller_email']),
    "out_trade_no"      => $t_id,
    "subject"           => trim($_POST['subject']),
    "total_fee"         => $price,
    "body"              => $_POST['body'],
#   "show_url"          => $show_url,
#   "anti_phishing_key" => $anti_phishing_key,
#   "exter_invoke_ip"   => $exter_invoke_ip,
    "_input_charset"    => trim(strtolower($alipay_config['input_charset']))
);


//建立请求
$alipaySubmit = new AlipaySubmit($alipay_config);
$html_text = $alipaySubmit->buildRequestForm($parameter,"get", "确认");
echo $html_text;
}else{
   echo '链接数据库出错，请稍后操作';
   exit;
}
?>

</body>
</html>
