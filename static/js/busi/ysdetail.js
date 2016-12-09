/**
 * Created by Administrator on 2016/5/30.
 */



var api = {

    YuesaoView: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            //success


            if(helper.isLogin()){
                //console.log(res.data.is_collect);
                if(res.data.is_collect == 1){
                    $("#gz-x").attr("gz","true");
                    $("#gz-x").html("<img src='../images/yuesao_details/guanzhu1.png'>");
                }else{
                    $("#gz-x").attr("gz","false");
                    $("#gz-x").html("<img src='../images/yuesao_details/guanzhu.png'>");
                }
            }

            //is_collect

            //$(".js-yslist-ctn").html(template('ysitembody',res.data));
            $(".header").html(template('header', res.data));
            document.getElementById('theader').style.backgroundImage = "url('"+res.data.profile.image+"')";

            $(".line1_box").html(template('line1_box', res.data));
            $(".line2_box1").html(template('line2_box', res.data));
            $(".line2_box2").html(template('line2_box2', res.data));
            $(".line4_box").html(template('line4_box', res.data));
            // $(".line1_box").html(template('line1_box',res.data));
            initEvent();
            helper._store("ysitem",res.data);
        }, function (res) {
            //error
            showMsg("error");
        });
    },
    followYS: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            //success
            //showMsg("关注成功");
        }, function (res) {
            //error
            showMsg("error");
        });
    },
    YuesaoCommentList: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            //success
            $(".line8_box").html(template('line8_box', res.data));
            $(".line9_box").html(template('line9_box', res.data));


            /*var arrImg = [];
            for(var i=0;i<res.data.data.length;i++){
                var item = res.data.data[i];
                for(var j=0;j<item.image.length;j++){
                    arrImg.push(item.image[j]);
                }
            }*/

            $(".js-viewBigPic img").bind("click",function(){
                var src = $(this).attr("src");
                $(".js-view-big-ctn").css("display","block");
                $(".js-view-big-ctn img").attr("src",src);
                $(".js-view-big-mask").removeClass("hide");
            });

            $(".js-view-big-mask,.js-view-big-ctn").bind("click",function(){
                $(".js-view-big-mask").addClass("hide");
                $(".js-view-big-ctn").css("display","none");
            });
        }, function (res) {
            //error
            showMsg("error");
        });
    },
    // 月嫂分享
    WeixinAppShare: function(req) {
        doRequestwithnoheader(req, function(res) {
            var wxParams = res.data;
            var req = {
                "methodName": "WeixinShare",
                "version": "2.0",
                "refer_url": location.href
            }
            doRequestwithnoheader(req, function(res) {
                var wxShareConfig = res.data;
                doShare(wxParams, wxShareConfig);
                // 去公众号检查
            }, function() {
                // no error
            });
        }, function() {
            // no error
        });
    },
};
function initEvent() {
    // 公众号加载分享相关设置
    if (is_weixin) {
        var req = {
            "methodName": "AppShare",
            "version": "2.0",
            "yuesao_id": g_params["yuesao_id"]
        };
        api.WeixinAppShare(req);
    }
    $(".js-link-dangqi").bind("click", function() {
        window.location.href = "/html/calendar.html?yuesao_id=" + g_params["yuesao_id"];
    });
    $(".js-link-serviceinfo").bind("click", function () {
        window.location.href = "/html/serviceinfo.html";
    });

    $(".js-link-approve").bind("click", function () {
        var item = $(".js-ys-item").data("item");
        helper._store("ysitem",item);
        window.location.href = "/html/approveinfo.html?yuesao_id=" + g_params["yuesao_id"];
    });
    $(".js-link-fc").bind("click", function () {
        window.location.href = "/html/gzfc.html?yuesao_id=" + g_params["yuesao_id"];
    });

}
function tranTime(data) {
    var str = data || '2013-08-30'; // 日期字符串
    str = str.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
    var time = date.getTime();
    return time;
}
$(function () {
    $(".js-order-imme").bind("click", function () {
        if(!helper.isLogin()){helper.gotoLogin();return;}
        var item = $(".js-profile-item").data("item");
        helper._store("profileitem",item);
       // window.location.href = "/html/ordercommit.html?yuesao_id=" + g_params["yuesao_id"]+"&"+helper.args2Str(item);
        window.location.href = "/html/ordercommit.html?yuesao_id=" + g_params["yuesao_id"];

    });
    //关注
    $(".js-gz-btn").bind("click", function (ev) {

        if(!helper.isLogin()){helper.gotoLogin();return;}
        /*var img_src='../images/yuesao_details/guanzhu1.png';
        $(this).find('.xfl_1 img').attr('src',img_src);*/
        ev.stopImmediatePropagation();
        ev.preventDefault();

        if($("#gz-x").attr("gz") == "true"){
            $("#gz-x").attr("gz","false");
            $("#gz-x").html("<img src='../images/yuesao_details/guanzhu.png'>");
            showMsg("取消关注成功");
            api.followYS({"methodName": "YuesaoCollectCancel", "version": 2, "yuesao_id": g_params["yuesao_id"]});
        }else if($("#gz-x").attr("gz") == "false"){
            $("#gz-x").attr("gz","true");
            $("#gz-x").html("<img src='../images/yuesao_details/guanzhu1.png'>");
            showMsg("关注成功");
            api.followYS({"methodName": "YuesaoCollectInsert", "version": 2, "yuesao_id": g_params["yuesao_id"]});
        }

    })


    /****
     * 弹窒相关代码
     */
    $(".js-mykf").bind("click",function(){
        $(".js-pop-wind").slideDown();
        $(".js-pop-wind-mask").removeClass("hide");
    })
    $(".js-pop-wind .close-kf,.js-pop-wind-mask").bind("click",function(){
        $(".js-pop-wind").slideUp();
        $(".js-pop-wind-mask").addClass("hide");
    })

    var day_buy = g_params["day_buy"] || 26;
    api.YuesaoView({"methodName": "YuesaoView", "version": 2, "yuesao_id": g_params["yuesao_id"], "day_buy": day_buy});
    api.YuesaoCommentList({"methodName": "YuesaoCommentList", "version": 2, "yuesao_id": g_params["yuesao_id"]});

});