// 구조 check.

const jwt = require("jsonwebtoken");
const cryptoRandomString = require('crypto-random-string');
const { accessTokenExpireIn } = require('../config/config'); // 실제로 할때에는 나중에 분리.
// .env 적용 sample
const secret = process.env.JWT_SECRET;

module.exports = {

	// kje: 실제 사용

	// Refresh Token: Random bytes
	generateRefreshToken: () => {
		return cryptoRandomString({ length: 40, type: 'hex' });
	},

	// Access Token: JWT
	generateAccessToken: (payload) => {
		return jwt.sign(payload, secret, {
			expiresIn: accessTokenExpireIn
		});
	},

	// token Expired를 제외하고 token에 문제가 있는지 check.
	// https://github.com/auth0/node-jsonwebtoken#readme
	verifyFormat: (token) => {
		return jwt.verify(token, secret, { ignoreExpiration: true });
	},

	// 아래는 참고용 /////////////////////////////////////////
	verify: async (token) => {
		try {
			return await jwt.verify(token, secret);
		} catch (err) {
			console.log(err);
			return false;
		}
	},

	decode: (token) => {
		return jwt.decode(token, {
			complete: true
		});
		//returns null if token is invalid
	},

	createPayload: (userId) => {
		return {
			user: {
				// We don't want to store the sensitive information such as the
				// user password in the token so we pick only the email and id
				_id: userId._id.toString(),
				username: userId.username,
				email: userId.email,
				isVerified: userId.isVerified,
			}
		};
	}
};