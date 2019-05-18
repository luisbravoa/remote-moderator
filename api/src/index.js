var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var Session = require('./session');
var db = require('./db');

const data = db.read();
console.log(data);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('create', (req, res) => {

});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('algo', { foo: 'bar'});

});

http.listen(3001, function(){
  console.log('listening on *:3001');
});