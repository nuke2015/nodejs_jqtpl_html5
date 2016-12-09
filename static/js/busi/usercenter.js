/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    initUserInfo:function(req){
        doRequestwithnoheader(req,function(res){
            $(".js-userinfo-ctn").html(template('usercenterinfobody',res.data));
        },function(res){
            //error
            showMsg("error");
        });
    }
};

$(function(){
    api.initUserInfo({"methodName":"UserInfo","version":2});
    $(".js-menu-item").bind("click",function(){
        var l = $(this).attr("d-link");
        if(l==1){
            window.location.href = "/html/myorderlist.html";
        }else if(l==2){
            window.location.href = "/html/myfollowlist.html";
        }else if(l==4){
            window.location.href = "/html/aboutus.html";
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

})

//function timeStampToDate(nS,f) {
//    var newDate = new Date();
//    newDate.setTime(parseInt(nS));
//    if(!f){
//        f = 'yyyy-MM-dd';
//    }
//    return newDate.format(f);
//}
