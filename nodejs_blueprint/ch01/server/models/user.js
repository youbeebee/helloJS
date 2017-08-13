// 몽구스와 패스워드 암호화를 위한 bcrypt를 불러온다
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
//user 모델의 스키마 정의
const userSchema = mongoose.Schema({
    // local strategy 패스포트용 로컬 키
    local: {
        name: String,
        email: String,
        password: String
    }
});

// 패스워드 암호화
userSchema.method.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// 패스워드가 유효한지 확인
userSchema.method.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

// user 모델을 생성하고 앱에 공개
module.exports = mongoose.model('User', userSchema);