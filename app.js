var express = require('express');

var app = express()
var server = app.listen(7890);
var io = require('socket.io').listen(server);

app.set('view options', { layout: false })

app.get('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:7890");
  res.render('index.ejs');
});

io.set('transports', ['websocket']);

io.sockets.on('connection', function (socket) {

  socket.on('join', function (channel, ack) {
    socket.channel = channel;
    if ("channel" in socket && socket.channel !== "") {
      socket.leave(String(socket.channel));
    }
    socket.join(channel);
    ack();
  });

  socket.on('message', function (msg, ack) {
    // console.log(msg, ack);
    if ("channel" in socket && socket.channel !== "") {
      socket.broadcast.to(socket.channel).emit('broadcast', msg);
      ack();
    }
  });
});

