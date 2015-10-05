<?php
namespace Admin\Controller;
use Think\Controller;
class PassportController extends Controller {
    public function __construct() {
        parent::__construct();
        $this->assign('DEBUG', C('DEBUG'));
        $this->assign('BEAM', C('BEAM'));
        $this->assign('assets_path', C('DEBUG') ? '/src' : '/statics');
        if($_GET['source'] && !cookie('source')){
            cookie('source',trim($_GET['source']));
        }
    }

    public function index() {
        #$user_mdl = M('User');
        #$this->display();
    }

    public function login() {
        if ($_GET['error']) {
            $this->assign('errmsg', '帐号或密码错误');
        }
        $this->display();
    }

    public function logout() {
        session(null);
        $this->redirect('admin/passport/login');
    }

    //mobile 登录验证
    public function verify() {
        $mobile = trim($_POST['mobile']);
        $password = trim($_POST['password']);

        $passportMdl = D('Passport');
        if (!$mobile  || !$password || $password != 'test') {
            $this->redirect('/admin/passport/login?error=username_not_exist');
        }

        $shop['loginname'] = 'test';
        //添加decode shop_id字段
        session('shop', $shop);
        $this->redirect('/admin/weixin/menu');
    }

}
