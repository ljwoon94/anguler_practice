var router = require('express').Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
require('../config/passport')(passport);
// const jwt = require('jsonwebtoken');

// --> 매번 Model을 require 해와도 됨.
// https://medium.com/@iaincollins/how-not-to-create-a-singleton-in-node-js-bd7fde5361f5
// const User = require("../models/user");
// const Book = require("../models/book");
// const RefreshToken = require("../models/refresh-token");

const User = global.DB_MODELS.User;
const Book = global.DB_MODELS.Book;
const RefreshToken = global.DB_MODELS.RefreshToken;



// kje function들 service로 정리 TEST...
// const { createPayload, sign, generateRefreshToken } = require("../services/token-service");
const tokenService = require("../services/token-service");


router.post('/signup', function (req, res) {
	if (!req.body.username || !req.body.password) {
		res.json({ success: false, msg: 'Please pass username and password.' });
	} else {
		var newUser = new User({
			username: req.body.username,
			password: req.body.password
		});
		console.log(req.body.username);
		console.log(req.body.password);
		// save the user
		newUser.save(function (err) {
			if (err) {
				// mongoose의 unique:true option에 의해서 자동으로 check됨.
				console.log(err);
				console.log(err.code);
				return res.status(409).send('Username already exists.');
			}
			res.json({ success: true, msg: 'Successful created new user.' });
		});
	}
});



// without passport local
// router.post('/signin', function (req, res) {
// 	User.findOne({
// 		username: req.body.username
// 	}, function (err, user) {
// 		if (err) throw err;

// 		if (!user) {
// 			res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
// 		} else {
// 			// check if password matches
// 			user.comparePassword(req.body.password, function (err, isMatch) {
// 				if (isMatch && !err) {
// 					// if user is found and password is right create a token

// 					const payload = {
// 						_id: user._id,
// 						username: user.username
// 					};
// 					var token = jwt.sign(payload, config.secret, {
// 						expiresIn: '10m'
// 					});
// 					// return the information including token as JSON
// 					res.json({ success: true, token: token });
// 				} else {
// 					res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
// 				}
// 			});
// 		}
// 	});
// });


// with passport local
router.post('/signin', passport.authenticate('local', { session: false }), async function (req, res) {
	console.log('\n ---------------------- [ router: signin ] ------------------------- ');
	console.log(' > req.user: ');
	console.log(req.user);

	try {
		const payload = {
			_id: req.user._id,
			username: req.user.username
		};
		const accessToken = tokenService.generateAccessToken(payload);
		const refreshToken = tokenService.generateRefreshToken(); 
		// return the information including token as JSON

		// db 저장
		const newRefreshToken = new RefreshToken({
			user_id: req.user._id,
			token: refreshToken // refresh token.
		});

		await newRefreshToken.save();

		res.send({
			accessToken, 
			refreshToken
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send('internal Error');
	}


	console.log('----------------------- [ end of router: signin ] -------------------- \n ');
});

// token refresh
router.post('/refresh', async (req, res) => {
	console.log('\n ---------------------- [ router: refresh ] ------------------------- ');

	try {

		// 0. access Token validation & decode : expire는 무시.
		const decoded = await tokenService.verifyFormat(req.body.accessToken);
		console.log('\n access Token\n', decoded);
		
		// 1. refresh token DB와 비교 (해당 user가 실제로 있는지의 확인 과정은 일단 생략함...)
		const refreshToken = await RefreshToken.findOne( {user_id : decoded._id, token: req.body.refreshToken});
		console.log('\n refresh Token: \n', refreshToken);
		
		////////////////////////////////////////////////////////////////
		// const isRefreshTokenExpired = new Date(refreshToken.expiresAt) < Date.now();		
		// console.log('Refresh Token Time Left:', parseInt((new Date(refreshToken.expiresAt) - Date.now())/1000), 'sec');
		// console.log('is Expired?:' , isRefreshTokenExpired);
		// 보통은 자동삭제 되나 1분 내외로 오차 발생 가능함. => 해당 부분은 일단 생략
		////////////////////////////////////////////////////////////////

		// 2 자동 삭제 된 경우
		if (!refreshToken) {
			return res.status(401).send('Auth Fail');
		} 		

		
		// 3. access token 발급
		const payload = {		
			_id: decoded._id,
			username: decoded.username
		};

		const accessToken = tokenService.generateAccessToken(payload);

		res.send({
			accessToken
		});

	} catch (err) {
		console.log(err);
		return res.status(500).send('internal Error');
	}

	console.log('----------------------- [ end of router: refresh ] -------------------- \n ');

});


/**
 * kje: Test API! 그냥 book으로 사용...
 */
router.get('/book', passport.authenticate('jwt', { session: false }), function (req, res) {
	// router.get('/book', function(req, res) {  
	// var token = getToken(req.headers);

	console.log('\n ---------------------- [ router: get book ] ------------------------- ');
	console.log(' >> req.user:');
	console.log(req.user);

	if (req.user) {
		// Book.find(function (err, books) {
		//   if (err) return next(err);
		//   res.json(books);
		// });
		res.json({ msg: 'token found!!!', data: req.user });
	} else {

		return res.status(403).send({ success: false, msg: 'Unauthorized.' });
	}
	console.log('----------------------- [ end of router: get book ] -------------------- \n ');
});


getToken = function (headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};


// router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     console.log(req.body);
//     var newBook = new Book({
//       isbn: req.body.isbn,
//       title: req.body.title,
//       author: req.body.author,
//       publisher: req.body.publisher
//     });

//     newBook.save(function(err) {
//       if (err) {
//         return res.json({success: false, msg: 'Save book failed.'});
//       }
//       res.json({success: true, msg: 'Successful created new book.'});
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });


module.exports = router;
