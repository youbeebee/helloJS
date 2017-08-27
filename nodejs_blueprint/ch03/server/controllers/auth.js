// 이메일에서 Gravatar 아이콘 얻기
const gravatar = require('gravatar');
const passport = require('passport');

// GET 메서드용 로그인 페이지
exports.signin = (req, res) => {
    // 사용자 전체 목록을 날짜별로 정렬
    res.render('login', {
        title: 'Login Page',
        message: req.flash('loginMessage')
    });
};

// GET 메서드용 가입 페이지
exports.signup = (req, res) => {
    // 사용자 전체 목록을 날짜별로 정렬
    res.render('signup', {
        title: 'Signup Page',
        message: req.flash('signupMessage')
    });
};

// GET 메서드용 프로필 페이지
exports.profile = (req, res) => {
    // 사용자 전체 목록을 날짜별로 정렬
    res.render('profile', {
        title: 'Profile Page',
        user: req.user,
        avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true)
    });
};

// 로그아웃 함수
exports.logout = () => {
    req.logout();
    res.redirect('/');
};

// 사용자가 로그인했는지 확인
exports.isLoggedIn = (res, req, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};