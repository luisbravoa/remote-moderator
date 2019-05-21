var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
const cors = require('cors');

const Session = require('./models/session');

const sessions = {};

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.post('/create', (req, res) => {
  const { ownerId } = req.body;
  const sessionResponse = Session.create(ownerId);

  res.send(sessionResponse);
});

io.on('connection', function(socket){

  const { id, userId, username} = socket.handshake.query;
  console.log('a user connected', id);

  // validate that session exists if not send error and disconnect

  let currentSession = sessions[id];
  if(!currentSession) {
    try{
      sessions[id] = new Session(id);
      console.log();
      currentSession = sessions[id];
    } catch(e){
      console.log('error', e);
      socket.emit('message', {
        type: 'error',
        message: e.toString()
      });
      return socket.disconnect();
    }
  }

  currentSession.add(userId, username, socket);

});

http.listen(3001, function(){
  console.log('listening on *:3001');
});