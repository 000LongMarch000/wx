<?php
namespace Wechat\Controller;
use Think\Controller;
class YlController extends Controller {
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

        $logfile = RUNTIME_PATH . 'Logs/request.log';
        error_log(http_build_query($_GET) . "\n", 3, $logfile);

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
        $type = $this->_wechat->getRev()->getRevType();

        switch ($type) {
            case \Common\Lib\Wechat::MSGTYPE_TEXT:
                $this->processText();
                break;
            case \Common\Lib\Wechat::MSGTYPE_EVENT:
                $this->processEvent();
                break;
            default:
                echo "非法访问";
                break;
        }
        exit;
    }

    protected function processEvent() {
        $event = $this->_wechat->getRevEvent();
        $data = $this->_wechat->getRevData();
        $logfile = RUNTIME_PATH . 'Logs/request.log';
        error_log(print_r($data, true), 3, $logfile);
        switch ($event['event']) {
            case 'subscribe':
                $messageMdl = D('Message');
                $message = $messageMdl->getRow($this->_shopId, 'attention');

                $code = $this->invitecode($data); 

                if($message){
                    $message  = str_replace("{code}",$code,$message);
                }else{
                   $message = $code;
                }
                
                $this->reply($message);
                break;
            case 'CLICK':
                $menuMdl = D('Menu');
                $menu = $menuMdl->getRow($data['EventKey']);
                $this->reply($menu);
                break;
            default:
                break;
        }
    }

    protected function processText() {
        $keywordMdl = D('Keyword');
        $data = $this->_wechat->getRevData();
        $kwd = $data['Content'];

        $keyword = $keywordMdl->getList($this->_shopId, $kwd); 
        if ($keyword) {
            $rs = $keyword[0];
        }
        else {
            $messageMdl = D('Message');
            $rs = $messageMdl->getRow($this->_shopId, 'message');
        }

        $logfile = RUNTIME_PATH . 'Logs/request.log';
        error_log(print_r($rs, true), 3, $logfile);

        switch($kwd){
            case '激活码':
            case '邀请码':
                $code = $this->invitecode($data); 
                if($rs['content']){
                    $rs['content']  = str_replace("{code}",$code,$rs['content']);
                }else{
                   $rs['content'] = $code;
                }
                break;
            default:
                break;
        }
        
        $this->reply($rs);
    }

    protected function reply($message) {
	    if (!$message) {
	        //do nothing
	    }
	    if (1 == $message['msg_info_type']) {
            $text = str_replace('<br />', "\n", $message['content']);
            $text = str_replace('target="_blank"', '', $text);
            $text = str_replace('&nbsp;', ' ', $text);
	        $this->_wechat->text($text)->reply();
	    }
	    else {
	        $data = unserialize($message['msg_data']);
	        $news = array();
	        foreach ($data as $v) {
		        $news[] = array(
		            'Title' => $v['title'],
		            'Description' => $v['text'],
		            'PicUrl' => $v['picurl'],
		            'Url' => $v['url'],
		        );
	        }
	        $this->_wechat->news($news)->reply();
	    }
    }

    private function invitecode($data=array()){
        $logfile = RUNTIME_PATH . 'Logs/request.log';
        $invitecodeMdl = D('Invitecode');
        $userMdl = D('User');
                
        $fromUserName = $data['FromUserName'];
        //error_log($fromUserName, 3, $logfile); 
        if($userRes = $userMdl->findByUsername($fromUserName, 'wechat')){
            $userId = $userRes['user_id']; 
        }else{
            $params = array();
            $params['user_type'] = 'wechat';
            $params['user_name'] = $fromUserName;
            $params['thirdparty_user_id'] = $fromUserName;
            $params['create_time'] = time();
            $params['update_time'] = time();
            //error_log(print_r($params, true), 3, $logfile);
            $userRes = $userMdl->createNew($params);
            //error_log(print_r($userRes, true), 3, $logfile);
            if($userRes){
                $userId = $userRes['user_id'];
            }else{
                error_log($fromUserName. ': create user error.', 3, $logfile); 
                exit();
            }
        }

        //error_log($userId, 3, $logfile);
        $code = '';
        if($userId){
            $invitecode = $invitecodeMdl->findByUserid($userId, 'wechat');
            //error_log(print_r($invitecode, true), 3, $logfile);
            if($invitecode){
                $code = $invitecode['invite_code'];
            }else{
                $invitecode = $invitecodeMdl->createNew(array('user_id' => $userId, 'invite_type'=>'wechat', 'create_time' => time()), '');
                if($invitecode){
                    $code = $invitecode;
                }else{
                   error_log($fromUserName. ': create invite code error.', 3, $logfile);        
                }
            }
            //error_log($invitecode, 3, $logfile);
        }else{
            error_log($fromUserName. ': user id not exist.', 3, $logfile);  
        }

        return $code;
    }
}
