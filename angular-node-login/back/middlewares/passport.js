const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/signup');
const bcrypt = require('bcryptjs');
// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');
require('dotenv').config();

module.exports =  function (passport) {
	// passport Strategy 장의
	// LocalStrategy의 역할은 request 에 넘겨져오는
	// form-data ({'id': id, 'password': password}) 
	// 와 Local DB에 저장되어있는 User와 비교
	passport.use(new LocalStrategy({
		usernameField: process.env.ID_FIELD,
		passwordField: process.env.PWD_FIELD
	},
		function (id, password, done) {
			User.findOne({ id: id }, async (err, user) => {

				if (err) {
					console.log('passport error =>', err);
					return done(err);
				}
				if (!user) {
					console.log('-------> 존재하지 않는 아이디');
					return done(null, false, { message: 'Incorrect id.' });
				}
				// bcrypt.compare(입력비밀번호, db에 저장된 비밀번호) 
				// 비교해서 참이면 true, 아니면 false
				const isMatch = await bcrypt.compare(password, user.password);

				// 비교해서 다르면(false를 !로 해서 참으로 바꿔 실행) 
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