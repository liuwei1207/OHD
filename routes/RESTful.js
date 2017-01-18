/**
 * RESTful.js
 * --------------------------------------------
 * 提供RESTful服务供前端调用
 * 作者: liuwei
 * 创建日期: 2017/01/11
 */

/**************************************************************************************** 代码主体 */

var express = require('express');
var router = express.Router();
require("../config/cache");

/**************************************************************************************** 路由管理 */

/**
 * session管理
 * --------------------------------------------
 */

// GET /session
router.get('/session', function(req, res, next) {
    res.send('session');
});

// POST /session
router.post('/session', function(req, res, next) {
    res.send('session');
});

// PUT /session
router.get('/session', function(req, res, next) {
    res.send('session');
});

// DELETE /session
router.post('/session', function(req, res, next) {
    res.send('session');
});

/**
 * 获取网络配置页面（networkOptions）数据
 * --------------------------------------------
 */

router.get('/pageDatas/:pageName', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');

    var pageName = req.params.pageName;
    var pageData = GLOBAL_CACHE.get(pageName);

    if (pageData) {
        res.send({
            "msg": 200,
            "data": JSON.stringify(pageData)
        });
    } else {
         res.send({
            "msg": false,
            "data": ""
        });
    }
});

module.exports = router; //对外暴露模块接口
