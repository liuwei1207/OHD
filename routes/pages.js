/**
 * pages.js
 * --------------------------------------------
 * 负责页面路由跳转管理
 * 作者: liuwei
 * 创建日期: 2017/01/11
 */

/**************************************************************************************** 代码主体 */

var express = require('express');
var router = express.Router();

/**************************************************************************************** 路由管理 */

// 登陆页面
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '登陆页面'
    });
});

// 网络配置页面
router.get('/networkOptions', function (req, res, next) {
    res.render('index', {
      title: '网络参数配置'
    });
});

// 设备版本管理页面
router.get('/deviceVersionManagement', function (req, res, next) {
  res.render('./deviceVersionManagement/index', {
      title: '设备版本管理'
    });
});

// 扩展设备配置页面
router.get('/extensionDeviceOptions', function (req, res, next) {
  res.render('./extensionDeviceOptions/index', {
      title: '扩展设备配置'
    });
});

// 扩展串口配置页面
router.get('/extensionSerialPortOptions', function (req, res, next) {
 res.render('./extensionSerialPortOptions/index', {
      title: '扩展串口配置'
    });
});

// 扩展串口状态页面
router.get('/extensionSerialPortStatus', function (req, res, next) {
 res.render('./extensionSerialPortStatus/index', {
      title: '扩展串口状态'
    });
});

// FM配置页面
router.get('/fmOptions', function (req, res, next) {
    res.render('./fmOptions/index', {
      title: 'FM配置'
    });
});

// 模块参数配置页面
router.get('/moduleParamsOptions', function (req, res, next) {
    res.render('./moduleParamsOptions/index', {
      title: '模块参数配置'
    });
});

// 流媒体配置页面
router.get('/streamMediaOptions', function (req, res, next) {
    res.render('./streamMediaOptions/index', {
      title: '流媒体配置'
    });
});

// 流媒体配置页面
router.get('/streamMediaOptions', function (req, res, next) {
    res.render('./streamMediaOptions/index', {
      title: '流媒体配置'
    });
});

/************************************************************************************** ／路由管理 */

module.exports = router;//对外暴露模块接口
