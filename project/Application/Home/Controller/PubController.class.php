<?php
namespace Home\Controller;
use \Think\Controller;

class PubController extends Controller {

    public $utils = '';
    public function __construct(){
        parent::__construct();
        $this->assign('DEBUG', C('DEBUG'));

        //处理微信
        if(strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger')){
            $this->assign('in_wechat', 1);
            $this->wx();
        }else{
            echo "请在微信中打开该页面";
            exit();
        }

        $thirdparty_type = session('thirdparty_type');
        $thirdparty_uid = session('thirdparty_uid');
        $user_id = session('user_id');

        if(!$user_id && $thirdparty_type && $thirdparty_uid){
             $plat_arr = $this->passport($thirdparty_type, $thirdparty_uid);
             $user_id = $plat_arr['user_id'];
        }

        $this->assign('thirdparty_type', $thirdparty_type);
        $this->assign('thirdparty_uid', $thirdparty_uid);

        $this->assign('user_id', $user_id);

        //全局的变量
        $this->assign('payurl', C('PAYURL'));
    }

    //处理平台ID
    public function passport($thirdparty_type='', $thirdparty_uid=''){
        if(session('user_id')){
           return array('user_id' => session('user_id'));
        }

        $user_id = '';
        $userMdl = D('User');
        $params = array();
        $params['openid'] = $thirdparty_uid;
        //根据thirdparty 获得用户的passport
        $userRes = $userMdl->getRow($params);

        //如果thirdparty id 不存在，创建passport
        if($userRes){
            $user = $userRes;
            $user_id = \Common\Lib\Idhandler::encode($userRes['id']);
        }else{
            $params['level'] = 1;
            $params['created_at'] = time();
            $params['updated_at'] = time();
            $params['due_at'] = time() + 1800;
            
            $userRes = $userMdl->saveData($params);
            if($userRes['status'] == 'success') {
                $user_id = \Common\Lib\Idhandler::encode($userRes['data']);
                $params['id'] = $userRes['data'];
                $user = $params;
            }
        }

        if($user_id) {
            session('user_id', $user_id);
            session('user', $user);
        }
        $return['user_id'] = $user_id;
        return $return;
    }

    //微信处理
    public function wx(){
        $wx_oauth_conf = C('WEIXIN');
        $wechat = new \Common\Lib\Wechat($wx_oauth_conf);

        //$_COOKIE['wxopenid'] = '2oeHfxwAIkN6fPscPnZRLssOtQsXw';
        if (!$_COOKIE['wxopenid']) {
            $req_path = explode('?', $_SERVER['REQUEST_URI']);
            $referrerUri = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $state = base64_encode($referrerUri);
            $redirectUri = 'http://wechat.vtshow.top/admin/data/login';
            $authorizeUrl = $wechat->getOauthRedirect($redirectUri, $state, 'snsapi_base');
            header('Location: ' . $authorizeUrl);
            exit;
        }elseif(isset($_COOKIE['wxopenid']) && $_COOKIE['wxopenid']){
            $uid = $_COOKIE['wxopenid'];
            session('thirdparty_uid', $uid);
            session('thirdparty_type', 'wechat');
            //session('unionid', $_COOKIE['unionid']);
        }
    }

}
