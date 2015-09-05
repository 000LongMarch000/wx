<?php
namespace Admin\Controller;
use \Think\Controller;

class DataController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function login() {
        $wechat = new \Common\Lib\Wechat(C('WEIXIN'));
        $token = $wechat->getOauthAccessToken();
        if (!$token) {
            exit('登录失败');
        }

        $wechat = array(
            'token' => $token,
        );
        session('wechat', $wechat);

        $wechatData = array(
            'access_token' => $token['access_token'],
            'code' => $_GET['code'],
            'state' => $_GET['state'],
        );
        setcookie('wxopenid', $wechat['token']['openid'], 0, '/', 'wdwd.com');
        $_COOKIE['wxopenid'] = $wechat['token']['openid'];

        if ($_GET['state']) {
            $url = base64_decode($_GET['state']);
            header('Location: ' . $url);
            exit;
        }
    }
}

