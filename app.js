
/**
 * Module dependencies.
 */

var express = require('express');
var database = require('./config/database'); 			// load the database config

var http = require('http');
var path = require('path');

var app = express();
// var mongoose = require('mongoose'); 
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
//app.use(express.bodyParser()); 
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./app/routes.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
