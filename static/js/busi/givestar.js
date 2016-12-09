/**
 * Created by Administrator on 2016/5/30.
 */



var api = {
    /**
     * methodName    Y    YuesaoCommentInsert    接口方法名
     version    Y    2    接口版本号
     yuesao_id    Y        月嫂id
     content    Y        内容
     image[]    Y        图片多张
     user_id    Y        用户id
     order_id    Y        订单id
     score    Y        主要评分
     score_extend    N        附加评分
     * @param req
     */
    giveStar: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            //success
            showMsg(res.msg);
            window.location.href="/html/myorderlist.html";
        }, function (res) {
            //error
            showMsg(res.msg);
        });
    },
    OrderInfo: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            $(".js-img-ctn").html(template('baseinfotmpl',res.data));
        }, function (res) {
            //error
            showMsg("error");
        });
    }


};
function initBaseinfo(){
    api.OrderInfo({"methodName": "OrderInfo", "version": 2, "order_id": g_params["order_id"]});
}
//服务评价 start
function initStar(id, starpng, unstarpng) {
    var id = "#" + id;
    var self = this;
    initImg(id, $(id).attr('v'), starpng, unstarpng);
    $(id + " img").bind('click', function () {
        var v = $(this).attr('v');
        $(id).attr('v', v);
        initImg(id, v, starpng, unstarpng);
    });
}
    $('#star0').bind('click',function(){
        var v_num=$(this).attr('v');
        console.log(v_num)
        switch(v_num){
            case '5':$(this).prev().html('强烈推荐')
            break;
            case '4':$(this).prev().html('很满意')
            break;
            case '3':$(this).prev().html('满意')
            break;
            case '2':$(this).prev().html('一般')
            break;
            case '1':$(this).prev().html('差')
            break;               
        }
        console.log('ok')
    });
    

/***循环生成星星***/
function initImg(id, v, starpng, unstarpng) {
    $(id + " img").each(function () {
        var ev = $(this).attr('v');
        if (ev <= v) {
            if (starpng) {
                $(this).attr('src', starpng);
            } else {
                $(this).attr('src', '../img/fav40.png');
            }
        } else {
            if (unstarpng) {
                $(this).attr('src', unstarpng);
            } else {
                $(this).attr('src', '../img/fav40-grid.png');
            }
        }
    });
}
function checkForm(req) {
    if (helper.isEmpty(req.content)) {
        helper.showMsg("评价内容不能为空");
        return false;
    }
    if (helper.isEmpty(req.score)) {
        helper.showMsg("综合评分是必选项");
        return false;
    }
    return true;
}


$(function () {
    initStar('star0', "../img/fav60.png", "../img/fav60-grid.png");
    initStar('star1');
    initStar('star2');
    initStar('star3');
    initStar('star4');
    initStar('star5');
    $(".js-givestar-btn").bind("click", function () {
        var star0 = $("#star0").attr("v");
        var star1 = $("#star1").attr("v");
        var star2 = $("#star2").attr("v");
        var star3 = $("#star3").attr("v");
        var star4 = $("#star4").attr("v");
        var star5 = $("#star5").attr("v");
        var starArr = [];
        starArr.push(star1);
        starArr.push(star2);
        starArr.push(star3);
        starArr.push(star4);
        starArr.push(star5);
        var req = {};
        req.methodName = "YuesaoCommentInsert";
        req.version = "2";
        req.yuesao_id = g_params["yuesao_id"]||0;//从url中获取
        req.content = $("#notetext").val();

        req.image = [];
        $(".js-itempic").each(function(){
            var path = $(this).attr("path");
            req.image.push(path);
        })
        req.order_id = g_params["order_id"];//从url中获取
        req.score = star0;
        req.score_extend = starArr.join(",");
        if (checkForm(req)) {
            api.giveStar(req);
        }
    })
    $(".js-tongbu-ctn").bind("click",function(){
        if($(".js-tongbu-ctn .js-jjys-check").hasClass("jjys-check-focus")){
            $(".js-tongbu-ctn .js-jjys-check").removeClass("jjys-check-focus").addClass("jjys-check");
        }else{
            $(".js-tongbu-ctn .js-jjys-check").removeClass("jjys-check").addClass("jjys-check-focus");
        }
    })
    initBaseinfo();
})

