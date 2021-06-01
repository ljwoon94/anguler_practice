const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


// DeprecationWarning 경고문 제거 코드
mongoose.set('useCreateIndex', true)

// 스키마 정의
const signupSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    
}, {
    timestamps: { createdAt: true, updatedAt: true }
});


signupSchema.methods.generateAccessToken = async function () {

	const user = this;
	const token = jwt.sign(
		{
			_id: user._id.toString(),
			userEmail: user.userEmail.toString()
		},
		process.env.TOKEN_SECRET_KEY,
		{ expiresIn: '30s' }
	);

	// console.log('userModel ToKen = >', token);
	return token;
}

signupSchema.methods.generateAccessToken = async function () {

	const user = this;
	const token = jwt.sign(
		{
			_id: user._id.toString(),
			id: user.id.toString()
		},
		process.env.TOKEN_SECRET_KEY,
		{ expiresIn: '30s' }
	);

	// console.log('userModel ToKen = >', token);
	return token;
}

signupSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	return userObject;
}

// 비밀번호 비교
signupSchema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

signupSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10)
	}

	next();

});


const User = mongoose.model('User', signupSchema);
module.exports = User;