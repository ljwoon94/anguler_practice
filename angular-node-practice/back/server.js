const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const cors = require('cors');

const port= 3000;

const data = {msg :'Hello World'}

const studentsInfo = require('./studentsInfo');
const studentsInfo2 = require('./studentsInfo2');

app.use(express.static(path.join(__dirname + '/public')));

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

app.get('/api/ngonchange', (req, res)=>{
    console.log('server in');
    return res.send(studentsInfo.studentsInfo);
})

server.listen(port, ()=> {
    console.log(`Server is running ${port}`);
});
