const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const cors = require('cors');

const port= 3000;

const data = {msg :'Hello World'}

app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());

app.get('/api', (req, res)=>{
    console.log('server in');
    return res.send(data);
})

//
//

// cors proxy 이슈 해결
//https://gompro.postype.com/post/732269

server.listen(port, ()=> {
    console.log(`Server is running ${port}`);
});
