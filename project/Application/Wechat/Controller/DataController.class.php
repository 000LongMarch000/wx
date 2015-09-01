<?php
namespace Wechat\Controller;
use \Think\Controller;

class DataController extends Controller {

    public function __construct(){
        parent::__construct();
    }
    
    public function oauth(){
        //$_GET['url'] = "http://m.action.wdwd.com?aaaxx=xxxx&bbbb=xxx";
        $referrerUri = $_GET['url'];
        if(!$referrerUri){
            echo "参数错误";
            exit();
        }

        //$hosts = array('action.wdwd.com', 'm.action.wdwd.com');
        $hosts = array('action.wdwd.com', 'm.action.wdwd.com', 'action.sandbox.wdwd.com', 'm.action.sandbox.wdwd.com', '192.168.82.42', '192.168.82.74', 'action.dev.wdwd.com', 'm.action.dev.wdwd.com', 'action.test.wdwd.com', 'm.action.test.wdwd.com');
        $url = parse_url($referrerUri); 

        if(!in_array($url['host'], $hosts)){
            echo "非法请求";
            exit();
        }

        $state = base64_encode($referrerUri);
        #$redirectUri = 'http://www.sandbox.wdwd.com/admin/data/login';
        #$redirectUri = 'http://wdwd.com/admin/data/login';
        $redirectUri = 'http://wdwd.com/wechat/data/login'; 

        $wechat = new \Common\Lib\Wechat(C('WX_OAUTH'));
        $authorizeUrl = $wechat->getOauthRedirect($redirectUri, $state, 'snsapi_base');
        header('Location: ' . $authorizeUrl);
        exit; 
    }
     

    public function login() {
        $wechat = new \Common\Lib\Wechat(C('WX_OAUTH'));
        $token = $wechat->getOauthAccessToken();

        if (!(isset($token['access_token']) && $token['access_token'])) {
            exit('登录失败');
        }

        $wechat = array(
            'token' => $token,
        );

        session('wechat', $wechat);

        //signpackage 写入redis
        $wxConfig = C('WX_OAUTH');
        $jssdk = new \Common\Lib\Jssdk($wxConfig['appid'], $wxConfig['appsecret']);
        $signPackage = $jssdk->GetSignPackage();
        session('signpackage', $signPackage);

        $redis = new \Redis(); 
        $redisConfig = C('REDIS_CONFIG');
        $redis->connect($redisConfig['host'], $redisConfig['port']); 
        $redis->select($redisConfig['db']);
        $redis->set('wx_signpackage_'.$token['openid'], json_encode($signPackage));
        $redis->set('wx_oauth_code_'.$token['openid'], $_GET['code']);
        $redis->set('wx_oauth_state_'.$token['openid'], $_GET['state']);
        //已写入redis
     
        setcookie('wxopenid', $wechat['token']['openid'], time() + 600, '/', 'wdwd.com');
        $_COOKIE['wxopenid'] = $wechat['token']['openid'];

        //$_GET['state'] = base64_encode('http://wdwd.com/aaa/bbb');
        if ($_GET['state']) {
            $url = base64_decode($_GET['state']);
            $url_arr = explode('?', $url);

            $token = "token=".$token['access_token'];
            if(count($url_arr) > 1){
                $new_url = $url.'&'. $token;
            }else{
                $new_url = $url.'?'. $token;
            }
            header('Location: ' . $new_url);
            exit;
        }
    }

}

