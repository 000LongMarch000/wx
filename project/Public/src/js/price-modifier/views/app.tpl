<div class="app-price_modifier">
    <form action="" method="post">
        <div class="header clearfix">
            <div class="col-l">
                <div>订单编号：{{orderID}}</div>
                <div class="address">收货地址：{{address}}</div>
            </div>
            <div class="col-r field-deliveryFee">
                <div class="col-l">
                    <div class="label">运费</div>
                    <div><a href="#" class="J_buttonFreeDeliveryFee">免运费</a></div>
                </div>
                <div class="col-r"><input type="text" class="J_inputModifiedDeliveryFee input-text input-price" maxlength="10" value="{{deliveryFee}}" data-original="{{originDeliveryFee}}"></div>
            </div>
        </div>
        <div class="body data-list list-skin-1">
            <table class="J_tableDelivery">
                <thead>
                    <tr>
                        <th><div class="cell">商品</div></th>
                        <th><div class="cell">数量</div></th>
                        <th><div class="cell">单价</div></th>
                        <th><div class="cell">小计</div></th>
                        <th><div class="cell">修改价格</div></th>
                    </tr>
                </thead>
                <tbody>
                    {{#each items}}
                    <tr data-id="{{id}}" style="padding-top:10px; padding-bottom:10px;">
                        <td>
                            <div class="cell t-l">
                                <div class="goods-media">
                                    <span class="goods-img" style="width:50px; height:50px;"><img src="{{thumbnail}}"></span>
                                    <span class="goods-name" style="padding-top:0px;padding-bottom:0px;">{{name}}</span>
                                </div>
                            </div>
                        </td>
                        <td><div class="J_blockAmount cell">{{amount}}</div></td>
                        <td><div class="cell">&yen; {{unitPrice}}</div></td>
                        <td><div class="cell">&yen; {{subtotalPrice}}</div></td>
                        <td><div class="cell"><input type="text" class="J_inputModifiedPrice input-text input-price" maxlength="10" value="{{price}}" data-original="{{originSubtotalPrice}}"></div></td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>
        <div class="footer clearfix">
            <div><span>商品改价：<span>&yen; <span class="J_spanChangedTotalPrice">0.00</span></span></span>&nbsp;&nbsp;&nbsp;<span>运费改价：<span>&yen; <span class="J_spanChangedDeliveryFee">0.00</span></span></span>&nbsp;&nbsp;&nbsp;<span>优惠金额：<span>&yen; <span>{{discount}}</span></span></span></div>
            <div class="col-l sum"><em>&yen; <span class="J_spanModifiedTotalFee">{{totalFee}}</span></em> ( <span>&yen; <span class="J_spanModifiedTotalPrice" data-original="{{originTotalPrice}}">{{totalPrice}}</span></span> + <span>&yen; <span class="J_spanModifiedDeliveryFee" data-original="{{originDeliveryFee}}">{{deliveryFee}}</span></span>{{#if discount}} - &yen; <span class="J_spanDiscount">{{discount}}</span>{{/if}} )</div>
            <div class="col-r form-actions"><a href="#" class="J_buttonConfirm btn btn-primary btn-large">修改金额</a><a href="#" class="J_buttonCancel btn btn-large">取消</a></div>
        </div>
    </form>
</div>
