var api = {
    YuesaoView: function (req) {//evaluation   service
        doRequestwithnoheader(req, function (res) {
            ysitem = res.data;
            $(".js-rztext-img-ctn").html(template('approvectn',ysitem));
            for(var i=0;i<ysitem.credit.charts.length;i++){
                var height =10;
                height = helper.set5Score(ysitem.credit.charts[i],100,170);
                $("[data-sort="+i+"]").css("height",height+"px");
            }
            var zy=0;
            var wy=0;
            var jn=0;
            var fl=0;
            for(var i=0;i<ysitem.credit.charts.length&&i<4;i++){
                zy+=parseFloat(ysitem.credit.charts[i]);
            }
            for(var i=4;i<ysitem.credit.charts.length&&i<8;i++){
                wy+=parseFloat(ysitem.credit.charts[i]);
            }
            for(var i=8;i<ysitem.credit.charts.length&&i<12;i++){
                jn+=parseFloat(ysitem.credit.charts[i]);
            }
            for(var i=12;i<ysitem.credit.charts.length&&i<16;i++){
                fl+=parseFloat(ysitem.credit.charts[i]);
            }
            $(".js-zy").html("专业护理:  "+(zy*0.3).toFixed(0)+"分");
            $(".js-wy").html("科学喂养:  "+(wy*0.3).toFixed(0)+"分");
            $(".js-jn").html("技能水平:  "+(jn*0.3).toFixed(0)+"分");
            $(".js-fl").html("护理背景:  "+(fl*0.1).toFixed(0)+"分");
            $(".js-zf").html("总分:  "+calCre(zy,wy,jn,fl).toFixed(0)+"分");
            $(".js-cert_list").html(template('cert_list',ysitem.credit));
            if((ysitem.credit.cert_list.length/3)>1&&(ysitem.credit.cert_list.length/3)<31){
                $(".js-cert_list-ctn").addClass("h520");
            }
        }, function (res) {
            //error
            showMsg("error");
        });
    }
};
function calCre(zy,wy,jn,fl){
    return zy*0.3+wy*0.3+jn*0.3+fl*0.1;
}
$(function () {
    var day_buy = g_params["day_buy"] || 26;
    api.YuesaoView({"methodName": "YuesaoView", "version": 2, "yuesao_id": g_params["yuesao_id"], "day_buy": day_buy});
})
