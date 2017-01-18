/**
 * socketio.js
 * --------------------------------------------
 * websocket服务器
 * 作者: liuwei
 * 创建日期: 2017/01/13
 */

/**************************************************************************************** 代码主体 */

global.SOCKET = null;

require("./cache");

var user = "who",
    pass = "xxxx";

module.exports = function(io) {
    //socket连接
    io.on('connection', function(socket) {
        global.SOCKET = socket;
        socket.emit('networkOptions', GLOBAL_CACHE.get("networkOptions"));

        // 下发指令
        socket.on('setting', function(conf) {
            console.log(conf);
            if (tcpServer) {
                tcpServer.write(conf); // 设置指令下发给设备
            }
        });
    });
};
