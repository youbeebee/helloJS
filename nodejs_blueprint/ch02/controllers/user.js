const models = require('../models/index');
const User = require('../models/user');

// User 만들기
exports.create = (req, res) => {
    // request body를 가진 User 모델 만들기
    models.User.create({
        name: req.body.name,
        email: req.body.email
    }).then((user) => {
        res.json(user);
    });
};

// User 목록
exports.list = (req, res) => {
    models.User.findAll({}).then((users) => {
        res.json(users);
    });
};