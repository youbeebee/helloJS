const models = require('../models/index');
const Band = require('../models/band');

// Band 만들기
exports.create = (req, res) => {
    // request body를 가진 Band 모델 만들기
    models.Band.create(req.body).then((band) => {
        //res.json(band);
        res.redirect('/bands');
    });
};

// Band 목록
exports.list = (req, res) => {
    console.log('band.list');
    models.Band.findAll({
        // 최근 생성된 순으로 정렬 예제대로 하면 에러남, 배열로 감싸야
        order: [['createdAt', 'DESC']]
    }).then((bands) => {
        //res.json(bands);
        res.render('band-list', {
            title: 'List bands',
            bands: bands
        });
    });
};

// Band id로 얻기
exports.byId = (req, res) => {
    models.Band.find({
        where: {
            id: req.params.id
        }
    }).then((band) => {
        res.json(band);
    });
};

// id로 업데이트
exports.update = (req, res) => {
    models.Band.find({
        where: {
            id: req.params.id
        }
    }).then((band) => {
        if (band) {
            band.updateAttributes({
                name: req.body.name,
                description: req.body.description,
                album: req.body.album,
                year: req.body.year,
                UserId: req.body.user_id
            }).then((band) => {
                res.send(band);
            });
        }
    });
};

// id로 삭제
exports.delete = (req, res) => {
    models.Band.destroy({
        where: {
            id: req.params.id
        }
    }).then((band) => {
        res.json(band);
    });
};