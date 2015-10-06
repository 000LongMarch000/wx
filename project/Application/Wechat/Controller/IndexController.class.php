<?php
namespace Wechat\Controller;
use Think\Controller;
class IndexController extends Controller {
    protected $_wechat = null;
    protected $_config = array(
        'appid' => 'wx5c5eb81395daa40c',
        'appsecret' => '2486f856156e4cee1ffe231658558b26',
        'token' => '2d5d7e74c17bdcc3f753f3d46fc3abc0', //md5('ilove888');
    );

    public function __construct() {
        $logfile = RUNTIME_PATH . 'Logs/request.log';
        error_log(http_build_query($_GET) . "\n", 3, $logfile);
        //$keyword = $keywordMdl->getList($this->_shopId, $kwd); 

        $options = array(
            'appid' => $this->_config['appid'],
            'appsecret' => $this->_config['appsecret'],
            'token' => $this->_config['token'],
            'debug' => true,
        );
        $this->_wechat = new \Common\Lib\Wechat($options);
        $this->_wechat->valid();

        parent::__construct();
    }

    public function index() {
        $type = $this->_wechat->getRev()->getRevType();
        \Common\Lib\Utils::log('wechat', 'request.log', $type);

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
        \Common\Lib\Utils::log('wechat', 'request.log', $data);

        $fromusername = $data['FromUserName'];
        $filter = array('openid' => $fromusername);
        $userMdl = D('User');
        $user = $userMdl->getRow($filter);

        $userid = '';
        if($user) {
            $userid = $user['id'];
        }

        switch ($event['event']) {
            case 'subscribe':
                $messageMdl = D('Message');
                $message = $messageMdl->getRow($this->_shopId, 'attention');
                $this->reply($message);
                break;
            case 'CLICK':
                $menuMdl = D('Menu');
                $menu = $menuMdl->getRow($data['EventKey']);
                \Common\Lib\Utils::log('wechat', 'request.log', $menu);
                $this->reply($menu, $userid);
                break;
            default:
                break;
        }
    }

