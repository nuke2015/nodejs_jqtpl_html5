/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    searchYSFollowlist:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
        //success
            $(".js-yslist-ctn").html(template('ysitembody',res.data));
            $(".js-cancelfollow").bind("click",function(){
                showMsg('取消关注成功')
                var yuesao_id = $(this).attr("yuesao_id");
                api.cancelFollow({"methodName":"YuesaoCollectCancel","version":2,"yuesao_id":yuesao_id});
            })
        },function(res){
        //error
            showMsg("error");
        });
    },
    cancelFollow:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success
            api.searchYSFollowlist({"methodName":"YuesaoCollectList","version":2});
        },function(res){
            //error
            showMsg("error");
        });
    }
};

$(function(){
    api.searchYSFollowlist({"methodName":"YuesaoCollectList","version":2});
});

