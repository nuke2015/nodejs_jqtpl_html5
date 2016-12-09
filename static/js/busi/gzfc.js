/**
 * Created by Administrator on 2016/5/30.
 */




var api = {
    YuesaoShowList:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success
            $(".js-imglist-ctn").html(template('imgItem',res.data));
            if(res.data.data.length==0){
                $(".js-line5_box").remove();
                $(".tipsnone").css("display","block");
            }
        },function(res){
            //error
            showMsg("error");
        });
    }
}



$(function () {
    api.YuesaoShowList({"methodName":"YuesaoShowList","version":2,"yuesao_id":g_params["yuesao_id"]});
})

