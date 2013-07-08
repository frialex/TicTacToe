var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs')
  , path = require('path')
  , express = require('express')
  , repl = require('repl')


server.listen(666);
app.use(express.static(path.join(__dirname,'/')));
app.get('/index.html', function(req,res){
  res.sendfile('index.html');
});

console.log('Express running @ localhost:666');

var PlayerNumber = 1;
var currentPlayer = 1;

var players = {};
io.sockets.on('connection', function (socket) {
  socket.emit('PlayerNumber', { player: PlayerNumber });
  PlayerNumber++;
  players[socket.id] = PlayerNumber;

  socket.on('cellClicked', function (cell) {
    console.log(cell);
    socket.broadcast.emit('CellTaken',cell);
  });

  socket.on('boardWon', function(data){
    console.log('Board won: ' + data.board + ' by: ' + data.winner);
    socket.broadcast.emit('boardWon', data);
  });

  socket.on('disconnect', function(){
    console.log('Player ' + socket.id + ' disconnected!');
    console.log('players[socket.id]: ' + players[socket.id]);
    if(players[socket.id] === currentPlayer) console.log('CURRENT PLAYER DISCONNECTED');

    delete players[socket.id];
    console.log('players[socket.id] After delete: '+ players[socket.id]);
    PlayerNumber--;
  });


});


repl.start({
  prompt: "TTT Node: ", 
  input: process.stdin, 
  output: process.stdout,
  useGlobal: true
});


