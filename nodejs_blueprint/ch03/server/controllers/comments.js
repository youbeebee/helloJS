// 이메일에서 Gravatar 아이콘 얻기
const gravatar = require('gravatar');
// 코멘트 모델 얻기
const Comments = require('../models/comments');

// 코멘트 리스트
exports.list = (req, res) => {
    // 전체 코멘트 목록 날짜별로 정렬
    Comments.find().sort('-created').populate('user', 'local.email').exec((error, comments) => {
        if (error) {
            return res.send(400, {
                message: error
            });
        }
        // 결과 렌더링
        res.render('comments', {
            title: 'Comments Page',
            comments: comments,
            gravatar: gravatar.url(comments.email, {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};

// 코멘트 생성
exports.create = (req, res) => {
    // request body를 가진 코멘트 모델 생성
    let comments = new Comments(req.body);
    // 현재 사용자(id) 설정
    comments.user = req.user;
    // 수신 데이터 저장
    comments.save((error) => {
        if (error) {
            return res.send(400, {
                message: error
            });
        }
        // 코멘트 페이지로 리다이렉트
        res.redirect('/comments');
    });
};

// 코멘트 인증 미들웨어
exports.hasAuthorization = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};