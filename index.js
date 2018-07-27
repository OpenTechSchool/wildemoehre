// Require the serialport node module
var serialport = require('serialport');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var scales = [
    ['C4', 'E4', 'G4', 'B4', 'C5', 'E5'],
    ['A3', 'E4', 'B4', 'C5', 'E5', 'G5'],
    ['F3', 'C4', 'G4', 'A4', 'C4', 'F5'],
    ['G3', 'C4', 'D4', 'B4', 'D5', 'F5']
];
var currentScale = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/tone.min.js', function(req, res){
    res.sendFile(__dirname + '/tone.min.js');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.emit('scalechange', {scale: scales[currentScale]}),
    socket.on('buttonpressed', function(msg){
        io.emit('buttonpressed', msg);
    });
});

setInterval(() => {
    currentScale = currentScale + 1;
    if (currentScale === scales.length) {
        currentScale = 0;
    }
    io.emit('scalechange', {scale: scales[currentScale]})
}, 5000)
