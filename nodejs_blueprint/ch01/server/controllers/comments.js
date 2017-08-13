const gravatar = require('gravatar');
// 코멘트 모델 가져오기
const Comments = require('../models/comments');

// 코멘트 목록
exports.list = (req, res) => {
    //날짜별 정렬
    Comment.find().sort('-created').populate('user', 'local.email').exec((error, comments) => {
        if (error) {
            return res.send(400, {
                message: error
            });
        }
        // 결과 렌더링하기
        res.render('comments', {
            title: 'Comments Page',
            comments: comments,
            gravatar: gravatar.url(comments.email, {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};

// 코멘트 작성
exports.create = (req, res) => {
    // request body를 가진 코멘트 모델 생성하기
    let comments = new Comments(req.body);
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

//코멘트 인증 미들웨어
exports.hasAuthorization = (req, res, next) => {
    if (req.isAuthenticated())
        return next;
    res.redirect('/login');
};