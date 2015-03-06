var express = require('express'); // Web Application Module

var env = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];


require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);


app.listen(config.port);

console.log('Listening on port ' + config.port + '...');

/*http.createServer(app).listen(app.get('port'), function(){
    console.log('LISTENING on port: ' + app.get('port'));
});

app.get('/', function(req,res) {
  res.sendFile(__dirname+'/index.html');
  
});*/