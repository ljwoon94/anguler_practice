const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// load up the user model

// --> 매번 Model을 require 해와도 됨.
// https://medium.com/@iaincollins/how-not-to-create-a-singleton-in-node-js-bd7fde5361f5
// var User = require('../models/user'); 
const User = global.DB_MODELS.User;
var config = require('../config/config'); // get db config file

module.exports = function (passport) {

	let optLocal = {};
	optLocal.usernameField = 'username'; // default.
	optLocal.passwordField = 'password'; // default.
	// optLocal.session = false; => 여기서 설정하면 잘 안됨.. Middle ware로 사용할때 그런가?...  https://github.com/jaredhanson/passport-local/issues/152
	
	// https://stackoverflow.com/questions/15388206/sending-back-a-json-response-when-failing-passport-js-authentication/34699181
	// https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457
	// optLocal.passReqToCallback = false; 
	
	/*----------------------------------
		Passport Local Strategy
	----------------------------------*/
	passport.use(new LocalStrategy(optLocal, (username, password, done) => {

		console.log("\n <------------------ passport: Local Strategy  ---------------------->\n");	

		User.findOne({ username: username }, (err, user) => {
			if (err) {
				console.log(err);
				return done(err); // 서버 에러 처리
			}
			if (!user) {	
				console.log('-------> 존재하지 않는 아이디')			
				return done(null, false, { message: '존재하지 않는 아이디입니다' }); // 임의 에러 처리
			} 
			return user.comparePassword(password, (passError, isMatch) => {
				if (isMatch) {
					return done(null, user); // 검증 성공
				}
				console.log('-------> 비번 틀림');
				return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
			});
		});
	}));


	/*--------------------------------------------------------
		Passport JwtStrategy
		 - 유효성 검증 완료후 error 발생 시 자동으로 401 전송 
		 - 자동을 변경하려면 
			https://stackoverflow.com/questions/15388206/sending-back-a-json-response-when-failing-passport-js-authentication/34699181 참조
			http://www.passportjs.org/docs/authenticate/
		 - expiration check 포함

	------------------------------------------------------------*/
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	//  opts.secretOrKey = config.secret;
	// .env 적용해봄.
	// console.log(process.env.JWT_SECRET);
	opts.secretOrKey = process.env.JWT_SECRET;
	
	// passReqToCallback
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

		console.log("\n <-------------- passport: JWT Strategy ---------------->\n");
		console.log(jwt_payload);

		if (jwt_payload) {
			// kje return이 있는 경우에는 여기서 종료,
			// kje return이 없는 경우에는 마지막 라인까지 진행 -> console로 check.
			// kje 아래 return data(jwt_payload)는 req의 req.user로 전달됨.
			return done(null, jwt_payload);
		}

		// User.findOne({id: jwt_payload.id}, function(err, user) {
		//       if (err) {
		//           return done(err, false);
		//       }
		//       if (user) {
		//           done(null, user);
		//       } else {
		//           done(null, false);
		//       }
		//   });
		console.log("\n<------------- passport JWT Strategy end ------------>\n");
	}));
};
