exports.index = function(req, res) {
    var param = {
        methodName: 'HomeIndex',
        version: '4.0'
    };
    dump(param);
    sendpost(param, function(err, data, body) {
        json = JSON.parse(body);
        dump(json.data);
        res.render("index", json.data);
    });
};