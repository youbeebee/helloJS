// 기본 모듈 불러오기
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// 멀터 불러오기
const multer = require('multer');
const upload = multer({dest: './public/uploads/', limits: {fileSize: 1000000, files: 1}});

// 홈 컨트롤러 불러오기
const index = require('./server/controllers/index');
// 로그인 컨트롤러 불러오기
const auth = require('./server/controllers/auth');
// 코멘트 컨트롤러 불러오기
const comments = require('./server/controllers/comments');
// 비디오 컨트롤러 불러오기
const videos = require('./server/controllers/videos');
// 이미지 컨트롤러 불러오기
const images = require('./server/controllers/images');

// 몽구스 ODM
const mongoose = require('mongoose');
// 세션 저장용 모듈
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// 패스포트와 경고 플래시 메시지 모듈 불러오기
const passport = require('passport');
const flash = require('connect-flash');
// app 변수로 익스프레스 애플리케이션 시작하기
const app = express();

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');
// DB 설정
const config = require('./server/config/config.js');
// DB 연결
mongoose.connect(config.url);
// 몽고DB가 실행 중인지 확인
mongoose.connection.on('error', () => {
	console.error('MongoDB 연결 에러. MongoDB가 실행중인지 확인하세요.');
});
// 패스포트 설정
require('./server/config/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
// public 디렉토리 설정
app.use(express.static(path.join(__dirname, 'public')));

// 패스포트용 세션용 비밀키
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    // express-session + connect mongo를 사용해 몽고DB에 세션 저장
    store: new MongoStore({
        url: config.url,
        collection : 'sessions'
    })
}));

// 패스포트 인증 초기화
app.use(passport.initialize());
// 영구적인 로그인 세션
app.use(passport.session());
// 플래시 메시지
app.use(flash());

// 애플리케이션 라우트들
// 인덱스 라우트
app.get('/', index.show);
app.get('/login', auth.signin);
app.post('/login', passport.authenticate('local-login', {
    // 성공하면ㅁ 프로필 페이지로, 실패하면 로그인 페이지로
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));
app.get('/signup', auth.signup);
app.post('/signup', passport.authenticate('local-signup', {
    // 성공하면 프로필 페이지로, 실패하면 가입 페이지로
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));

app.get('/profile', auth.isLoggedIn, auth.profile);

// 로그아웃 페이지
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// 코멘트 라우트 설정
app.get('/comments', comments.hasAuthorization, comments.list);
app.post('/comments', comments.hasAuthorization, comments.create);

// 비디오 라우트 설정
app.get('/videos', videos.hasAuthorization, videos.show);
app.post('/videos', videos.hasAuthorization, upload.single('video'), videos.uploadVideo);

// 이미지 라우트 설정
app.post('/images', images.hasAuthorization, upload.single('image'), images.uploadImage);
app.get('/image-gallery', images.hasAuthorization, images.show);

// 404 에러가 발생하면 에러 핸들러에 전송
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// 개발자용 에러 핸들러는 스택트레이스를 출력한다.
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 실무 환경에서는 스택트레이스를 보여주지 않는다.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});