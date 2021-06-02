const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// JWT(JSON Web Token)은 클라이언트와 서버 혹은 서비스간의 통신시 정보를 
// JSON객체를 통해 안전하게 전송하고 권한(Authorization)을 위해 사용하는
// 토큰이다.
const bcrypt = require('bcryptjs');
require('dotenv').config();


// DeprecationWarning 경고문 제거 코드
mongoose.set('useCreateIndex', true)

// 스키마 정의
const signupSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    
}, {
    timestamps: { createdAt: true, updatedAt: true }
});

// 커스텀 스태틱 메소드
// 사용자 정의 메소드 추가 가능
signupSchema.methods.generateAccessToken = async function () {
	const user = this;
	// jwt.sign() 토큰 생성
	// jwt.sign()에 들어가는 인자 4가지
	// 1. { 토큰에 들어갈 정보 보통 _id만 들어간다. }
	// 2. sercetKey : 여러가지 복잡한 문자열로 되어있는 키
	// 3. { 옵션이다. expiresIn은 토큰 만료일,
	//    issuer, subject는 토큰에 대한 정보이다. }
	// 4. 익명함수 token의 생셩결과를 4번째 인자에 콜백함수로 받을 수 있다.  
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

// Pre
// 몽구스의 middleware기능이다
// init, validate, save, remove 메소드 수행시 처리되는 미들웨어 펑션이다 
// 복잡한 유효성검사, 트리거 이벤트 처리등. 예로 사용자를 삭제하면 사용자
// 관련 블로그포스트도 삭제하기같은 경우 사용
// 또는 에러 핸들링
signupSchema.pre('save', async function (next) {
	const user = this;
	// isModified() 
	// 해당 값이 db에 기록된 값과 비교해서 변경된 경우 true를, 
	// 그렇지 않은 경우 false를 반환
	// user 생성시는 항상 true이며,
	// user 수정시는 password가 변경되는 경우에만 true를 반환
	// user를 생성하거나 user수정시 user.password의 변경이 있는
	// 경우에는 bcrypt.hashSync함수로 password를 hash값으로 바꿉니다.
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10)
	}
	next();
});


const User = mongoose.model('User', signupSchema);
module.exports = User;