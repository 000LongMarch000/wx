<?php
namespace Admin\Controller;
use Admin\Controller;
use Common\Lib;
class IndexController extends AdminController {
    public function __construct(){
        parent::__construct();
        $this->assign('menu', 'desktop');
    }

    public function index(){
        $encodeShopId = $this->shop['shop_id'];
        $shopId = \Common\Lib\Idhandler::decode($encodeShopId);
        $tradeMdl = D('Trade');
        $shopMdl = D('Shop');
        $productMdl = D('Products');
        $shopStatisticsMdl = D('ShopStatistics');
        $tradeTransactionsMdl = D('TradeTransactions');

        $filter = array('shop_id' => $shopId, 'status' => 'open', 'financial_status' => 'paid');
        $paidCount = $tradeMdl->getCount($filter);

        $filter = array('shop_id' => $shopId, 'financial_status' => 'paid', 'fulfillment_status' => '');
        $undeliveryCount = $tradeMdl->getCount($filter);
        //$undeliveryCount = 0;

        $shopInfo = $shopMdl->findByShopId($shopId);
        $productCount = $productMdl->getCount(array('shop_id' => $shopId, 'published' => 1, 'status' => 1));

        $productDownCount = $productMdl->getCount(array('shop_id' => $shopId, 'published' => 0, 'status' => 1));

        $start = strtotime(date('Y-m-01'));
        
        /*
        $params['shop_id']  = $shopId;
        $parasm['status'] = 'open'; 
        $params['financial_status'] = 'paid';
        $params['created_at'] = array('between', $start.",".time());

        $orderCount = $tradeMdl->getCount($params);
        $income = $tradeMdl->getTotalAmount($params);
        */

        $params['shop_id']  = $shopId;
        $parasm['kind'] = 'capture'; 
        $params['status'] = 'success';
        $params['created_at'] = array('between', $start.",".time());

        $orderCount = $tradeTransactionsMdl->getCount($params);
        $income = $tradeTransactionsMdl->getTotalAmount($params);

        /*
        $month = date("Y-m");
        $filter = "LEFT(`date`, 7) = '{$month}' and shop_id = {$shopId}";
        $income = $shopStatisticsMdl->sumAmount($filter);
        */
        //微信关注
        $userMdl = D('User');
        $follower = $userMdl->findWechatFollower($shopId);
        if ($follower || session('ignoreWechat')) {
            $isFollow = true;
        }
        else {
            $isFollow = false;
        }

        //引导页面
        $shopSettingMdl = D('ShopSetting');
        $guideRs = $shopSettingMdl->findByKey($shopId, 'guide_desktop');
        $this->assign('guide', $guideRs ? 0 : 1);

        //有料列表
        $noticeMdl = D('Notice');
        $notice = $noticeMdl->getList('5', '1');

        $this->assign('notice', $notice);

        $this->assign('isFollow', $isFollow);
        $this->assign('shop', $shopInfo);
        $this->assign('productCount', number_format($productCount));
        $this->assign('productDownCount', number_format($productDownCount));
        $this->assign('orderCount', number_format($orderCount));
        $this->assign('paidCount', number_format($paidCount));
        $this->assign('undeliveryCount', number_format($undeliveryCount));
        $this->assign('income', $income ? number_format($income, 2) : 0);

        $this->assign('shop_url', C('LOCAL_URL1').'shop/'.\Common\Lib\Idhandler::encode($shopId));
        $this->display();
    }
}
