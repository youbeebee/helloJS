const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express from ./server/' });
});

/* GET 로그인 페이지 */
router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
    //connect-flash 모듈 필요
});

/* GET 가입 페이지 */
router.get('/signup', (req, res, next) => {
    res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
});

/* GET 프로필 페이지 */
router.get('/profile', (req, res, next) => {
    res.render('profile', { title: 'Profile Page', user: req.user, 
        avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true) });
    //gravatar 모듈 필요
});

module.exports = router;
