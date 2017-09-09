const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Location = mongoose.model('Location');

module.exports = (app) => {
    app.use('/', router);
};

// 몽고 DB에서 모든 위치를 가져온다
router.get('/locations', (req, res, next) => {
    Location.find((err, item) => {
        if (err) return next(err);
        res.render('locations', {
            title: 'Locations',
            location: item,
            lat: 37,
            long: 132
        });
        //res.status(200).json(stores);
    });
});

// 위치 추가 폼을 렌더링한다
router.get('/locations/add', (req, res, next) => {
    res.render('add-location', {
        title: 'Insert Locations',
    });
});

// 몽고DB에 새 위치를 추가한다
router.post('/locations', (req, res, next) => {
    // loc 객체를 request body로 채우기
    let loc = {
        title: req.body.title,
        coordinates: [req.body.long, req.body.lat]
    };
    let locations = new Location(loc);
    // 수신 데이터 저장
    locations.save((error, item) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        //res.json({message: 'Success', obj: item});
        res.render('add-location', {
            message: 'Upload with Success',
            obj: item
        });
    });
});

router.post('/nearme', (req, res, next) => {
    // 최대 표시할 레코드의 수 설정
    let limit = req.body.limit || 10;
    // 기본 최장 거리는 10km
    let maxDistance = req.body.distance || 10;
    // coords 객체 설정 [<long>, <lat>]
    let coords = [];
    coords[0] = req.body.longitude;
    coords[1] = req.body.latitude;

    // 위치 찾기
    Location.find({
        'coordinates': {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                // 반지름
                $maxDistance: maxDistance * 1609.34
            }
        }
    }).limit(limit).exec((err, stores) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.render('locations', {
            title: 'Locations',
            location: stores,
            lat: -23.54312,
            long: -46.642748
        });
    });
});