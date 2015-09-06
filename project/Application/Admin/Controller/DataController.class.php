<?php
namespace Admin\Controller;
use \Think\Controller;

class DataController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function login() {
        $wechat = new \Common\Lib\Wechat(C('WX_OAUTH'));
        $token = $wechat->getOauthAccessToken();
        if (!$token) {
            exit('登录失败');
        }

        $wechat = array(
            'token' => $token,
        );
        session('wechat', $wechat);

        //signpackage 写入redis
        $wxConfig = C('WX_OAUTH');
        //$jssdk = new \Common\Lib\Jssdk($wxConfig['appid'], $wxConfig['appsecret']);
        //$signPackage = $jssdk->GetSignPackage();
        //session('signpackage', $signPackage);

        $redis = new \Redis(); 
        $redisConfig = C('REDIS_CONFIG');
        $redis->connect($redisConfig['host'], $redisConfig['port']); 
        $redis->select($redisConfig['db']);
        
        $redis_sandbox = new \Redis(); 
        $redisSandboxConfig = C('REDIS_SANDBOX_CONFIG');
        $redis_sandbox->connect($redisSandboxConfig['host'], $redisSandboxConfig['port']); 
        $redis_sandbox->select($redisSandboxConfig['db']);
        

        $wechatData = array(
            'access_token' => $token['access_token'],
            'code' => $_GET['code'],
            'state' => $_GET['state'],
        );
        //$redis->set('wx_signpackage_'.$token['openid'], json_encode($signPackage));
        $redis->set('wx_oauth_'.$token['openid'], json_encode($wechatData));

        $redis_sandbox->set('wx_oauth_'.$token['openid'], json_encode($wechatData));
        //token 写入redis
        /*
        $redis = new \Redis(); 
        $redisConfig = C('REDIS_CONFIG');
        $redis->connect($redisConfig['host'],$redisConfig['port']); 
        $redis->select($redisConfig['db']);

        $redis->setex('wx_'.$token['openid'], 86400 * 10, $token['token']);
         */

        //setcookie('wx_openid', $wechat['token']['openid'], 0, '/', 'wdwd.com');
        //$_COOKIE['wx_openid'] = $wechat['token']['openid'];
     
        //setcookie('wxopenid', $wechat['token']['openid'], time() + 600, '/', 'wdwd.com');
        setcookie('wxopenid', $wechat['token']['openid'], 0, '/', 'wdwd.com');
        $_COOKIE['wxopenid'] = $wechat['token']['openid'];

        if ($_GET['state']) {
            $url = base64_decode($_GET['state']);
            header('Location: ' . $url);
            exit;
        }
    }
}

