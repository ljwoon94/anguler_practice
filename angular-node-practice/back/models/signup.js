const mongoose = require('mongoose');

// DeprecationWarning 경고문 제거 코드
mongoose.set('useCreateIndex', true)

// 스키마 정의
const signupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: false },
    
}, {
    timestamps: { createdAt: true, updatedAt: false }
});


// 모듈 정의 후 호출 가능하게 함.

const User = mongoose.model('User', signupSchema);
module.exports = User;