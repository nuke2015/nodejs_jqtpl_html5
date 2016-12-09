/**
 * Created by Administrator on 2016/5/30.
 */

var loading = false;

var api = {

    searchYSlist:function(){//evaluation   service
        if(loading){//正在加载状态
            return;
        }
        loading = true;
        doRequestwithnoheader(g_req,function(res){
        //success
            if(!helper.isEmpty(g_req.day_buy)){
                if(g_req.day_buy==0||g_req.day_buy==''){
                    helper.setTitle("26天住家月子服务");
                }else{
                    helper.setTitle(g_req.day_buy + "天住家月子服务");
                }
                
            }
            if(g_req.page==1){
                $(".js-yslist-ctn").html(template('ysitembody',res.data));
            }else{
                $(".js-yslist-ctn").append(template('ysitembody',res.data));
            }

            $(".js-ys-item").unbind("click").bind("click",function(){
                var item = $(this).attr("item");
                var itemObj = JSON.parse(item);
                window.location.href="/html/ysdetails.html?yuesao_id=" +itemObj.id ;
            })
            g_req.page++;
            loading = false;
        },function(res){
            g_req.page++;
        //error
            showMsg("error");
            loading = false;
        });
    },AddressAreainfo:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success
            $(".js-select-area").html(template('optiontmpl',res.data));
        },function(res){
            //error
            showMsg("error");
        });
    }
};
/****
 * 重新初始化筛选项数据对象
 */
function resetReq(){
    g_req.day_buy = $(".js-filter-day-ctn .filter-item-base.focus").attr("v")||"0";
    g_req.experience = $(".js-filter-expri-ctn .filter-item-base.focus").attr("v")||0;
    g_req.year = $(".js-filter-age-ctn .filter-item-base.focus").attr("v")||0;
    g_req.predict_day = tranTime($(".js-birth-ctn").attr("val"))||0;
    g_req.region = $("#js-select-area").val();
    g_req.force_desc =  $(".js-nav-item.focus .js-sort").attr("v")||0;
    g_req.page = 1;
}
/****
 * 根据g_req 初始化筛选项页面
 */
function renderPageView(){
   $(".js-filter-day-ctn .filter-item-base[v="+g_req.day_buy+"]").addClass("focus");
    $(".js-filter-expri-ctn .filter-item-base[v="+g_req.experience+"]").addClass("focus");
    $(".js-filter-age-ctn .filter-item-base[v="+g_req.year+"]").addClass("focus");
    //$(".js-filter-predict_day-ctn .filter-item-base[v="+g_req.predict_day+"]").addClass("focus");
    //g_req.region = $(".js-regionid").attr("v")||0;
}
function reSearchYSlist(){
    resetReq();
    api.searchYSlist();
}
/*******
 * 转换时间
 */
function tranTime(data){
    var str = data||'2013-08-30'; // 日期字符串
    str = str.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
    var time = date.getTime();
    return time;
}
var g_req = {};
if(!helper.isEmpty(g_params["title"])){
    helper.setTitle(g_params["title"]);
}else{
    helper.setTitle("26天住家月子服务");
}
$(function(){
    $(".js-filter-mask,.js-cancel-btn").bind("click",function(){
        //helper.resumeBackgroundScroll();
        $(".js-filter-mask").css("display","none");
        $(".js-filter-choose-ctn").slideUp();
    })

    $(".js-choose-btn").bind("click",function(){
        //helper.preventBackgroundScroll();
        $(".js-filter-mask").css("display","block");
        $(".js-filter-choose-ctn").slideDown();
    })

    $(".js-confirm-btn").bind("click",function(){
        //helper.resumeBackgroundScroll();
        //重置搜索对象
        reSearchYSlist();
        $(".js-filter-mask").css("display","none");
        $(".js-filter-choose-ctn").slideUp();
    });
    $(".js-filter-day-ctn .filter-item-base").bind("click",function(){
        $(".js-filter-day-ctn .filter-item-base").removeClass("focus")
        $(this).addClass("focus");
    })

    $(".js-filter-expri-ctn .filter-item-base").bind("click",function(){
        $(".js-filter-expri-ctn .filter-item-base").removeClass("focus");
        $(this).addClass("focus");
    })
    $(".js-filter-mask").bind("click",function(ev){
        ev.stopImmediatePropagation();
        ev.preventDefault();
    });
    $(".js-filter-age-ctn .filter-item-base").bind("click",function(){
        $(".js-filter-age-ctn .filter-item-base").removeClass("focus");
        $(this).addClass("focus");
    })

      $(".js-nav-item").eq(1).bind("click",function(){
            var sortObj =  $(this).find(".js-sort");
            if($(sortObj).hasClass("sort-up")){
                $(sortObj).removeClass("sort-up").addClass("sort-down");
                $(sortObj).attr("v",0);
            }else{
                if($(sortObj).hasClass("sort-down")){
                    $(sortObj).removeClass("sort-down").addClass("sort-up");
                    $(sortObj).attr("v",1);
                }
            }       
        g_req.list_order = $(this).attr("list_order");
        reSearchYSlist();
    });
    
    $(".js-nav-item:not(1)").bind("click",function(){       
        $(".js-nav-item").removeClass("focus");
        $(this).addClass("focus");       
        g_req.list_order = $(this).attr("list_order");
        reSearchYSlist();
    });

  
    /*****选择日期***/
    $(".js-birth-ctn").bind("click",function(){
        BirthDay.openBirthDate();
        $("#sw-wrapper").css("display","none");
        //$(".js-choose-birth").removeClass("hide");
        var s = 0;
        if(helper.isAndroid()){
            s = 100;
        }
        setTimeout(function(){
            $(".js-mask").css("display","block");
            $("#sw-wrapper").css("display","block");
        },s);
    });
    //searchYSlist

    /*methodName	Y	YuesaoIndex	接口方法名
     version	Y	2	接口版本号
     list_order	N		列表排序方式 [1综合2价格3评分]
     predict_day	Y		预产期
     predict_day_more	N		预产期后有档期
     experience	N		经验
     year	N		年龄
     region	N		籍贯
     force_desc	N		列表排序[1降序,0升序]
     day_count	Y		套餐天数*/

    g_req.methodName = "YuesaoIndex";//Y
    g_req.version = "2";//Y
    g_req.list_order = "1";
    g_req.predict_day = g_params["predict_day"]||"";//Y
    g_req.experience = g_params["experience"]||0;
    g_req.year = g_params["year"]||0;
    g_req.region = g_params["region"]||0;
    g_req.force_desc = "1";
    g_req.user_id="xx";
    g_req.day_buy = g_params["day_buy"]||0;//Y
    g_req.page=1;
    g_req.size=20;

    renderPageView();//初始化选择界面
    api.searchYSlist();
    api.AddressAreainfo({"methodName":"AddressYuesao","version":2});
});

window.onscroll = function (){
    if(_reachBottom()){
        api.searchYSlist();
    }
};