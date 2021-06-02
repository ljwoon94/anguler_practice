const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const cors = require('cors');
const mongoose =require('mongoose');
const fs = require('fs');
const passport = require('passport');
require('./middlewares/passport')(passport);

// mongoDB 주소
const db_url = process.env.DB_URL
const User = require('./models/signup');
const port= 3000;

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

// passport 등록
app.use(passport.initialize());

// 회원정보 불러오기-------------------------------------------------------
app.get('/api/get/userInfo',(req, res)=>{
    User.find({}, (err, users)=>{
        if(err) return res.status(500).json({error: err});
        if(!users) return res.status(404).json({error: 'user not found'});
        res.json(users);
    })
})

app.get('/api/get/userInfo/:id',(req, res)=>{
    User.findOne({_id: req.params.id}, (err, user)=>{
        if(err) return res.status(500).json({error: err});
        if(!user) return res.status(404).json({error: 'user not found'});
        res.json(user);     
    })
})
// 회원가입---------------------------------------------------------
app.post('/api/post/signup', (req, res)=>{
    // Form에서 온 데이터받기
    const id = req.body.id;
    // 중복데이터 확인
    User.findOne({ id })
        .then((user)=>{
            if(user){
                res.send({ result : 'fail'});
            // 중복 데이터가 없으면 회원가입 시작 
            } else {
                const signupUser = new User({
                    id : req.body.id,
                    password : req.body.password,
                    name : req.body.name,
                    email : req.body.email,
                })
                signupUser.save()
                    .then((login) => {
                        //console.log(user);
                        res.send({
                            result: 'done'
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });

    //console.log(req.body);

})

// 로그인-------------------------------------------------------
app.post(
    '/api/post/login',
    // passport로 form 입력값, db에 저장된 값이랑 비교
    // passport.authenticate를 통해 local strategy 호출
    passport.authenticate('local', { session: false }),
    async (req, res) => {
		const user = new User(req.user);
		console.log(user);
        try {
			const token = await user.generateAccessToken();
			// console.log('router token => ', token);
			console.log('returned token to login comp, then move to main');
			res.send({token});
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}
    }
)
// ------------------------------------------------------------
// CONNECT TO MONGODB SERVER
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


server.listen(port, ()=> {
    console.log(`Server is running ${port}`);
});
