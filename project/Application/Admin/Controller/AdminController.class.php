<?php
namespace Admin\Controller;
use Think\Controller;
class AdminController extends Controller {
    public $shop = array();
    public $passport = array();
    public function __construct() {
        if($_GET['source'] && !cookie('source')){
            cookie('source',trim($_GET['source']));
        }
        if (isset($_GET['spm']) && $_GET['spm']) {
            cookie('_spm', $_GET['spm'], array('expire' => 172800, 'domain' => '.wdwd.com', 'path' => '/'));
        }
        if (!session('?shop')) {
            $this->redirect('admin/passport/logout');
        }
        /*
        var_dump(session('shop'));
        exit;
        if (!session('?shop') || ('' == session('shop.mobile'))) {
            if (session('?user')) {
                $this->redirect('admin/passport/bind');
            }
            else {
                $this->redirect('admin/passport/logout');
            }
        }
        */
        $shop = session('shop');
        $shop['decode_shop_id'] = \Common\Lib\Idhandler::decode($shop['shop_id']);
        $this->passport = session('passport');
        $this->shop = $shop;
        $this->shop['mobile'] = $this->passport['loginname'];

        //print_r($this->shop);
        //print_r(session('passport'));
        parent::__construct();
    }

    public function display($templateFile='', $charset='', $contentType='', $content='', $prefix='') {
        $this->assign('DEBUG', C('DEBUG'));
        $this->assign('BEAM', C('BEAM'));
        $this->assign('assets_path', C('DEBUG') ? '/src' : '/statics');

        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);
        $this->assign('shop_id', $shopId);
        $this->assign('shop_is_closed', $this->shop['is_closed']);

        $this->assign('encode_shop_id', $encodeShopId);
        $this->assign('default_image', C('DEFAULT_IMAGE'));
        parent::display($templateFile,$charset,$contentType,$content,$prefix);
    }
}
