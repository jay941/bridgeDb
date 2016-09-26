var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8089;

var app = express();
var jwt = require('jwt-simple');
var user = require('./controller/user');

app.use(bodyParser.json());
app.use(express.static('../client'));

app.use(user);



app.listen(port,function(){
	console.log('server running on port '+port);
})