    protected function processText() {
        date_default_timezone_set("Asia/Beijing");
        $help_url = "";

        $data = $this->_wechat->getRevData();
        \Common\Lib\Utils::log('wechat', 'request.log', $data);

        $fromusername = $data['FromUserName'];
        $filter = array('openid' => $fromusername);
        $userMdl = D('User');
        $user = $userMdl->getRow($filter);
        if($user) {
            $userid = $user['id'];
            $level = $user['level']?$user['level']:'1';
        }else{
            $params = $filter; 
            $params['level'] = 1;
            $params['created_at'] = time();
            $params['updated_at'] = time();
            $res = $userMdl->saveData($params);
            if($res['status'] == 'success') {
                $userid = $res['data'];
                $level = 1;
            }
        }

        $rs['msg_info_type'] = 1;
        if(!$userid) {
            $rs['content'] = '请输入正确的商品链接地址, <a href="'.$help_url.'">查看帮助</a>';
            $this->reply($rs);
            exit();
        }

        $itemsMdl = D('Items');
        $ifilter['uid'] = $userid;
        $ifilter['due_at'] = array('gt',time());
        $count = $itemsMdl->getCount($ifilter);
        //\Common\Lib\Utils::log('wechat', 'request.log', $ifilter);
        
        switch($level) {
            case '1':
                if($count >= 1) {
                    $rs['content'] = '您的会员等级,只能创建1次链接，<a href="http://wechat.vtshow.top/home/pay/index">点击成为会员</a>，可创建更多';
                }else{
                    $yesterday_end = strtotime(date('Y-m-d', time()));
                    $ifilter['due_at'] = array('lt', time());
                    $ifilter['updated_at'] = array('between', array($yesterday_end, $yesterday_end + 86400));
                    //\Common\Lib\Utils::log('wechat', 'request.log', $ifilter);
                    //$count = $itemsMdl->getCount($ifilter);
                    //\Common\Lib\Utils::log('wechat', 'request.log', $itemsMdl->getLastSql());
                    if($itemsMdl->getCount($ifilter) > 0) {
                        $rs['content'] = '您的会员等级,今天已经创建了1次链接，请等后天再创建, <a href="http://wechat.vtshow.top/home/pay/index">点击成为会员</a>，可创建更多';
                    }else{
                        $yesterday_start = $yesterday_end - 86400;
                        $ifilter['updated_at'] = array('between', array($yesterday_start, $yesterday_end));
                        \Common\Lib\Utils::log('wechat', 'request.log', $ifilter);
                        if($itemsMdl->getCount($ifilter) > 0) {
                            $rs['content'] = '您的会员等级，昨天已经创建了1次链接，请等明天再创建, <a href="http://wechat.vtshow.top/home/pay/index">点击成为会员</a>，可创建更多';
                        }
                    }
                }
                $due_at = time() + 5 * 3600;
                break;
            case '2':
                if($count >= 5) {
                    $rs['content'] = '您是银牌会员，已经创建5次链接，, <a href="http://wechat.vtshow.top/home/pay/index">点击成为会员</a>，可创建更多';
                }
                //$due_at = time() + 7 * 86400;
                $due_at = $user['due_at'];
                break;
            case '3':
                //$due_at = time() + 30 * 86400;
                $due_at = $user['due_at'];
                break;
            default:
                break;
        }

        if(isset($rs['content']) && $rs['content']) {
            $this->reply($rs);
            exit();
        }

        $content_str = $data['Content'];
        /*
        $h_pos = strpos($content_str, 'http');
        if(!$h_pos) {
            $h_pos = strpos($content_str, 'https');
        }
        $content = substr($content_str, $h_pos, strlen($content_str)); 
        */
        $urls = array();
        preg_match_all("/http[s]?:\/\/?[^\s]+/i",$content_str,$urls); 
        $content = $urls[0][0];

        if(preg_match('/^http[s]?:\/\//i', $content) === 0) {
            $rs['content'] = '请输入正确的商品链接地址, <a href="'.$help_url.'">查看帮助</a>';
        }else{
            $url_arr = parse_url($content);
            $type = '';
            $host = $url_arr['host'];
            if(preg_match('/tmall.com/', $host) || preg_match('/taobao.com/', $host)) {
                $type = 'taobao';
            }elseif(preg_match('/jd.com/', $host)) {
                $type = 'jd';
            }
            
            $nid = '';
            if($type == 'taobao') {
                if($url_arr['query']) {
                    parse_str($url_arr['query'], $query); 
                    $nid = $query['id'];
                }
            }elseif($type == 'jd') {
                $path = $url_arr['path'];
                if($path){
                    $nid = substr($path, 1, strlen($path) - 6);
                }
            }

            if($nid) {
                //判断是否已经生成
                $itemRes = $itemsMdl->getRow(array('nid' => $nid)); 
            }else{
                $itemRes = $itemsMdl->getRow(array('url' => $content)); 
            }
            
            if($itemRes) {
                $params['id'] = $itemRes['id'];
                $params['uid'] = $userid;
                $params['url'] = $content;
                $params['due_at'] = $due_at;
                $params['updated_at'] = time();
                $itemsMdl->saveData($params);
                $id = $itemRes['id'];
            }else{
                $params['url'] = $content;
                $params['nid'] = $nid;
                $params['uid'] = $userid;
                $params['platform'] = $type;
                $params['created_at'] = time();
                $params['updated_at'] = time();
                $params['due_at'] = $due_at;
                $res = $itemsMdl->saveData($params);
                if($res['status'] == 'success') {
                    $id = $res['data'];
                } 
            }

            if($id) {
                $url = 'http://i.vtshow.top/show/' . \Common\Lib\Idhandler::encode($id);
                $short_url = \Common\Lib\Utils::short_url($url);
                if(!$short_url) {
                    $short_url = $url;
                }
                $itemsMdl->saveData(array('id' => $id, 's_url' => $short_url));
                $rs['content'] = $short_url;
            }else{
                $rs['content'] = '操作错误';
            }
        }
        
        $this->reply($rs);
/*
        $keyword = $keywordMdl->getList($this->_shopId, $kwd); 
        if ($keyword) {
            $rs = $keyword[0];
        }
        else {
            $messageMdl = D('Message');
            $rs = $messageMdl->getRow($this->_shopId, 'message');
        }
        $this->reply($rs);
*/
    }

    protected function reply($message, $userid='') {
	    if (!$message) {
	        //do nothing
	        $this->_wechat->text('欢迎使用微淘秀')->reply();
	    }
	    if (1 == $message['msg_info_type']) {
            $text = str_replace('<br />', "\n", $message['content']);
            $text = str_replace('target="_blank"', '', $text);
            $text = str_replace('&nbsp;', ' ', $text);
            $text = $text?$text:'欢迎使用微淘秀';
	        $this->_wechat->text($text)->reply();
	    } else {
	        $data = unserialize($message['msg_data']);
            \Common\Lib\Utils::log('wechat', 'request.log', $data);
	        $news = array();
	        foreach ($data as $v) {
                \Common\Lib\Utils::log('wechat', 'request.log', $v);
                if($userid && $v['url']) {
                    $v['url'] = str_replace("{id}", $userid, $v['url']);               
                }
                \Common\Lib\Utils::log('wechat', 'request.log', $v);
		        $news[] = array(
		            'Title' => $v['title'],
		            'Description' => $v['text'],
		            'PicUrl' => $v['picurl'],
		            'Url' => $v['url'],
		        );
	        }
            \Common\Lib\Utils::log('wechat', 'request.log', $news);
	        $this->_wechat->news($news)->reply();
	    }
    }
}
