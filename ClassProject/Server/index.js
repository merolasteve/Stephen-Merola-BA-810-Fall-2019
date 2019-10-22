
//First Express App
var http = require('http');
var express = require('express');
var config = require('./config/config');

var app = express();

var port = config.port|| 3000

app.set('port', process.env.PORT || 3000);

require('./config/express')(app, config);

require('http').createServer(app).listen(port, function () {
    console.log("HTTP Server listening on port: %d, in %s mode", port, app.get('env'));
    });

//load middleware
app.use(function(req, res, next){
    console.log('Request from ' + req.ip);
    next();
  });

/*Looks for environment variable and
if it isn’t set, sets the port to 3000*/
app.get('/', function(req,res){
    res.send('Hello World!');
});

app.get('/about', function(req, res){
    console.log('about');
    res.send('About Us!');
});

app.get('/about/directions', function(req, res){
    res.send('How to Find Us!');
});

app.use(function(req, res){
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
});

http.createServer(app).listen(3000, function(){
    console.log('Express server listening on port ' + 3000);
});

/*Retrieves the port variable and tells server to listen on that port
adds a callback funciton to run once server has started*/
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port'));
});

module.exports = app;