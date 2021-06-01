const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { refreshTokenExpireIn } = require('../config/config'); // 일단 분단위 test 중...

// kje: _id를 token으로 사용해도 되지 않을까???
// 혹은 random sequence 추가? or jwt?
// refresh token에서 expires in을 따로? or refresh에?
// social login과 비교해서 check.
const refreshTokenSchema = new Schema({
	// References the user table so that we have
	// a user with a matching token
	user_id: {
		type: ObjectId,
		ref: "User",
		required: true,
		// unique: true
	},

	token: {
		type: String,
		required: true
	},

	// expired_at: {
	// 	type: Date,
	// 	required: true
	// },

	// => Refresh token 탈취 후 API refresh를 요청 하는 경우 비교를 위해서 필요할까? 아니면 생략할까?
	// ==> 일단은 생략.
	// https://stackoverflow.com/questions/32060478/is-a-refresh-token-really-necessary-when-using-jwt-token-authentication
	// accessToken: {
	//     type: String,
	// },

	// flag로 사용할까 아니면 그냥 필요없어지면 삭제하는 루틴으로 진행할까...
	// 일단 flag로 사용하고 추후에 주기적으로 삭제??
	isRevoked: {
		type: Boolean,
		required: true,
		default: false
	},

	// Time the token was created
	// https://stackoverflow.com/questions/14597241/setting-expiry-time-for-a-collection-in-mongodb-using-mongoose
	// createdAt: {
	// 	type: Date,
	// 	required: true,
	// 	default: Date.now,
	// 	// Sets the documents time to live, known as TTL. So verification
	// 	// token document will automatically delete itself after 12 hours
	// 	// if user doesn't confirm, and if the user needs to the user can
	// 	// request for a new token
	// 	expires: '1m'
	// },

	// kje : 아래 방법이 더 나은듯??? -> expire time을 조절하기 쉬움...
	// (위의 방식은 expires 값이 바뀌는 법을 따로 연구해야할듯... => 현재는 3T에서 index를 drop하고 다시 생성해야 바뀜...)
	// 아래 방법은 현재 expires = 0으로 설정하고 expiresAt 값을 미래로 설정
	// https://stackoverflow.com/questions/23957624/updating-expires-with-mongoose
	// https://docs.mongodb.com/manual/tutorial/expire-data/
	expiresAt: {
		type: Date,
		required: true,
		// function으로 처리 => 그냥 date.now()는 schema가 생성된 시간만 표시됨. ==> (mongodb에서는 Date.now로만 표시해도됨.)
		// https://stackoverflow.com/questions/36550263/mongo-db-default-timestamp
		default: () => new Date(Date.now()+1000*60*refreshTokenExpireIn), // refreshTokenExpireIn : minute 단위로 표시 (추후 hour로 변경 예정)
		expires: 0
	}
});
// }, {timestamps:true});

// timestamps에 Expires 자동으로 포함하려면 아래 URL 참조
// https://stackoverflow.com/questions/14597241/setting-expiry-time-for-a-collection-in-mongodb-using-mongoose
// refreshTokenSchema.index({createdAt: 1}, {expireAfterSeconds: 60});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
