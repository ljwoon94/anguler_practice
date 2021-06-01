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
app.use(passport.initialize());

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

app.post(
    '/api/post/login',
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

app.post('/api/post/signup', (req, res)=>{
    //console.log(req.body);
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
