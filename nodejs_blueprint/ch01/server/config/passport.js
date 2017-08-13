// 패스포트 모듈 로드
const LocalStrategy = require('passport-local').Strategy;
// user 모델 가져오기
const User = require('../models/user');

module.exports = (passport) => {
    // 패스포트 초기화 설정
    // 세션을 위해 user 직렬화
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //역직렬화
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    // local strategy 사용
    passport.use('local-login', new LocalStrategy({
        // 사용자명과 패스워드의 기본값
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        if (email)
            email = email.toLowerCase();
        // 비동기로 처리
        process.nextTick(() => {
            User.findOne({'local.email': email}, (err, user) => {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                else // 모든 것이 문제 없다면 user 가져오기
                    return done(null, user);
            });
        });
    }));
    // local strategy 등록
    passport.use('local-signup', new LocalStrategy({
        // 사용자명과 패스워드의 기본값
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        if (email)
            email = email.toLowerCase();
        // 비동기로 처리
        process.nextTick(() => {
            // 유저가 아직 로그인하지 않았다면
            if (!req.user) {
                User.findOne({'local.email': email}, (err, user) => {
                    if (err)
                        return done(err);
                    if (user) { // 이메일 중복 검사
                        return done(null, false, req.flash('signupMessage', 'The email is already taken.'));
                    } else {
                        // user 생성
                        let newUser = new User();
                        newUser.local.name = req.body.name;
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        // 데이터 저장
                        newUser.save((err) => {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                return done(null, req.user);
            }
        });
    }));
};