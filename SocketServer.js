var io = require('socket.io').listen(app)
  , fs = require('fs')
  , express = require('express')
  , path = require('path')

//app.listen(667);
var app = express();
app.use(express.static(path.join(__dirname,'singleboard.js')));

app.listen(666);





function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });
  socket.on('testSend', function (data) {
    console.log(data);
  });
});