module.exports = {
//   'secret':'meansecure', // jwt secret
  'accessTokenExpireIn': '30s',
  'refreshTokenExpireIn': 5, // as min => mongodb Schema로 들어감. (refresh-token.js)
};
