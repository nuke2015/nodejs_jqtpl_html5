/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    OrderPrice: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            //success
            g_products = res.data.products;
            var item = helper._store("profileitem");
            $(".js-name").html(item.nickname);
            $(".js-tx-img").attr("src", item.headphoto);
            var product = getProduct(res.data.products);
            $(".js-select-days").html(template('optionday', res.data));
            $(".js-img-ctn").html(template('imgctn',item));
            $(".js-select-days .option").on("click", function () {
                $(".js-select-days .option").removeClass("active");
                $(this).addClass("active");
                //showMsg("点击了:"+$(this).data("key"));
                changeItem();
            });
            initPage(1, 26);
        }, function (res) {
            //error
            showMsg("error");
        });
    },
    OrderInsert: function (req) {//evaluation   service
        //if(!helper.isLogin()){helper.gotoLogin();return;}
        doRequestwithnoheader(req, function (res) {
            //success
            console.log("res!!!:",res);
            showMsg(res.msg);
            window.location.href="/html/confirmpay.html?order_id="+res.data.id+"&day_buy="+$(".js-select-days .option.active").data("key");
        }, function (res) {
            alert(res.msg);
            //error
        });
    }, QueryCode: function (req) {
        doRequestwithnoheader(req, function (res) {
            //success
            showMsg(res.msg);
            // window.location.href="/html/confirmpay.html?order_id="+res.data.order_id;
        }, function (res) {
            //error
            showMsg("error");
        });
    }
};
function changeItem() {
    var days = $(".js-select-days .option.active").data("key") || 0;
    var number = $(".js-number .option.active").data("key") || 0;
    initPage(number, days);
}
function initPage(number, days) {
    var product = getProduct(g_products, days);
    /***
     *"service_days": "42",
     "id": "11",
     "name": "42天住家月子服务",
     "one_price": "1260000",
     "two_price": "1512000",
     "market_price": "1500000",
     "group_id": "1",
     "level_id": "3",
     "status": "0"
     */
        //$(".js-tx-img").attr("src","");
    $(".js-service-name").html(product.name);
    helper.setTitle(product.name);
    if (number == 1) {
        $(".js-serviceprice").val(product.one_price);
    } else {
        $(".js-serviceprice").val(product.two_price);
    }
    //$(".js-marketprice").val(product.market_price);
    $(".js-number .option").each(function () {
        if ($(this).data("key") == number) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
    $(".js-select-days .option").each(function () {
        if ($(this).data("key") == days) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    })
}
var g_products = {};
var g_req = {};
function getProduct(products, days) {
    var product = {};
    for (var i = 0; i < products.length; i++) {
        if (i == 0) {
            product = products[i];
        } else {
            if (products[i].service_days == days)
                product = products[i];
        }
    }
    return product;
}
/**
 * methodName    Y    OrderInsert    接口方法名
 version    Y    2    接口版本号
 address_id    Y        地址id
 predict_day    Y        预约日期
 num    Y        宝宝个数
 product_id    Y        服务id
 yuesao_id    Y        月嫂id
 user_id    Y        用户id
 remark    Y        其它要求
 */
function initreqObj() {
    var days = $(".js-select-days .option.active").data("key") || 0;
    var number = $(".js-number .option.active").data("key") || 0;
    var product = getProduct(g_products, days);
    g_req.methodName = "OrderInsert";
    g_req.version = "2";
    g_req.predict_day = dateToTimeStamp($(".js-birth-ctn").attr("val"));
    g_req.num = number;
    g_req.product_id = product.id;
    g_req.yuesao_id = g_params["yuesao_id"];
    g_req.remark = $("#js-remark-val").val();
    //address_id
    g_req.phone = $("#js-phone-val").val();    ;
    g_req.nickname = $("#js-name-val").val();    ;
    //g_req.addrIds = "";
    g_req.address = $("#js-detailAddr-val").val();
}
$(function () {

    $(".js-number .option").on("click", function () {
        $(".js-number .option").removeClass("active");
        $(this).addClass("active");
        //showMsg("点击了:"+$(this).data("key"));
        changeItem();
    });

    $(".js-select-areat").on("click", function () {
        $(".cityss").css("display", "block").css("height", document.body.scrollHeight);
        helper.preventBackgroundScroll();
       // helper.resumeBackgroundScroll();
    });

    $(".js-submitorder-btn").bind("click", function () {
        console.log("come???");
        initreqObj();
        api.OrderInsert(g_req);
    });
    $("#formyCheckBox").on("click", function () {
        var val = $(this).data("val");
        if (val == "0") { //
            $(this).html("√");
            $(this).data("val", "1");
        } else {
            $(this).html("");
            $(this).data("val", "0");
        }
    });
    $(".js-code-item").bind("click",function(){
        helper.resumeBackgroundScroll();
        var areacode = $(this).attr("data-code");
        //$(".cityss").css("display", "none");
        $(".cityss").slideUp();
        $(".js-select-areat").text("广东省深圳市"+$(this).html()).css("color","#888888");
        g_req.provice = "103198";
        g_req.city = "103212";
        g_req.town = areacode;

    });
    /*****选择日期***/
    $(".js-birth-ctn").bind("click", function () {
        BirthDay.openBirthDate();
        $("#sw-wrapper").css("display", "none");
        //$(".js-choose-birth").removeClass("hide");
        var s = 0;
        if (helper.isAndroid()) {
            s = 100;
        }
        setTimeout(function () {
            $(".js-mask").css("display", "block");
            $("#sw-wrapper").css("display", "block");
        }, s);
    });

    //$('#picktime').mdatetimer({
    //    mode : 1, //时间选择器模式：1：年月日，2：年月日时分（24小时），3：年月日时分（12小时），4：年月日时分秒。默认：1
    //    format : 2, //时间格式化方式：1：2015年06月10日 17时30分46秒，2：2015-05-10  17:30:46。默认：2
    //    years : [2016, 2017], //年份数组
    //    nowbtn : true, //是否显示现在按钮
    //    onOk : function(){
    //        //g_obj.methodName="UserInfoUpdate";
    //        //g_obj.version = "2.0";
    //        //g_obj.predict_day = dateToTimeStamp($('#picktime').val());
    //        //api.setUserInfo();
    //    }
    //});


    api.OrderPrice({"methodName": "OrderPrice", "version": 2, "yuesao_id": g_params["yuesao_id"]});
    //showMsg("dd");
    //api.QueryCode({"methodName": "AddressAreainfo", "version": 2, "belong_code": "103212"});

})
/*order_id	Y		订单id
 type	Y		支付类型[1定金2尾款3全款]
 channel	Y		支付渠道*/


