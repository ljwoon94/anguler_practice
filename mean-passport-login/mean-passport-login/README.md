# Mean Passport Login

MongoDB + Express + Angular + node.js 회원가입/로그인 에 대한 sample code.
```bash
# Server
node ./bin/www

# Client
npm run start2
# 또는 (build 후 서버 실행)
npm start 
```


## 특징 
- Server와 Angular가 한 폴더에 존재함.
- Angular8 + Login 구현
- Passport 사용/ Local strategy 추가
- Access token / Refresh token 적용
- Mongo DB는 Mongo Atlas 사용중
  - dotenv 사용 : github에는 upload 되지 않음. (일단 nsmart 암호사용.)
  - 최신 connection 적용 ('mongodb+srv://...) -> 잘 동작함.


## References: mean-angular5-passport-authentication을 이것 저것 변경. 
 - Angular: update to v8 
 - [https://www.djamware.com/post/5a878b3c80aca7059c142979/securing-mean-stack-angular-5-web-application-using-passport](https://www.djamware.com/post/5a878b3c80aca7059c142979/securing-mean-stack-angular-5-web-application-using-passport)
 - [https://github.com/didinj/mean-angular5-passport-authentication](https://github.com/didinj/mean-angular5-passport-authentication)
 - [https://github.com/clink73/KibChat-Server](https://github.com/clink73/KibChat-Server)
 - [https://www.reddit.com/r/node/comments/aswj7y/where_to_store_jwt/](https://www.reddit.com/r/node/comments/aswj7y/where_to_store_jwt/)




## Login Procedure (현재 구현 상태)

* access token: JWT
 - angular HTTP Interceptor 이용 (refresh-token-interceptor)
   - API 요청 후 access token이 invalid 한 경우 자동으로 refresh 진행
 - Timeout 발생 시 access token을 자동으로 Refresh.
   - Refresh 확인 과정은 추가해야함.


* Refresh token : random byte
  - ExpiresAt 적용.
  - expires : 0으로 설정하고 ExpiresAt을 현재시간 + refreshTokenExpiresIn (즉, 미래시간)으로 설정 (expiresIn 값을 변경하기 쉬운 듯.)
  - 시간 지나면 자동 삭제됨.

* unique를 이용한 중복체크 과정 삭제 (회원 가입 등)
* Timestamps 사용 (createdAt , updatedAt 자동 생성)
* passport, passport-jwt, passport-local 적용


## TODO
* refresh token 자체도 expire 된 경우의 처리 방안
  - --> 현재는 error만 표시
  - --> 사용자가 마지막에 수행한 작업은 날라갈 가능성 농후...
  - --> auth.service 또는 refresh-token-interceptor에서 처리해야 할 듯.

* Refresh 요청이 중복되는 경우는? (Multi API?)

* 비밀번호 변경시 해당 사용자의 refresh token제거.
* Logout시 해당 refresh token 삭제? (Logout시 client가 refresh token 전송 필요?)
* Social Login




