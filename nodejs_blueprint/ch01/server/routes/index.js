const express = require('express');
const router = express.Router();

const passport = require('passport');
const gravator = require('gravatar');

/* GET 홈(인덱스) 페이지 */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express from ./server/' });
});

/* GET 로그인 페이지 */
router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
    //connect-flash 모듈 필요
});

/* POST 로그인 처리 */
router.post('/login', passport.authenticate('local-login', {
    // 성공하면 프로필 페이지로, 실패하면 로그인 페이지로
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

/* GET 가입 페이지 */
router.get('/signup', (req, res, next) => {
    res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
});

/* POST 가입 처리 */
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

/* GET 프로필 페이지 */
router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', { title: 'Profile Page', user: req.user, 
        avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true) });
    //gravatar 모듈 필요
});

/* 사용자가 로그인했는지 확인 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

/* GET 로그아웃 페이지 */
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
