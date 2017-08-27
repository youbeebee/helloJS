// 모듈 불러오기
const fs = require('fs');
const mime = require('mime');
// 이메일에서 Gravatar 아이콘 얻기
const gravatar = require('gravatar');
const Images = require('../models/images');
// 이미지 파일 형식 설정
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// 이미지 갤러리 보여주기
exports.show = (req, res) => {
    Images.find().sort('-created').populate('user', 'local.email').exec((error, images) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        // 갤러리 렌더링
        res.render('image-gallery', {
            title: 'Image Gallery',
            images: images,
            gravatar: gravatar.url(images.email, {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};

// 이미지 업로드
exports.uploadImage = (req, res) => {
    let src;
    let dest;
    let targetPath;
    let targetName;
    let tempPath = req.file.path;
    console.log(req.file);
    // 파일의 MIME 형식 얻기
    let type = mime.lookup(req.file.mimetype);
    // 파일 확장자 얻기
    let extension = req.file.path.split(/[. ]+/).pop();
    // 지원하는 형식인지 확인
    if (IMAGE_TYPES.indexOf(type) == -1) {
        return res.status(415).send("지원 포맷: jpeg, jpg, jpe, png.");
    }
    // 이미지의 새 경로 설정
    targetPath = './public/images/' + req.file.originalname;
    // 파일 읽기에 읽기 스트림 API 사용
    src = fs.createReadStream(tempPath);
    // 파일 쓰기에 쓰기 스트림 API 사용
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    // 에러 출력
    src.on('error', (err) => {
        if (err) {
            return res.status(500).send({message: error}); // ??
        }
    });
    // 파일 프로세스 저장
    src.on('end', () => {
        // request body로 새 이미지 모델 생성
        let image = new Images(req.body);
        // 이미지 파일 이름 설정
        image.imageName = req.file.originalname;
        // 현재 사용자 id 설정
        image.user = req.user;
        // 수신 데이터 저장
        image.save((error) => {
            if (error) {
                return res.status(400).send({message: error});
            }
        });
        // temp 폴더에서 삭제
        fs.unlink(tempPath, (err) => {
            if (err) {
                return res.status(500).send("에러가 발생했네요.");
            }
            // 갤러리 페이지로 리다이렉트
            res.redirect('image-gallery');
        });
    });
};

// 이미지 인증 미들웨어
exports.hasAuthorization = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};