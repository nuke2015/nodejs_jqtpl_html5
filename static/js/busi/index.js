/**
 * Created by Administrator on 2016/5/30.
 */



var api = {
    /**
     * methodName	Y	YuesaoHome	接口方法名
     version	Y	2	接口版本号
     user_id	N
     * @param req
     */
    getYuesaoHome:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
        //success
            //初始化barnner部分
            $(".js-swiper-ctn").html(template('swipebody',res.data));
            var mySwiper = new Swiper ('.swiper-container', {
                autoplay:3000,
                loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination'
            })
            //初始化住家月子服务
            $(".js-home-ctn").html(template('homeservicebody',res.data));
            //初始化住院月子服务
            $(".js-hospital-ctn").html(template('hospitalservicebody',res.data));
            //初始化service服务
            $(".js-service-ctn").html(template('servicebody',res.data));
            $(".js-specialAd").html(res.data.xiadanlijian.title).hide();

            initEvent();
            /***
             * banner本身是个数组,支持多图滚动.
             根据type的值不一样,做不同的行为响应.
             type[1直接跳转到网页,2跳转到月嫂筛选页,3跳转到月嫂详情页]
             因为不同的跳转行为,各自需要的扩展参数不一样,
             所以,统一存储到extend里面.
             */
        },function(res){
        //error
            showMsg("error");
        });
    },
    getUserInfo:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            g_obj = res.data;
            /*
             "user_id": 1,
             "predict_day": 0,
             "status": 1
             */
        },function(res){
            //error
            showMsg("error");
        });
    },
    setUserInfo:function(){//evaluation   service
        doRequestwithnoheader(g_obj,function(res){
            /*
             "user_id": 1,
             "predict_day": 0,
             "status": 1
             */
            console.log("come doRequestwithnoheader");
        },function(res){
            //error
            showMsg("error");
        });
    }
};
var g_obj = {};


function initEvent(){
    $(".js-link2yslist-item").bind("click",function(){
        var item = $(this).data("item");
        var day = item.day;
        var title = item.title;
        //day_buy
        window.location.href="/html/yslist.html?day_buy="+day+"&title="+title;
    });
    $(".js-link-bytype").bind("click",function(){
        var item = $(this).data("item");
        var title = item.title;
        var extend = item.extend;
        if(item.type==2){
            window.location.href="/html/yslist.html?day_buy="+extend.day_buy+"&title="+title;
        }else if(item.type==1){
            window.location.href=extend.url;
        }else if(item.type==3){
            window.location.href="/html/ysdetails.html?day_buy="+extend.day_buy+"&yuesao_id="+extend.yuesao_id;
        }
    })
}
BirthDay.done = function () {
    console.log("come?");
    var results = SpinningWheel.getSelectedValues();
    console.info('values: ' + results.values.join(' ') + '<br />keys: ' + results.keys.join(', '))
    var y = results.keys[0];
    var m = results.keys[1];
    var d = results.keys[2];
    if(helper.isEmpty(y)){
        helper.showMsg("请选择年份");
        return;
    }
    if(helper.isEmpty(m)){
        helper.showMsg("请选择月份");
        return;
    }
    if(y && m&&d){
        if(m<10){
            m="0"+m;
        }
        if(d<10){
            d="0"+d;
        }
        var bir="宝宝的预产期为"+y+"年"+m+"月"+d+"日";
        var birval = y+"-"+m+"-"+d;
        ////$("#age").html(bir);
        // PetInfo['birth']=y+""+m;
        // $(".js-birth-val").val(birval);
        $(".js-birth-ctn").html(bir);
        $(".js-birth-ctn").attr("val",birval);
    }
    $(".js-mask").css("display","none");
    g_obj.methodName="UserInfoUpdate";
    g_obj.version = "2";
    g_obj.predict_day = dateToTimeStamp(birval);
    console.log("g_obj.predict_day:",g_obj.predict_day);
    api.setUserInfo()
    //_store("mypetinfoinput")._reInitSaveBtn();//保持原有逻辑不变

}

$(function () {
    //$('#picktime').mdatetimer({
    //    mode : 1, //时间选择器模式：1：年月日，2：年月日时分（24小时），3：年月日时分（12小时），4：年月日时分秒。默认：1
    //    format : 2, //时间格式化方式：1：2015年06月10日 17时30分46秒，2：2015-05-10  17:30:46。默认：2
    //    years : [2016, 2017], //年份数组
    //    nowbtn : true, //是否显示现在按钮
    //    onOk : function(){
    //        g_obj.methodName="UserInfoUpdate";
    //        g_obj.version = "2.0";
    //        g_obj.predict_day = dateToTimeStamp($('#picktime').val());
    //        api.setUserInfo();
    //    }
    //});

    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear, //开始年份
        endYear: currYear + 1 //结束年份
    };

    $("#USER_AGE").mobiscroll($.extend(opt['date'], opt['default']));
});