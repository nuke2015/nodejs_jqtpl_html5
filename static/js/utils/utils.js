/**
 * 字符串序列化为对象
 * @method str2Args
 * @param {String} 待分割字符串
 * @param {String} 分隔符
 */
var helper = {
    timerInterval: null, //用于倒计时
    curr_user: {}, //当前登录用户信息
    accUrl: "/chataccess", //时时请求聊天的地址
    //时时请求聊天的数据
    accData: {
        order: 4
    },
    //进入首页
    jump_index: function() {
        window.location = '/wandan/html/newIndex.html';
    },
    str2Args: function(query, split) {
        var args = {};
        query = query || '';
        split = split || '&';
        var pairs = query.split(split);
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            var argname = pairs[i].substring(0, pos).replace(/amp;/, "");
            var value = pairs[i].substring(pos + 1);
            args[argname] = decodeURIComponent(value);
        }
        return args;
    },
    /**
     * 将Object转换为字符串参数
     * @method args2Str
     * @param {Object} args 需要转换的对象
     * @param {String} split 分隔符，默认是&
     * @return String 字符串参数
     */
    args2Str: function(args, split) {
        split = split || '&';
        var key, rtn = '',
            sp = '';
        for (key in args) {
            //value为空的忽略
            if (args[key]) {
                rtn += (sp + key + '=' + encodeURIComponent(args[key]));
                sp = split;
            }
        }
        return rtn;
    },
    jsonObjParams2Str: function(params, link) {
        if (!link) {
            link = "&";
        }
        var argsstr = '';
        for (key in params) {
            //value为空的忽略
            if (params[key]) {
                var tmpstr = key + '=' + params[key];
                tmpstr += '&';
                argsstr += tmpstr;
            }
        }
        return argsstr;
    },
    showMsg: function(msg) {
        toast.show(msg);
    },
    isWeiXin: function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    isHttps: function() {
        var url = window.location.href;
        var isHttps = url.toUpperCase().indexOf("HTTPS");
        if (isHttps > -1) {
            return true;
        }
        return false;
    },
    gotoLogin: function() {
        //zylogin.loginController({type:0});
        //location.href = 'http://mtq.yy.com/login?where='+encodeURIComponent(location.href);
        //helper.showMsg("用户未登录");
        location.href = 'http://' + TQ._domains.main + '/html/bindphone.html?topage=' + encodeURIComponent(location.href);
    },
    getProtocol: function() {
        if (helper.isHttps()) {
            return "https"
        }
        return "http";
    },
    preventBackgroundScroll: function() {
        $("body,html").css({
            "overflow": "hidden"
        });
    },
    resumeBackgroundScroll: function() {
        $("body,html").css({
            "overflow": "auto"
        });
    },
    setTitle: function(t) {
        var $body = $('body');
        document.title = t;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/fav.ico" height="0"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body);
    },
    set5Score: function(v, totalscore, width) {
        //console.log("come set5Score");
        //console.info((v,totalscore,width));
        var t = (v * width * 100) / (totalscore * 100);
        //console.info(t);
        return t;
    },
    level2Txt: function(level) {
        var txt = "";
        if (level == 3) {
            txt = "三星月嫂";
        } else if (level == 4) {
            txt = "四星月嫂";
        } else if (level == 5) {
            txt = "五星月嫂";
        } else if (level == 6) {
            txt = "金牌月嫂";
        } else if (level == 7) {
            txt = "皇冠月嫂";
        }
        return txt;
    },
    level2Cls: function(level) {
        var txt = "jjys-big-start5";
        if (level == 3) {
            txt = "jjys-big-start3";
        } else if (level == 4) {
            txt = "jjys-big-start4";
        } else if (level == 5) {
            txt = "jjys-big-start5";
        } else if (level == 6) {
            txt = "jjys-big-start6";
        } else if (level == 7) {
            txt = "jjys-big-start7";
        }
        return txt;
    },
    //****************************************************************
    //* 名　　称：IsEmpty
    //* 功    能：判断是否为空
    //* 入口参数：fData：要检查的数据
    //* 出口参数：True：空
    //*           False：非空
    //*****************************************************************
    isEmpty: function(v) {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break;
            case 'boolean':
                if (!v) return true;
                break;
            case 'number':
                if (0 === v || isNaN(v)) return true;
                break;
            case 'object':
                if (null === v || v.length === 0) return true;
                for (var i in v) {
                    return false;
                }
                return true;
        }
        return false;
    },
    isAndroid: function() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
            return true;
        }
        return false;
    },
    isIOS: function() {
        var u = navigator.userAgent;
        if (u.indexOf('iPhone') > -1) { //安卓手机
            return true;
        }
        return false;
    },
    showPage: function(page, params, hashparams) {
        if (this.isEmpty(params)) {
            if (this.isEmpty(hashparams)) {
                window.location.href = page;
            } else {
                window.location.href = page + "#" + this.jsonObjParams2Str(hashparams);
            }
            return;
        }
        if (this.isEmpty(hashparams)) {
            window.location.href = page + "?" + this.jsonObjParams2Str(params);
        } else {
            window.location.href = page + "?" + this.jsonObjParams2Str(params) + "#" + this.jsonObjParams2Str(hashparams);
        }
    },
    changeHash: function(hashparams) {
        var arr = window.location.href.split("#");
        window.location.href = arr[0] + "#" + this.jsonObjParams2Str(hashparams);
    },
    /***
     * 本地化存储数据，
     * @param key   string类型
     * @param obj   存储非函数类型的对象，不深度拷贝
     * @private
     */
    _store: function(key, obj) {
        var value;
        // 因为open_id和手机号是关系断开的,所以,暂时用localstorage忽悠一下.
        //优先使用localstorege,其次使用cookie,
        if (window.localStorage) {
            if (obj) {
                if (typeof obj == "object") {
                    window.localStorage.setItem(key, JSON.stringify(obj));
                } else if (typeof obj == "string") {
                    window.localStorage.setItem(key, obj);
                } else {
                    alert("_storeByBrowser:你存储的是非对象");
                }
            } else {
                try {
                    value = JSON.parse(window.localStorage.getItem(key));
                } catch (e) {
                    return window.localStorage.getItem(key);
                }
            }
        } else { //使用cookie
            TQ.cookie('test', 'test');
            if (!document.cookie || document.cookie == '') {
                //alert('请设置您的浏览器支持cookie以便正常访问');暂时放空
                if (obj) {
                    value = TQ._store(key, obj);
                } else {
                    value = TQ._store(key);
                }
            } else {
                if (obj) {
                    if (typeof obj == "object") {
                        value = TQ.cookie(key, JSON.stringify(obj));
                    } else if (typeof obj == "string") {
                        value = TQ.cookie(key, obj);
                    } else {
                        alert("_storeByBrowser:你存储的是非对象");
                    }
                } else {
                    try {
                        value = JSON.parse(TQ.cookie(key));
                    } catch (e) {
                        value = TQ.cookie(key);
                    }
                }
            }
        }
        return value;
    },
    /**
     * 获取url参数字段
     */
    getUrlParams: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return decodeURIComponent(r[2]);
        return null; //返回参数值
    },
    //获取字符串的长度(区分中英文)
    Bytelen: function(str) {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },
    isLogin: function() {
        var identityObj = helper._store("identity");
        if (!helper.isEmpty(identityObj)) {
            if (!helper.isEmpty(identityObj.user_id)) {
                return true;
            }
        }
        return false;
    },
    //计算对象成员个数
    countObjNum: function(o) {
        var n = 0;
        for (var i in o) {
            n++;
        }
        return n;
    },
    /**
     * 动态显示时间
     * @param timetamp  时间差
     * @param model  要显示时间的标签的ID属性
     */
    getTimeStr: function(timetamp, model) {
        var day = "0";
        var hour = "0";
        var minute = "0";
        var second = "0";
        if (timetamp > 24 * 3600) {
            day = parseInt(timetamp / (24 * 60 * 60));
        }
        var dayMillisecond = day * 24 * 60 * 60;
        if ((timetamp - dayMillisecond) > 60 * 60) {
            hour = parseInt((timetamp - dayMillisecond) / (60 * 60));
            hour = hour < 10 ? "0" + hour : hour;
        }
        var hourMillisecond = hour * 60 * 60;
        if ((timetamp - dayMillisecond - hourMillisecond) > 60) {
            minute = parseInt((timetamp - dayMillisecond - hourMillisecond) / (60));
            minute = minute < 10 ? "0" + minute : minute;
        }
        var minuteMillisecond = minute * 60;
        if ((timetamp - dayMillisecond - hourMillisecond - minuteMillisecond) > 1) {
            second = parseInt((timetamp - dayMillisecond - hourMillisecond - minuteMillisecond));
            second = second < 10 ? "0" + second : second;
        }
        time = timetamp - 1;
        var timeStr = day + "天" + hour + "时" + minute + "分" + second + "秒";
        $("#" + model).html(timeStr);
        if (time <= 0) {
            $("#" + model).html("活动已截止");
            window.clearInterval(clock);
        }
    },
    /**
     * 展示公共关注弹层
     */
    showPubGuanZhu: function() {},
    //获取字符串的长度(区分中英文)
    Bytelen: function(str) {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },
    /**
     * 倒计时
     * timestamp:2015-03-12 12:12:12
     */
    timer: function(timestamp, module) {
        var _this = this;
        var timeArr = timestamp.split(' ');
        var time1 = timeArr[0].split('-');
        var time2 = timeArr[1].split(':');
        var year = parseInt(time1[0], 10);
        var month = parseInt(time1[1], 10);
        var day = parseInt(time1[2], 10);
        var hour = parseInt(time2[0], 10);
        var minute = parseInt(time2[1], 10);
        var second = parseInt(time2[2], 10);
        var ts = (new Date(year, (month - 1), day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数
        if (ts <= 0) {
            window.clearInterval(_this.timerInterval);
            if (($('#reward-tip-exipre').is(':visible'))) {
                $('#reward-tip-exipre').hide();
                $('#none-reward-tip').show();
            }
        } else {
            var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
            var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
            var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
            var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
            dd = _this.checkTime(dd);
            hh = _this.checkTime(hh);
            mm = _this.checkTime(mm);
            ss = _this.checkTime(ss);
            var timeStr = dd + "天" + hh + "时" + mm + "分" + ss + "秒";
            if (module == 'xuanshang') {
                $('#reward-exipre-time').html(timeStr);
                if (!($('#reward-tip-exipre').is(':visible'))) {
                    $('#reward-tip-exipre').show();
                    $('#none-reward-tip').hide();
                }
            }
        }
    },
    //检测时间
    checkTime: function(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },
    //显示悬赏倒计时
    showTimer: function(timestamp, module) {
        var _this = this;
        //默认触发
        _this.timer(timestamp, module);
        _this.timerInterval = window.setInterval("helper.timer('" + timestamp + "', '" + module + "')", 1000);
    }
};
//点击触发弹窗
$('body').on('click', '.j-popup-handle', function() {
    //helper.preventBackgroundScroll();
    //$(this).popup();
});
//判断是否是微信
function is_weixin() {
    if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    return false;
}
//初始化分享弹窗
function publicInitSharePos(selector, func) {
    //看是否已经存在分享弹框
    var popObj = $(".popup-cover.js-share");
    if (!popObj.length) { //如果没有弹窗，则增加
        var html_str = '\
        <div class="popup-cover bg-op06 js-share hide" style="z-index: 110;opacity: 0.7;background-color: #000000;">\
               <div><img src="../img/pop/sharearrow.png" alt=""/></div>\
                <div class="fs24 white m-auto tac">马上分享给小伙伴们吧，<br> 让我们一起来嗨～</div>\
        </div>\
        ';
        $("body").append(html_str);
    }
    $(selector).click(function() {
        $(".js-share").show();
        func(this);
    });
    $(".js-share").click(function() {
        $(".js-share").hide();
    });
}
//微信分享初始化
function doShare(wxParams, wxShareConfig) {
    wx.config({
        debug: wxShareConfig.debug,
        appId: wxShareConfig.appId,
        timestamp: wxShareConfig.timestamp,
        nonceStr: wxShareConfig.nonceStr,
        signature: wxShareConfig.signature,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    });
    var wxData = {
        imgUrl: wxParams.icon,
        link: wxParams.link,
        title: wxParams.title,
        desc: wxParams.desc,
    };
    wx.ready(function doWeixinShare() {
        wx.onMenuShareTimeline(wxData);
        wx.onMenuShareAppMessage(wxData);
        wx.onMenuShareQQ(wxData);
        wx.onMenuShareWeibo(wxData);
    });
}
//瀑布流滚动加载
function _reachBottom() {
    var clientHeight = 0;
    var scrollHeight = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (scrollTop + clientHeight + 100 > scrollHeight && clientHeight != scrollHeight) {
        return true;
    } else {
        return false;
    }
}

function getRandomArrItem(arr) {
    if (helper.isEmpty(arr)) {
        return "";
    }
    return arr[Math.round(Math.random() * arr.length)];
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var showMsg = function(msg) {
    toast.show(msg);
};
var doRequestwithnoheader = function(req, handler, errorHandler) {
    var defer = $.Deferred();
    //console.log("come doRequestwithnoheader");
    if (req) {
        // 注入自然指纹
        var identityObj = helper._store("identity");
        if (!helper.isEmpty(identityObj)) {
            if (req.user_id == "xx") { //传入user_id时，定义为不需要验证用户身份的接口
                req.user_id = "";
            } else {
                req.user_id = identityObj.user_id;
            }
            req.token = identityObj.token;
        } else {
            req.user_id = "";
        }
        // 注入公众号相关指纹
        var identityObj_weixin = helper._store("weixin_token");
        if (!helper.isEmpty(identityObj_weixin)) {
            if (req.open_id == "xx") { //传入open_id时，定义为不需要验证用户身份的接口
                req.open_id = "";
            } else {
                req.open_id = identityObj_weixin.open_id;
            }
        } else {
            req.open_id = "";
        }
    }
    console.log("ajax-req:", req);
    $.ajax({
        type: 'post',
        url: TQ._domains['api'] + "/",
        data: req,
        dataType: 'json',
        success: function(res) {
            // console.log("ajax-res:", res);
            if (res && res.code == 0) {
                handler(res);
            } else {
                // 基于localstorage时,需要做登陆判断
                if (res.code == 10001) {
                    // 如果是错误的指纹,需要清指纹,并重新登陆
                    helper._store('identity', {});
                    helper.gotoLogin();
                }
                //console.log(res.code + res.msg);
                errorHandler(res);
                //showMsg(msg);
            }
        },
        error: function(xhr, type) {
                //defer.reject();
                if (errorHandler) {
                    errorHandler(xhr, type);
                    return;
                }
                showMsg('网络请求失败，请稍后再试!');
            }
            // headers:g_http_headers
    });
    return defer.promise();
}

function timeStampToDate(nS, f) {
    var newDate = new Date();
    newDate.setTime(parseInt(nS));
    if (!f) {
        f = 'yyyy-MM-dd';
    }
    return newDate.Format(f);
}

function dateToTimeStamp(stringTime) {
    //var stringTime = "2014-07-10 10:21:12";
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    //2014-07-10 10:21:12的时间戳为：1404958872
    //console.log(stringTime + "的时间戳为：" + timestamp2);
    //VM2548:6 2014-07-10 10:21:12的时间戳为：1404958872
    return timestamp2;
}
template.openTag = '<%';
template.closeTag = '%>';
template.helper('json2stringify', function(obj) {
    return JSON.stringify(obj);
});
template.helper('set5Score', function(v) {
    return helper.set5Score(parseFloat(v), 5, 120);
});
template.helper('level2Txt', function(l) {
    return helper.level2Txt(l);
});
template.helper('level2Cls', function(l) {
    return helper.level2Cls(l);
});
template.helper('getAge', function(y) {
    return new Date().getFullYear() - new Date(y).getFullYear();
});
template.helper('timeStampToDate', function(nS, f) {
    return timeStampToDate(nS * 1000, f);
});
template.helper('getDayBuy', function() {
    return g_params["day_buy"];
});
template.helper('numbertoFixed', function(score) {
    return score.toFixed(1);
});
template.helper('showNotFinished', function(len, sort) {
    if (len >= sort) {
        return "hide";
    }
    return "";
});
//支付了的就不能取消订单
template.helper('getCancelBtncls', function(process, status) {
    var grid = "";
    if (status > 1 || process > 0) {
        grid = "grid";
    }
    return grid;
});
template.helper('getBtncls', function(process) {
    var btncls = "";
    if (process == 5) {
        btncls = "green";
    } else {
        btncls = "red";
    }
    return btncls;
});
/**
 * status   tinyint(1) [1]  订单支付状态，1未付款，2预付款，3已付款，4已退款
 
 */
template.helper('getRightTopBtnText', function(status) {
    var btnText = "";
    if (status == 1) {
        btnText = "等待支付";
    } else if (status == 2) {
        btnText = "已付订金";
    } else if (status == 3) {
        btnText = "全款支付";
    } else if (status == 4) {
        btnText = "已退款";
    }
    return btnText;
});
/**
 * status   tinyint(1) [1]  订单支付状态，1未付款，2预付款，3已付款，4已退款
 
 */
template.helper('getRightTopBtncls', function(status) {
    var btnCls = "";
    if (status == 1) {
        btnCls = "red-btn";
    } else if (status == 2) {
        btnCls = "orange-btn";
    } else if (status == 3) {
        btnCls = "green-btn";
    } else if (status == 4) {
        btnCls = "green-btn";
    }
    return btnCls;
});
/**
 * 0未付款，1已付订金，2等待服务，3服务中，4服务结束，5待评论，6待结算，7已完成，8已取消，9退款中，10已退款
 * 6 7微信端均展示已完成
 */
template.helper('getBtnText', function(process) {
    var text = "";
    if (process == 10) {
        text = "已退款";
    } else if (process == 9) {
        text = "退款中";
    } else if (process == 8) {
        text = "已取消";
    } else if (process == 7) {
        //text = "已完成";
        text = "已评价";
    } else if (process == 6) {
        //text = "待结算";
        text = "已评价";
    } else if (process == 5) {
        //text = "评价服务";
        text = "已评价";
    } else if (process == 4) {
        text = "评价服务";
    } else if (process == 3) {
        text = "服务中";
    } else if (process == 2) {
        text = "等待服务";
    } else if (process == 1) {
        //text = "支付尾款";
        text = "支付尾款";
    } else if (process == 0) {
        //text = "未付款";
        text = "马上付款";
    }
    return text;
});
/**
 * 0未付款，1已付订金，2等待服务，3服务中，4服务结束，5待评论，6待结算，7已完成，8已取消，9退款中，10已退款
 * 6 7微信端均展示已完成
 */
template.helper('getBtnStatusText', function(process) {
    var text = "";
    if (process == 10) {
        text = "已退款";
    } else if (process == 9) {
        text = "退款中";
    } else if (process == 8) {
        text = "已取消";
    } else if (process == 7) {
        //text = "已完成";
        text = "已评价";
    } else if (process == 6) {
        //text = "待结算";
        text = "已评价";
    } else if (process == 5) {
        //text = "评价服务";
        text = "已评价";
    } else if (process == 4) {
        text = "服务完成";
    } else if (process == 3) {
        text = "服务中";
    } else if (process == 2) {
        text = "等待服务";
    } else if (process == 1) {
        //text = "支付尾款";
        text = "已付定金";
    } else if (process == 0) {
        //text = "未付款";
        text = "未付款";
    }
    return text;
});
/**
 * 0未付款，1已付订金，2等待服务，3服务中，4服务结束，5待评论，6待结算，7已完成，8已取消，9退款中，10已退款
 * 6 7微信端均展示已完成
 */
template.helper('myCon', function(obj) {
    console.log(obj);
});
template.helper('getBtnCancelShowCls', function(process) {
    var text = "hide";
    if (process == 0) {
        text = "";
    }
    return text;
});
/**
 * 0未付款，1已付订金，2等待服务，3服务中，4服务结束，5待评论，6待结算，7已完成，8已取消，9退款中，10已退款
 * 6 7微信端均展示已完成
 */
template.helper('getBtnRightShowCls', function(process) {
    var text = "hide";
    if (process == 0 || process == 1 || process == 4) {
        text = ""; //0 1 4显示
    }
    return text;
});
template.helper('getHead', function(url) {
    var urlStr = "";
    if (url != "") {
        urlStr = url;
        return urlStr;
    } else {
        urlStr = "../images/toux.png";
        return urlStr;
    }
});
var BirthDay = {
    openBirthDate: function() { //日期选择
        var self = this;
        var now = new Date();
        var days = {};
        var years = {}
        var months = {
            1: '1月',
            2: '2月',
            3: '3月',
            4: '4月',
            5: '5月',
            6: '6月',
            7: '7月',
            8: '8月',
            9: '9月',
            10: '10月',
            11: '11月',
            12: '12月'
        };
        for (var i = 1; i < 32; i += 1) {
            days[i] = i + "日";
        }
        for (i = now.getFullYear(); i < now.getFullYear() + 3; i += 1) {
            years[i] = i + "年";
        }
        SpinningWheel.addSlot(years, 'center', 2014);
        SpinningWheel.addSlot(months, 'center', 4);
        SpinningWheel.addSlot(days, 'center', 12);
        SpinningWheel.setCancelAction(self.cancel);
        SpinningWheel.setDoneAction(self.done);
        SpinningWheel.open();
    },
    done: function() {
        var results = SpinningWheel.getSelectedValues();
        console.info('values: ' + results.values.join(' ') + '<br />keys: ' + results.keys.join(', '))
        var y = results.keys[0];
        var m = results.keys[1];
        var d = results.keys[2];
        if (helper.isEmpty(y)) {
            helper.showMsg("请选择年份");
            return;
        }
        if (helper.isEmpty(m)) {
            helper.showMsg("请选择月份");
            return;
        }
        if (y && m && d) {
            if (m < 10) {
                m = "0" + m;
            }
            if (d < 10) {
                d = "0" + d;
            }
            var bir = y + "年" + m + "月" + d + "日";
            var birval = y + "-" + m + "-" + d;
            ////$("#age").html(bir);
            // PetInfo['birth']=y+""+m;
            // $(".js-birth-val").val(birval);
            $(".js-birth-ctn").html(bir);
            $(".js-birth-ctn").attr("val", birval);
        }
        $(".js-mask").css("display", "none");
        //_store("mypetinfoinput")._reInitSaveBtn();//保持原有逻辑不变
    },
    cancel: function() {
        console.info("cancel");
        $(".js-mask").css("display", "none");
    }
}
var t_paramsArr = window.location.href.split("?");
var g_paramsStr = t_paramsArr.length > 1 ? t_paramsArr[1] : "";
var g_params = helper.str2Args(g_paramsStr, "&");
var g_platform = ""; //默认浏览器
var g_userId = "";
var protocol = helper.getProtocol();
var host = window.location.host;
window.g_Domain = protocol + '://' + host + '/';
window.IMGCACHE_DOMAIN = protocol + '://' + host;
// 初始化
var identity = helper._store("identity") || {};
// 来自公众号的跳转会带有授权信息
if (!helper.isEmpty(g_params["open_id"])) {
    identity.open_id = g_params["open_id"];
    identity.open_id_token = g_params["open_id_token"];
    helper._store("weixin_token", identity);
}
//alert("g_params[open_id] = "+g_params["open_id"]+"--identity--"+identity["open_id"]);
//window.g_Domain = 'wx.aviclub.net';
//window.IMGCACHE_DOMAIN = 'wx.aviclub.net/images';
var csapi = "api.t.ddys168.com"; //测试环境api接口路径
var zsapi = "api.ddys168.com"; //正式环境api接口路径
window.TQ = {
    debug: function() {
        return true;
    },
    _domains: {
        main: host,
        imgcache: protocol + "://upload.ddys168.com",
        api: protocol + '://' + zsapi
    }
};
/**
 * 校验titleBar 是否显示
 * 公众号,手机浏览器,app内嵌.
 定制一个参数platform
 platform=1时,android app
 platform=2时,ios app
 platform=3时,公众号
 默认不传platform的时候,
 有可能是android浏览器/ios浏览器,因为这是用户手机,我们不好设计参数.
 */
function checkTitleBarShow() {
    if (helper.isEmpty(g_params["platform"])) {
        g_platform = g_params["platform"];
    }
    if (g_platform == "") { //浏览器
        //触屏版情况
        $(".js-title-bar").css("display", "block");
    } else if (g_platform == 1 || g_platform == 2 || g_platform == 3) {
        //客户端 微信公众号均无导航
    }
}
$(function() {
        checkTitleBarShow();
    })
    // toast
var toast = {
    toastArr: [],
    show: function(msg) {
        this.initToast();
        $('#toast .weui_toast_content').html(msg);
        $('#toast').show();
        setTimeout(function() {
            $('#toast').hide();
        }, 2000);
    },
    showLoading: function() {
        this.initToast();
        $('#loadingToast').show();
        setTimeout(function() {
            $('#loadingToast').hide();
        }, 2000);
    },
    initToast: function() {
        if (this.toastArr.length > 0) {
            return;
        }
        this.toastArr.push('<div id="toast">');
        this.toastArr.push('     <div class="weui_mask_transparent"></div>');
        this.toastArr.push('         <div class="weui_toast">        <i class="weui_icon_toast"></i>          <p class="weui_toast_content">已完成</p>     </div>');
        this.toastArr.push('</div>');
        this.toastArr.push('<div id="loadingToast" class="weui_loading_toast">')
        this.toastArr.push('<div class="weui_mask_transparent"></div>')
        this.toastArr.push('<div class="weui_toast">')
        this.toastArr.push('<div class="weui_loading">')
        for (var i = 0; i < 12; i++) {
            this.toastArr.push('<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>');
        }
        this.toastArr.push('</div>')
        this.toastArr.push('<p class="weui_toast_content">数据加载中</p>')
        this.toastArr.push('</div>')
        this.toastArr.push('</div>')
        this.toastArr.push('</div>')
        $("body").append(this.toastArr.join(" "));
    }
};
var dialog = {
        opt: {},
        htmlArr: [],
        /**
         * title  content  okBtn:{callback:func,text}  cancelBtn:{callback:func,text}
         */
        show: function(opt) {
            this.initDialog(opt);
        },
        initDialog: function(opt) {
            this.htmlArr.push('<div class="weui_dialog_confirm" id="wx_dialog" style="display: block;">');
            this.htmlArr.push('<div class="weui_mask"></div>');
            this.htmlArr.push('<div class="weui_dialog">');
            this.htmlArr.push('<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + opt.title + '</strong></div>');
            this.htmlArr.push('<div class="weui_dialog_bd">' + opt.content + '</div>');
            this.htmlArr.push('<div class="weui_dialog_ft">');
            this.htmlArr.push('<a href="javascript:;" class="weui_btn_dialog default js-wx-cancel-btn">' + opt.cancelBtn.text || '取消' + '</a>');
            this.htmlArr.push('<a href="javascript:;" class="weui_btn_dialog primary js-wx-ok-btn">' + opt.okBtn.text || '确定' + '</a>');
            this.htmlArr.push('</div>');
            this.htmlArr.push('</div>');
            this.htmlArr.push('</div>');
            $("body").append(this.htmlArr.join(" "));
            this.opt = opt;
            this.initEvent();
        },
        initEvent: function() {
            var self = this;
            $('.js-wx-cancel-btn').bind("click", function() {
                if (self.opt.cancelBtn && self.opt.cancelBtn.callback) {
                    self.opt.cancelBtn.callback();
                }
                $("#wx_dialog").remove();
            })
            $('.js-wx-ok-btn').bind("click", function() {
                if (self.opt.okBtn && self.opt.okBtn.callback) {
                    self.opt.okBtn.callback();
                }
                $("#wx_dialog").remove();
            })
        }
    }
    /***
     *
    dialog.show({
        title:"测试标题",
        content:"内容部内容部分内容部分内容部分内容部分内容部分分",
        okBtn:{
            text:"确认",
            callback:function(){
                alert("确认");
            }
        },
        cancelBtn:{
            text:"取消",
            callback:function(){
                alert("取消");
            }
        }
    }); */
    //自动检测标题
function autoCheckTitle(obj) {
    var $obj = $(obj);
    var value = $.trim($obj.val());
    getTitleTip(value);
}
var maxLen = 200;
var doubleMaxLen = maxLen * 2;

function getTitleTip(value) {
    var strLen = helper.Bytelen(value);
    if (strLen > doubleMaxLen) { //字数超过
        //$("#des-error").html('(<span style="color:red">超过'+maxLen+'字限制,超过部分将自动删除</span>)');
        $("#text-num").html(Math.ceil(strLen / 2));
    } else { //没有超过
        //$("#des-error").html('(<span style="color:red">限'+maxLen+'字</span>)');
        $("#text-num").html(Math.ceil(strLen / 2));
    }
}
//截取标题
function substringTitle(obj) {
    var $obj = $(obj);
    var value = $.trim($obj.val());
    var strLen = helper.Bytelen(value);
    if (strLen > doubleMaxLen) { //字数超过
        $obj.val(subString(value, doubleMaxLen, false));
    }
}
/**
 * 截取多余的字符串
 */
function subString(str, len, hasDot) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }
    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}
