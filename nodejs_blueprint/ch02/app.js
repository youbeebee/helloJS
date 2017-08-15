const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let swig = require('swig');

// 컨트롤러 삽입
const index = require('./controllers/index');
const bands = require('./controllers/band');
const users = require('./controllers/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.show);

// 밴드 목록과 생성에 대한 라우트 정의
app.get('/bands', bands.list);
app.get('/bands/:id', bands.byId);
app.post('/bands', bands.create);
app.put('/bands/:id', bands.update);
app.delete('/bands/:id', bands.delete);

// 유저 목록과 생성에 대한 라우트 정의
app.get('/users', users.list);
app.post('/users', users.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
