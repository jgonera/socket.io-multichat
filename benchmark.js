var io = require('socket.io-client');

var i, clients = 0, sent = 0, received = 0;

var TOTAL_CLIENTS = process.argv[2] || 500;
var CLIENTS_PER_ROOM = process.argv[3] || 3;

console.log("Total clients: " + TOTAL_CLIENTS);
console.log("Clients per room: " + CLIENTS_PER_ROOM);

console.log("\nclients\tsent\treceived\tsent/c\treceived/c");

setInterval(function() {
  console.log([clients, sent, received, '',
    Math.round(sent/clients), Math.round(received/clients)].join("\t"));
  sent = 0;
  received = 0;
}, 1000);

function sendMessage(socket) {
  socket.emit('message', 'hello', function() {
    ++sent;
    sendMessage(socket);
  });
};

function connectClient(i) {
  var channel = 'test' + Math.floor(i / CLIENTS_PER_ROOM);
  setTimeout(function() {
    var socket = io.connect('http://localhost:7890', {'force new connection': true});
    socket.emit('join', channel, function() {
      ++clients;
      socket.on('broadcast', function(msg) {
        ++received;
      });
      sendMessage(socket);
    });
  }, i*10);
};

for (i=0; i<TOTAL_CLIENTS; ++i) {
  connectClient(i);
}

