/* ENV .env file */
require('dotenv').config();


/*  DEPENDENCIES */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/config');


// set Schema Model //////////////////////////////////////////
global.DB_MODELS = {
	User: require('./models/User'),
    Book: require('./models/Book'),
    RefreshToken: require('./models/refresh-token')
}
/////////////////////////////////////////////////////////////

// API Router 설정
var api = require('./routes/api');
var app = express();

mongoose.Promise = require('bluebird');
// https://github.com/Automattic/mongoose/issues/6890
// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.MONGODB_URL, { promiseLibrary: require('bluebird') })
	.then(() => {
		console.log('connection successful');
				
	})
	.catch((err) => console.error(err));

// https://mongoosejs.com/docs/connections.html
mongoose.connection.on('error', err => {
	console.error(err);
});

app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

/*---------------------------
    Web 접근시 적용    
----------------------------*/
app.use('/', express.static(path.join(__dirname, 'dist')));

/*--------------------------------------------------------------------
    서버상에 존재하지 않는 주소를 넣는 경우에 대한 처리 
		- angular route의 path로 바로 이동하는 경우 여기를 통해서 진입.
		- 실제로는 Nginx 내에서 처리함.
--------------------------------------------------------------------*/
app.use(function (req, res) {

	console.log(`
	============================================
	  >>>>>> Invalid Request! <<<<<<
	
	  Req: "${req.url}"	
		=> Redirect to 'index.html'
	============================================`)
	res.sendFile(__dirname + '/dist/index.html');
	//res.redirect('/');
}
);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
