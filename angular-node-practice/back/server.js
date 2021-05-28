const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');




// mongoDB 주소
const db_url = 'mongodb+srv://admin:roottoor@mongodbtutorial.fvm0n.mongodb.net/user?retryWrites=true&w=majority';
const port= 3000;

const data = {msg :'Hello World'}

const studentsInfo = require('./studentsInfo');
const studentsInfo2 = require('./studentsInfo2');
const User = require('./models/signup');

app.use(express.static(path.join(__dirname + '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// cors proxy 이슈 해결
//https://gompro.postype.com/post/732269
app.use(cors());

app.get('/api', (req, res)=>{
    console.log('server in');
    return res.send(data);
})

app.get('/api/set1', (req, res)=>{
    console.log('server in output1');
    return res.send(studentsInfo.studentsInfo);
})

app.get('/api/set2',(req,res) => {
    console.log('server in output2');
    return res.send(studentsInfo2.studentsInfo2);
})

app.get('/api/rxjs', (req, res)=>{
    console.log('server in');
    return res.send(studentsInfo.studentsInfo);
})

app.get('/api/get', (req, res)=>{
    console.log('----------get------------------------------');
    console.log(req.query);
    return res.send(req.query);
})

app.post('/api/post', (req, res)=>{
    console.log('----------post-----------------------------');
    console.log(req.body);
    return res.send(req.body);
})

// 회원목록
app.get('/api/get/list', (req, res)=>{
    console.log('----------get---------목록-------------');
    User.find({})
        .then((users) => {
            console.log(users);
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.redirect("/");
        });
})

// 회원가입
app.post('/api/post/signup', (req, res)=>{
    console.log('----------post---------회원가입-------------');
    console.log(req.body);
    const signupUser = new User({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
    })
    signupUser.save()
        .then((user) => {
            //console.log(user);
            res.send({
                result: 'done'
            })
        })
        .catch((err) => {
            res.status(500).send({

            });
        });
    
})

// CONNECT TO MONGODB SERVER
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));


server.listen(port, ()=> {
    console.log(`Server is running ${port}`);
});
