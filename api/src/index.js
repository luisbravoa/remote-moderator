const express = require('express');
const app = express();
var cors = require('cors')

const expressWs = require('express-ws')(app);
 

app.use(cors());

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
 
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});
let count = 0;
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);

  setInterval(() => {
      ws.send(count++);
  }, 1000);
});
 
app.listen(3001);