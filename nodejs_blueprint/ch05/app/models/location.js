// 예제 모델
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    title: String,
    coordinates: {
        type: [Number],
        index: '2dsphere'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Location', LocationSchema);