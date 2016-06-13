//数据查看
dump = function(v) {
    console.log(v);
}
//接口网络请求
var request = require('request');
//demo
var url = "http://api.izhangchu.com";
// var url = "http://api.dianping.com";
// var url = "http://api.jiuage.com";
sendpost = function(param, callback) {
    request.post({
        url: url,
        form: param
    }, callback);
}
