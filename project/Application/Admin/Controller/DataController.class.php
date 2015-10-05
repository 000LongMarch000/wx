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

        setcookie('wxopenid', $wechat['token']['openid'], 0, '/', 'vtshow.top');
        $_COOKIE['wxopenid'] = $wechat['token']['openid'];

        /*
        setcookie('nickname', $wechat['token']['nickname'], 0, '/', 'shopflow.cn');
        $_COOKIE['nickname'] = $wechat['token']['nickname'];

        setcookie('unionid', $wechat['token']['unionid'], 0, '/', 'shopflow.cn');
        $_COOKIE['unionid'] = $wechat['token']['unionid'];
         */

        if ($_GET['state']) {
            $url = base64_decode($_GET['state']);
            header('Location: ' . $url);
            exit;
        }
    }
}

