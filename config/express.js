/**
 * express.js
 * --------------------------------------------
 * node express框架配置
 * 作者: liuwei
 * 创建日期: 2017/01/11
 */

/**************************************************************************************** 代码主体 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var session = require('express-session');

var pages = require('../routes/pages');
var RESTful = require('../routes/RESTful');

module.exports = function(app, config) {

    var env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    // view engine setup

    app.set('views', config.root + '/dist/module');
    app.engine('.html', require('ejs').renderFile);
    app.set('view engine', 'html');

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(path.join(config.root + '/dist'))); // 设置静态资源文件目录

    app.use('/', pages);
    app.use('/api/v1', RESTful);

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('./common/error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });

    return app;
};
