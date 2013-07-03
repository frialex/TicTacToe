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


io.sockets.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });

  socket.on('testSend', function (data) {
    console.log('From: ' + socket.id + ' Data: ' + data);
  });

  socket.on('cellClicked', function (cell) {
    console.log(cell);
    socket.brodcast.emit(cell);
  });



});