var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs')
  , path = require('path')
  , express = require('express')


server.listen(666);
app.use(express.static(path.join(__dirname,'/')));
app.get('/index.html', function(req,res){
  res.sendfile('index.html');
});

console.log('Express running @ localhost:666');

var PlayerNumber = 1;
io.sockets.on('connection', function (socket) {
  socket.emit('PlayerNumber', { player: PlayerNumber });
  PlayerNumber++;


  socket.on('cellClicked', function (cell) {
    console.log(cell);
    socket.broadcast.emit('CellTaken',cell);
  });


});