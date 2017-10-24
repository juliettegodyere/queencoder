var express         = require('express');
var logger          = require('morgan');
var app             = express();
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var path            = require('path');
var router          = express.Router();
var routes          = require('./app/routes/api')(router);
var users          	= require('./app/routes/user')(router);
var emailLink       = require('./app/routes/contactApi')(router);
var config          = require('./config/db');
var port            = process.env.PORT || 5000; 

//Database name mlab :julietteblog

app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', routes); 
app.use('/users', users);
app.use('/emailLink', emailLink); 
 
mongoose.connect(process.env.MONGOLAB_URI, function(err){
	if(err){
		console.log("Not connected to MongoDB");
	}else{
		console.log("Successfully connected to the MongoDB");
	}
}); 

app.get('*', function(req, res) {
      res.sendfile(path.join(__dirname + '/public/app/views/index.html')); 
});

app.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
  });
   
  // handling 404 errors
  app.use(function(err, req, res, next) {
	if(err.status !== 404) {
	  return next();
	}   
	res.send(err.message || '** no unicorns here **');
  });

app.listen(port, function(){
  console.log('Magic happens on port ' + port);
});               
           
exports = module.exports = app;                         
