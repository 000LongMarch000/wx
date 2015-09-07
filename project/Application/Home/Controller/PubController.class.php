<?php
namespace Home\Controller;
use \Think\Controller;

class PubController extends Controller {

    public $utils = '';
    public function __construct(){
        parent::__construct();
        $this->assign('DEBUG', C('DEBUG'));
        $this->assign('ENV', C('ENV'));

        //处理微信
        if(strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger')){
            $this->assign('in_wechat', 1);
            $this->wx();
        }

        //抛数据到模版中

        $thirdparty_type = session('thirdparty_type');
        $thirdparty_uid = session('thirdparty_uid');
        $unionid = session('unionid');
        if(!$passport_id && $thirdparty_type && $thirdparty_uid){
             $plat_arr = $this->passport($shop_id, $thirdparty_type, $thirdparty_uid, $unionid);

             $passport_id = $plat_arr['passport_id'];
        }

        $this->assign('thirdparty_type', $thirdparty_type);
        $this->assign('thirdparty_uid', $thirdparty_uid);

        $this->assign('passport_id', $passport_id);

        //全局的变量
        $this->assign('payurl', C('PAYURL'));
    }

    //处理平台ID
    public function passport($shop_id='', $thirdparty_type='', $thirdparty_uid='', $unionid = ''){
        if(session('passport_id')){
           return array('passport_id' => session('passport_id'));
        }

        //$return = array('passport_id' => '');
        $passport_id = '';
        $passportMdl = D('Passport');
        $params = array();
        $params['platform'] = $thirdparty_type;
        $params['openid'] = $thirdparty_uid;
        $params['unionid'] = $unionid;
        $params['from'] = 'yl_h5';

        //根据thirdparty 获得用户的passport
        $passportRes = $passportMdl->getTokenByTp($thirdparty_type, $thirdparty_uid, $unionid);

        $this->utils->log('wd', 'pub.log', json_encode($params));
        $this->utils->log('wd', 'pub.log', json_encode($passportRes));
        //$this->utils->log('oauth', 'wx.log', json_encode($passportRes));
        //如果thirdparty id 不存在，创建passport
        if($passportRes['result'] == 'error' || !$passportRes['data']['id']){
            $passport = $passportMdl->createByTp(array('thirdparty' => json_encode($params)));
            $this->utils->log('wd', 'pub.log', json_encode($passport));
            if(isset($passport['data']['passport_id']) && $passport['data']['passport_id']){
                $passport_id = $passport['data']['passport_id'];
                session('passport_id', $passport_id);
            }
        }else{
            //更新unionid 
            $res = $passportMdl->changeTp(array('data' => json_encode($params)));
            $this->utils->log('wd', 'pub.log', json_encode($res));
            $passport_id = \Common\Lib\Idhandler::encode($passportRes['data']['id']);
        }

        if($passport_id) {
            //$this->utils->log('initinfo', 'passport.log', "wd pub pasport_id " .  $passport_id . ' ' . \Common\Lib\Idhandler::decode($passport_id)); 
            $this->session_data(\Common\Lib\Idhandler::decode($passport_id));
        }
        $return['passport_id'] = $passport_id;
        return $return;
    }

    //微信处理
    public function wx(){
        $wx_oauth_conf = C('WEIXIN');
        $wechat = new \Common\Lib\Wechat($wx_oauth_conf);

        if (!$_COOKIE['wxopenid']) {
            $req_path = explode('?', $_SERVER['REQUEST_URI']);
            //$referrerUri = 'http://' . $_SERVER['HTTP_HOST'] . $req_path[0];
            $referrerUri = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $state = base64_encode($referrerUri);
            #$redirectUri = 'http://www.sandbox.wdwd.com/admin/data/login';
            $redirectUri = 'http://wechat.shopflow.cn/admin/data/login';
            $authorizeUrl = $wechat->getOauthRedirect($redirectUri, $state, 'snsapi_base');
            header('Location: ' . $authorizeUrl);
            exit;
        }elseif(isset($_COOKIE['wxopenid']) && $_COOKIE['wxopenid']){
            $uid = $_COOKIE['wxopenid'];

            session('thirdparty_uid', $uid);
            session('thirdparty_type', 'wechat');
            session('unionid', $_COOKIE['unionid']);
        }
    }

}
