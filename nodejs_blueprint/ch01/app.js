const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

const index = require('./server/routes/index');
const users = require('./server/routes/users');

const mongoose = require('mongoose'); // 몽구스 ODM
const session = require('express-session'); // 세션 저장용 모듈
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');

// DB 설정
let config = require('./server/config/config.js');
mongoose.connect(config.url); // DB 연결
// 몽고DB가 실행 중인지 체크
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
// 패스포트 설정
require('./server/config/passport')(passport);

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// 패스포트용 세션 비밀키
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    // express-session과 connect-mongo를 이용해 몽고DB에 세션 저장
    store: new MongoStore({
        url: config.url,
        collection: 'sessions'
    })
}));
app.use(passport.initialize()); // 패스포트 인증 초기화
app.use(passport.session()); // 영구적인 로그인 세션
app.use(flash()); // 플래시 메시지

app.use('/', index);
app.use('/users', users);

// 404 에러가 잡히면 에러 핸들러에 전송
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 에러 핸들러
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});
