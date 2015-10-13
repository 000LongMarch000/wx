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

        $fromusername = $data['FromUserName'];
        $filter = array('openid' => $fromusername);
        $userMdl = D('User');
        $user = $userMdl->getRow($filter);

        $userid = '';
        if($user) {
            $userid = $user['id'];
        }else{
            $params = $filter;
            $params['level'] = 1;
            $params['created_at'] = time();
            $params['updated_at'] = time();
            $params['due_at'] = time() + 1800;
            $res = $userMdl->saveData($params);
            if($res['status'] == 'success') {
                $userid = $res['data'];
            }
        }

        switch ($event['event']) {
            case 'subscribe':
                $rs['msg_info_type'] = 1;
                $rs['content'] = '欢迎您使用微淘秀,您可以<a href="http://wechat.vtshow.top/home/help/index">查看帮助</a>,创建您的淘宝链接.';
                $this->reply($rs);
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
        $help_url = "http://wechat.vtshow.top/home/help/index";

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
        
        $level_str = '';
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
                $level_str = '普通会员'; 
                $due_at = time() + 1800;
                break;
            case '2':
                if($count >= 5) {
                    $rs['content'] = '您是银牌会员，已经创建5次链接，, <a href="http://wechat.vtshow.top/home/pay/index">点击成为会员</a>，可创建更多';
                }
                //$due_at = time() + 7 * 86400;
                $due_at = $user['due_at'];
                $level_str = '银牌会员'; 
                break;
            case '3':
                //$due_at = time() + 30 * 86400;
                $due_at = $user['due_at'];
                $level_str = '金牌会员'; 
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
        //获得字符串中的url
        $urls = array();
        preg_match_all("/http[s]?:\/\/?[^\s]+/i",$content_str,$urls); 
        $content = $urls[0][0];
        $o_url = $content;

        \Common\Lib\Utils::log('wechat', 'request.log', $content);
        $title = "";
        $http_pos = strpos($content_str, 'http');
        if($http_pos) {
            $title = substr($content_str, 0, $http_pos);
        }

        if(preg_match('/mashort.cn/', $content) || preg_match('/tb.cn/', $content)){
            $n_content = file_get_contents($content);
            $pa = '%id=("|\')?J_Url("|\')? value=("|\')?(.*?)("|\')?>%si';
            preg_match($pa,$n_content,$r);
            
            if($r) {
                $url = urldecode($r[4]);
                \Common\Lib\Utils::log('wechat', 'request.log', $url);
                $n_query = explode('url=', $url);
                \Common\Lib\Utils::log('wechat', 'request.log', $n_query);
                $n_url = $n_query[1]?$n_query[1]:$n_query[0];
                $content = $n_url;
            }
        }
        
        \Common\Lib\Utils::log('wechat', 'request.log', $content);

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
                $itemRes = $itemsMdl->getRow(array('nid' => $nid, 'uid' => $userid)); 
            }else{
                $itemRes = $itemsMdl->getRow(array('o_url' => $o_url, 'uid' => $userid)); 
            }
            
            \Common\Lib\Utils::log('wechat', 'request.log', $itemRes);
            
            $s_url = '';
            if($itemRes) {
                $params['id'] = $itemRes['id'];
                $params['uid'] = $userid;
                $params['url'] = $content;
                $params['o_url'] = $o_url;
                $params['due_at'] = $due_at;
                $params['title'] = $itemRes['title']?$itemRes['title']:$title;
                $params['updated_at'] = time();
                $itemsMdl->saveData($params);
                $id = $itemRes['id'];
                $s_url = $itemRes['s_url'];
                
                \Common\Lib\Utils::log('wechat', 'request.log', $params);
            }else{
                $params['url'] = $content;
                $params['o_url'] = $o_url;
                $params['nid'] = $nid;
                $params['uid'] = $userid;
                $params['platform'] = $type;
                $params['created_at'] = time();
                $params['updated_at'] = time();
                $params['due_at'] = $due_at;
                $params['title'] = trim($title);
                $res = $itemsMdl->saveData($params);
                //\Common\Lib\Utils::log('wechat', 'request.log', $res);
                if($res['status'] == 'success') {
                    $id = $res['data'];
                } 

                //\Common\Lib\Utils::log('wechat', 'request.log', $itemsMdl->getLastSql());
                //\Common\Lib\Utils::log('wechat', 'request.log', $params);
            }

            if($id) {
                
                if(!$s_url) {
                    $url = 'http://i.shopflow.cn/show/' . \Common\Lib\Idhandler::encode($id);
                    $s_url = \Common\Lib\Utils::short_url($url);
                    if(!$s_url) {
                        $s_url = $url;
                    }
                    $itemsMdl->saveData(array('id' => $id, 's_url' => $s_url));
                }
                
                $out_content = "短链接: " . $s_url . "\n微淘秀链接: ".'http://i.shopflow.cn/show/' . \Common\Lib\Idhandler::encode($id)."\n如果短链接不能访问，可以使用微淘秀链接访问\n您是".$level_str.",链接已创建!\n过期时间:" . date('Y-m-d H:i', $due_at);
                //$out_content = 'http://i.vtshow.top/show/' . \Common\Lib\Idhandler::encode($id)."\n您是".$level_str.",链接已创建!\n过期时间:" . date('Y-m-d H:i', $due_at);
                $rs['content'] = $out_content;
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
