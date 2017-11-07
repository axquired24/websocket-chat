const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.get('/', function(req, res) {
//   res.send('<h1>Hello World</h1>');
// });

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', function(socket){
  var g_username;

  console.log('a user trying to connect ...');
  // io.emit('user-conn', 'a user connected');
  // socket.broadcast.emit('user-conn', 'a user connected');

  socket.on('user-join', function(username) {
    g_username = username;
    const msg = username + ' telah bergabung';
    socket.broadcast.emit('user-join', msg);
    console.log(msg);
  });

  socket.on('disconnect', function() {
    const msg = g_username + ' telah pergi ...';
    console.log(msg);
    socket.broadcast.emit('user-disconn', msg);
  });

  socket.on('chat-msg', function(msgperson) {
    socket.broadcast.emit('chat-msg', msgperson);
    console.log(msgperson);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
