exports.index = function(req, res) {
    var param = {
        methodName: 'HomeIndex',
        version: '4.0'
    };
    // dump(param);
    sendpost(param, function(err, data, body) {
        json = JSON.parse(body);
        // dump(json.data);
        res.render("index", json.data);
    });
};
exports.redirect = function(req, res) {
    // res.redirect('/html');
}
exports.login = function(req, res) {
    var data = {
        sign: md5('md5xxxxxxx'),
    };
    res.render('login', data);
}
// 辅助函数
function md5(str) {
    var md5 = require('crypto').createHash('md5');
    return md5.update(str).digest('hex');
}