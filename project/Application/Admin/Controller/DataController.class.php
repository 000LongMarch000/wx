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

        setcookie('wxopenid', $wechat['token']['openid'], 0, '/', 'shopflow.cn');
        $_COOKIE['wxopenid'] = $wechat['token']['openid'];

        if ($_GET['state']) {
            $url = base64_decode($_GET['state']);
            header('Location: ' . $url);
            exit;
        }
    }
}

