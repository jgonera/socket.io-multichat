var express = require('express');

var app = express.createServer();
var io = require('socket.io').listen(app);

app.set('view options', {layout: false})

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.listen(3000);

io.configure(function() {
  io.set('transports', ['websocket']);
});

io.configure('production', function() {
  io.set('log level', 1);
});

io.sockets.on('connection', function(socket) {
  socket.on('join', function(channel, ack) {
    socket.get('channel', function(err, oldChannel) {
      if (oldChannel) {
        socket.leave(oldChannel);
      }
      socket.set('channel', channel, function() {
        socket.join(channel);
        ack();
      });
    });
  });
  
  socket.on('message', function(msg, ack) {
    socket.get('channel', function(err, channel) {
      if (err) {
        socket.emit('error', err);
      } else if (channel) {
        socket.broadcast.to(channel).emit('broadcast', msg);
        ack();
      } else {
        socket.emit('error', 'no channel');
      }
    });
  });
});

