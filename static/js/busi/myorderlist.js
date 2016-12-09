/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    getOrderlist:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success
            $(".js-orderlist-ctn").html(template('orderitembody',res.data));
            initEvent();//添加事件
        },function(res){
            //error
            showMsg("error");
        });
    },
    cancelOrder:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success  刷新当前例表
            api.getOrderlist({"methodName":"OrderIndex","version":2});
        },function(res){
            //error
            showMsg("error");
        });
    },
    initPayObj:function(req){
        doRequestwithnoheader(req,function(res){
            pingpp.createPayment(res.data.charge, function(result, error){
                if (result == "success") {
                    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                } else if (result == "fail") {
                    // charge 不正确或者微信公众账号支付失败时会在此处返回
                } else if (result == "cancel") {
                    // 微信公众账号支付取消支付
                }
            });
        },function(res){
            //error
            showMsg("error");
        });
    }
};
function initEvent(){
    $(".js-gotooperate").bind("click",function(ev){
        ev.stopImmediatePropagation();
        ev.preventDefault();
        var status = $(this).attr("status");
        //wx
        var process = $(this).attr("process");
        var order_id = $(this).attr("order_id");
        var day_buy = $(this).attr("day_buy");
        var pro_name = $(this).attr("pro_name");
        var yuesao_id = $(this).attr("yuesao_id");
        //并非当场弹出支付，都在统一的页面支付  status	tinyint(1) [1]	订单支付状态，1未付款，2预付款，3已付款，4已退款
        if(status==1||status==2){//等待支付定金或者尾款
            window.location.href="/html/confirmpay.html?order_id="+order_id+"&day_buy="+day_buy+"&pro_name="+pro_name;
            //api.initPayObj({"methodName":"OrderPayStart","version":2,"order_id":order_id,"channel":"wx_pub","type":status});
            return;
        }
        if(process==4){//待评价状态
            window.location.href="/html/givestar.html?order_id="+order_id+"&yuesao_id="+yuesao_id;
            return;
        }
    });
    $(".js-cancelorder").bind("click",function(ev){
        ev.stopImmediatePropagation();
        ev.preventDefault();
        if($(this).hasClass("grid")){
            return;
        }else{

            var order_id = $(this).attr("order_id");
            dialog.show({
                title:"温馨提示",
                content:"你真的要取消该订单吗？",
                okBtn:{
                    text:"确认",
                    callback:function(){
                        api.cancelOrder({"methodName":"OrderPayCancel","version":2,"order_id":order_id});//鏆傜畝鍐�
                    }
                },
                cancelBtn:{
                    text:"取消",
                    callback:function(){
                        //showMsg("鍙栨秷");
                    }
                }
            });
        }
    });
    $(".js-gotoorderdetail").bind("click",function(){
        var order_id = $(this).attr("order_id");
        window.location.href="/html/orderdetail.html?order_id="+order_id;
    });
}
$(function(){
    api.getOrderlist({"methodName":"OrderIndex","version":2});
});
