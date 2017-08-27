const mongoose = require('mongoose');
// 패스워드 암호화
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    // local strategy 패스포트용 로컬키
    local: {
        name: String,
        email: String,
        password: String
    }
});

// 패스워드 암호화
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// 패스워드 검증
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// 모델을 앱에 공개
module.exports = mongoose.model('User', userSchema);