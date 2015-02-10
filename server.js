var express = require('express'), // Web Application Module
	stylus = require('stylus'), // CSS Module
	logger = require('morgan'), // Logging Module
	bodyParser = require('body-parser'),// Middleware required by other modules
	mongoose = require('mongoose');

var http = require('http');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str,path){ // Stylus Compile Function
	return stylus(str).set('filename',path);
}

app.use(stylus.middleware( // Stylus Configuration
	{
		src: __dirname + '/public',
		compile: compile
    }
));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.set('port', process.env.PORT || 3030);
app.listen(app.get('port'));

if(env === 'development'){
	console.log("Connecting to local mongodb");
	mongoose.connect('mongodb://localhost/multivision');
} else{
	console.log("Connecting to MongoLAB mongodb");
	mongoose.connect('mongodb://rafaelpossas:rage1283@ds041821.mongolab.com:41821/multivision');
}

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error....'));
db.once('open',function callback() {
	console.log('multivision db opened!!');
});

/*http.createServer(app).listen(app.get('port'), function(){
    console.log('LISTENING on port: ' + app.get('port'));
});

app.get('/', function(req,res) {
  res.sendFile(__dirname+'/index.html');
  
});*/