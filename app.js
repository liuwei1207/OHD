/**
 * app.js
 * --------------------------------------------
 * node程序入口文件
 * 作者: liuwei
 * 创建日期: 2017/01/11
 */

/**************************************************************************************** 代码主体 */

var express = require('express');
var http = require('http')
var config = require('./config/config');
var tcp = require('./config/tcp');

var app = express();

module.exports = require('./config/express')(app, config);

var server = app.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
});

var io = require('socket.io').listen(server);

var socketio = require('./config/socketio')(io);
