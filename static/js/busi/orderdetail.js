/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    OrderWater:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            $(".js-orderstatus-ctn").html(template('orderstatus', res.data));
        },function(res){
        //error

        });
    },
    cancelOrder:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            //success  ˢ�µ�ǰ���
            showMsg(res.msg);
        },function(res){
            //error
            showMsg("error");
        });
    },
    OrderInfo:function(req){//evaluation   service
        doRequestwithnoheader(req,function(res){
            $(".js-orderinfo-ctn").html(template('orderbaseinfo', res.data));
            $(".js-fixed-ctn").html(template('orderbtnctn', res.data));
            initEvent();
        },function(res){
            //error

        });
    }
};
$(function() {
    api.OrderWater({"methodName":"OrderWater","version":2,"order_id":g_params["order_id"]});
    api.OrderInfo({"methodName":"OrderInfo","version":2,"order_id":g_params["order_id"]});
});

function initEvent(){
    $(".js-gotooperate").bind("click",function(ev){
        ev.stopImmediatePropagation();
        ev.preventDefault();
        var status = $(this).attr("status");
        //wx
        var process = $(this).attr("process");
        var order_id = $(this).attr("order_id");
        var day_buy = $(this).attr("day_buy");
        var pro_name = $(this).attr("pro_name");
        var yuesao_id = $(this).attr("yuesao_id");
        //���ǵ�������֧��������ͳһ��ҳ��֧��  status	tinyint(1) [1]	����֧��״̬��1δ���2Ԥ���3�Ѹ��4���˿�
        if(status==1||status==2){//�ȴ�֧���������β��
            window.location.href="/html/confirmpay.html?order_id="+order_id+"&day_buy="+day_buy+"&pro_name="+pro_name;;
            //api.initPayObj({"methodName":"OrderPayStart","version":2,"order_id":order_id,"channel":"wx_pub","type":status});
            return;
        }
        if(process==4){//�������󣬴�����״̬
            window.location.href="/html/givestar.html?order_id="+order_id+"&yuesao_id="+yuesao_id;
            return;
        }
    });
    $(".js-cancelorder").bind("click",function(ev){
        ev.stopImmediatePropagation();
        ev.preventDefault();
        if($(this).hasClass("grid")){
            return;
        }else{



            var order_id = $(this).attr("order_id");
            dialog.show({
                title:"��ܰ��ʾ",
                content:"��ȷ���Ƿ�Ҫȡ��ö���",
                okBtn:{
                    text:"ȷ��",
                    callback:function(){
                        api.cancelOrder({"methodName":"OrderPayCancel","version":2,"order_id":order_id});//�ݼ�д
                    }
                },
                cancelBtn:{
                    text:"ȡ��",
                    callback:function(){
                        //showMsg("ȡ��");
                    }
                }
            });
            //api.cancelOrder({"methodName":"OrderPayCancel","version":2,"order_id":order_id});//�ݼ�д
        }
    });
}