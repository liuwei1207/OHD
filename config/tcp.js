/**
 * tcp.js
 * --------------------------------------------
 * 和设备的tcp通信
 * 作者: liuwei
 * 创建日期: 2017/01/12
 */

/**************************************************************************************** 代码主体 */
var config = require("./config");

var net = require('net');
var io = require('socket.io')
var to_json = require('xmljson').to_json;
//var to_json = require('xmljson').to_json;
require("./cache");
var expire = 1000 * 60 * 5; //5分钟没数据 即清空缓存， 页面可以直观得到显示！

// 断线重连机制
var retry = null; //重置定时器
var timer = 5; //重连时间
var n = 0; //重连计数器

// TCP地址
var HOST = config.tcp.HOST;
var PORT = config.tcp.PORT;

//实时数据通道
global.tcpServer = new net.Socket();

tcpServer.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据
    tcpServer.write('[START0043]{"type":"login","login":"who","pwd":"xxxx"}[END]'); // server login
});

tcpServer.on('data', function(data) {
    // 这里对收到每一个片段包的数据进行解析处理
    // 将解析出的值存入全局缓存下的对应页面属性中

    var json = to_json(data, function(error, json) {
        var newDataStr = JSON.stringify(json);
        var oldDataStr = JSON.stringify(GLOBAL_CACHE.get("networkOptions"));

        if (newDataStr == oldDataStr) {
            // console.log('数据未改变');
            // 数据未改变，不做任何处理。
        } else {
            // console.log('数据改变');
            GLOBAL_CACHE.set("networkOptions", json, expire);
            if (SOCKET) {
                SOCKET.emit('networkOptions', json);
            }
        }
    });

});

//设置超时时间
tcpServer.setTimeout(1000 * 60 * 3, function() {
    console.log('客户端在' + 3 + 'min内未通信，将断开连接...');
});

//监听到超时事件，断开连接
tcpServer.on('timeout', function() {
    tcpServer.end();
});

// 为客户端添加"close"事件处理函数
tcpServer.on('close', function(had_error) {
    console.log('Connection closed ' + had_error);
    clearInterval(retry);
    retry = setInterval(reconnectToTcpSocketServer, 1000 * timer);
});

// 当 socket 另一端发送 FIN 包时，触发该事件。
tcpServer.on('end', function() {
    console.log('断开与服务器的连接');
});

// 捕捉客户端的异常
tcpServer.on('error', function(err) {
    if (err) {
        console.log("【错误】socket异常关闭" + err);
        clearInterval(retry);
        tcpServer.end();
        tcpServer.destroy();
        retry = setInterval(reconnectToTcpSocketServer, 1000 * timer);
    }
});

/**************************************************************************************** 方法事件 */

//tcp socket 断线重连
var reconnectToTcpSocketServer = function() {
    tcpServer.connect(PORT, HOST, function() {
        clearInterval(retry);
        ++n;
        console.log(n);
        console.log('RE-CONNECTED TO: ' + HOST + ':' + PORT);
        // 建立连接后立即向服务器发送数据，服务器将收到这些数据
        tcpServer.write('[START0043]{"type":"login","login":"who","pwd":"xxxx"}[END]'); // server login
    });

    //设置超时时间
    tcpServer.setTimeout(1000 * 60 * 3, function() {
        console.log('客户端在' + 3 + 'min内未通信，将断开连接...');
    });

    //监听到超时事件，断开连接
    tcpServer.on('timeout', function() {
        tcpServer.end();
    });
}
