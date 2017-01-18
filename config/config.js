/**
 * config.js
 * --------------------------------------------
 * server配置文件
 * 作者: liuwei
 * 创建日期: 2017/01/11
 */

/**************************************************************************************** 代码主体 */

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'ohm'
        },
        port: process.env.PORT || 3000,
        build: {
            index: path.resolve(__dirname, 'dist/index.html'),
            assetsRoot: path.resolve(__dirname, 'dist'),
            assetsSubDirectory: 'static',
            assetsPublicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
            productionSourceMap: true
        },
        dev: {
            port: 8080,
            proxyTable: {}
        },
        tcp: {
            HOST: '192.168.1.140',
            PORT: '10086'
        }
    },

    test: {
        root: rootPath,
        app: {
            name: 'ohm'
        },
        port: process.env.PORT || 3000,
        build: {
            index: path.resolve(__dirname, 'dist/index.html'),
            assetsRoot: path.resolve(__dirname, 'dist'),
            assetsSubDirectory: 'static',
            assetsPublicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
            productionSourceMap: true
        },
        dev: {
            port: 8080,
            proxyTable: {}
        },
        tcp: {
            HOST: '192.168.1.123',
            PORT: '10086'
        }
    },

    production: {
        root: rootPath,
        app: {
            name: 'ohm'
        },
        port: process.env.PORT || 3000,
        build: {
            index: path.resolve(__dirname, 'dist/index.html'),
            assetsRoot: path.resolve(__dirname, 'dist'),
            assetsSubDirectory: 'static',
            assetsPublicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
            productionSourceMap: true
        },
        dev: {
            port: 8080,
            proxyTable: {}
        },
        tcp: {
            HOST: '192.168.1.123',
            PORT: '10086'
        }
    }
};

module.exports = config[env];
