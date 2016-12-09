/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    orderPayInfo:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success
            $(".js-content-body").html(template('contentbody',res.data));
            initEvent();
        },function(res){
            //error
            //showMsg("error"+JSON.stringify(res));
        });
    },
    initPayObj:function(req){
       var identityObj = helper._store("identity");
        //showMsg("send req---"+JSON.stringify(req));
        doRequestwithnoheader(req,function(res){
           // showMsg("res- getcharge-----"+JSON.stringify(res));
            pingpp.createPayment(res.data.charge, function(result, error){
                //showMsg("e"+result+"-----error----"+JSON.stringify(error)+"---res.data.charge----"+JSON.stringify(res.data.charge));
                if (result == "success") {
                    //showMsg("success");
                    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                    window.location.href="/html/paysuc.html?order_id="+g_params["order_id"];
                } else if (result == "fail") {
                    // charge 不正确或者微信公众账号支付失败时会在此处返回
                    //showMsg("fail");
                    showMsg("支付失败");
                } else if (result == "cancel") {
                    // 微信公众账号支付取消支付
                    //showMsg("cancel");
                    showMsg("用户取消支付");
                }
            });
        },function(res){
            //error
            showMsg("get charge error");
        });
    }
};

$(function(){
    api.orderPayInfo({"methodName":"OrderPayInfo","version":2,"order_id":g_params["order_id"]});
});

function initEvent(){
   /* $(".js-paymoney-ctn .js-jjys-check").bind("click",function(){
        $(".js-paymoney-ctn .js-jjys-check").removeClass("jjys-check-focus");
        $(this).addClass("jjys-check-focus");
    })

    $(".js-paytype-ctn .js-jjys-check").bind("click",function(){
        $(".js-paytype-ctn .js-jjys-check").removeClass("jjys-check-focus");
        $(this).addClass("jjys-check-focus");
    })*/

    $(".js-paymoney-ctn .js-line-check").bind("click",function(){
        $(".js-paymoney-ctn .js-jjys-check").removeClass("jjys-check-focus");
        $(this).find(".js-jjys-check").addClass("jjys-check-focus");
    })

    $(".js-paytype-ctn .js-line-check").bind("click",function(){
        $(".js-paytype-ctn .js-jjys-check").removeClass("jjys-check-focus");
        $(this).find(".js-jjys-check").addClass("jjys-check-focus");
    })

    $(".js-confirmpay-btn").bind("click",function(){
        if($(".js-paymoney-ctn .jjys-check-focus").length==0){
            showMsg("请选择支付金额类型");
            return;
        }
        var type = $(".js-paymoney-ctn .jjys-check-focus").attr("type");
        //var openid = "o4aeVxOxH649AsZxiJzUFf8APwBs";
        if(!helper.isLogin()){
            helper.gotoLogin();
            return;
        }
        api.initPayObj({"methodName":"OrderPayStart","version":2,"order_id":g_params["order_id"],"channel":"wx_pub","type":type});
    })
    //支付类型[1定金2尾款3全款]
}