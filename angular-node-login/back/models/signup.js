const mongoose = require('mongoose');

// DeprecationWarning 경고문 제거 코드
mongoose.set('useCreateIndex', true)

// 스키마 정의
const signupSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const User = mongoose.model('User', signupSchema);
module.exports = User;