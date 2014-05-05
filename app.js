
/**
 * Module dependencies.
 */

var express = require('express');
var database = require('./config/database'); 			// load the database config

var http = require('http');
var path = require('path');
var index = require('./routes/index');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.search);

app.get('/wc', index.wordcloud);

//deprecated
app.get('/wordcloud', function(req, res) {
		res.sendfile('./public/wc/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
