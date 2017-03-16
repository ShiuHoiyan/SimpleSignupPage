var express = require('express');
var http = require('http');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/siginin");

var app = express();
var server = http.createServer(app);

var routes = require('./routes/index');

app.set('port', process.env.PORT || 8000);
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use('/', routes());


server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});