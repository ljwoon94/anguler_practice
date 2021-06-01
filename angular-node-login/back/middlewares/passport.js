const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/signup');
const bcrypt = require('bcryptjs');
// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');
require('dotenv').config();

module.exports =  function (passport) {

	passport.use(new LocalStrategy({
		usernameField: process.env.ID_FIELD,
		passwordField: process.env.PWD_FIELD
	},
		function (username, password, done) {
			User.findOne({ id: username }, async (err, user) => {

				if (err) {
					console.log('passport error =>', err);
					return done(err);
				}
				if (!user) {
					console.log('-------> 존재하지 않는 아이디');
					return done(null, false, { message: 'Incorrect id.' });
				}
				// // if (!user.validPassword(password)) {
				// // 	return done(null, false, { message: 'Incorrect password.' });
				// // }
				// return user.comparePassword(password, (passError, isMatch) => {
				// 	if (isMatch) {
				// 		return done(null, user); // 검증 성공
				// 	}
				// 	console.log('-------> 비번 틀림');
				// 	return done(null, false, {
				// 		message: '가 틀렸습니다',
				// 	}); // 임의 에러 처리
				// });
				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch) {
					console.log('-------> 비밀번호가 다름');
					return done(null, false, { message: 'Incorrect password.' });
				}
				// console.log('passport right before return =>', user);
				return done(null, user);
			});
		}
	));

};