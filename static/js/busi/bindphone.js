/**
 * Created by Administrator on 2016/5/30.
 */
var api = {
    getCode: function(req) {
        doRequestwithnoheader(req, function(res) {
            //success
        }, function(res) {
            //error
            showMsg("error");
        });
    },
    loginCheck: function(req) {
        doRequestwithnoheader(req, function(res) {
            // api.WeixinBind(req);
            //success
            helper._store("identity", res.data);
            window.location.href = g_params["topage"];
        }, function(res) {
            //error
            showMsg("error");
        });
    },
    WeixinBind: function(req) {
        doRequestwithnoheader(req, function(res) {
            // 静默绑定
        }, function(res) {
            // 不要提示
        });
    }
};