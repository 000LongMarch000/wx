<?php
namespace Wechat\Controller;
use Think\Controller;
class WarningController extends Controller {
    protected $_wechat = null;
    protected $_shopId = null;

    public function __construct() {
        if (empty($_GET['nid'])) {
            die("非法访问");
        }
        $shopId = $_GET['nid'];
        $weixinMdl = D('Weixin');
        $shopId = \Common\Lib\Idhandler::decode($shopId);
        $weixin = $weixinMdl->getByShopId($shopId);
        if (!$weixin) {
            die("店铺不存在");
        }

        $options = array(
            'appid' => $weixin['appid'],
            'appsecret' => $weixin['appsecret'],
            'token' => $weixin['token'],
            'debug' => true,
        );
        $this->_wechat = new \Common\Lib\Wechat($options);
        $this->_wechat->valid();

        $this->_shopId = $shopId;

        parent::__construct();
    }

    public function index() {
        \Common\Lib\Utils::log('wechat', 'notify.log', $_SERVER);
        \Common\Lib\Utils::log('wechat', 'notify.log', $_GET);
        \Common\Lib\Utils::log('wechat', 'notify.log', $_POST);
        echo "success";
        exit;
    }
}
