exports.index = function(req, res) {
    res.redirect('/html');
};
// 权限网关
exports.token = function(req, res) {
    var query=req.query;
    if (query.echostr) {
        res.render("token", {
            echostr: query.echostr
        });
    } else {
        res.render("token", {});
    }
}