**This example is _very_ old. It does not work with the latest versions of Socket.IO.**

Socket.IO multiroom chat demo
=============================

A simple demo of a multiroom chat in Node.JS + Socket.IO with included simple
benchmark.


How to use
----------

Clone:

    git clone git://github.com/jgonera/socket.io-multichat.git
    cd socket.io-multichat

Install dependencies:

    npm install

Run:

    node app.js

or to disable logging and increase performance:

    NODE_ENV=production node app.js

The app will be available at <http://localhost:7890/>.
You can open a few tabs in your browser, join some channel and see how it works.


Benchmark
---------

Start in production and then run:

    node benchmark.js [TOTAL_CLIENTS] [CLIENTS_PER_ROOM]

This will connect `TOTAL_CLIENTS` clients to the server and start flooding
`TOTAL_CLIENTS/CLIENTS_PER_ROOM` rooms with messages. Setting this too high is
more likely to cause 100% CPU usage on the benchmark than on the app itself (so
run `top` to see if you reach the benchmark's limit or the app's limit).
