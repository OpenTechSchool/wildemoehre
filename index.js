// replace with YOUR correct serial port value - can be found in arduino ide
const ARDUINO_SERIAL_PORT = '/dev/cu.usbmodem1411'

// Require the serialport node module
const SerialPort = require('serialport');
const serialPort = new SerialPort(ARDUINO_SERIAL_PORT, {
  baudRate: 9600
});
const Readline = require('@serialport/parser-readline')
const parser = serialPort.pipe(new Readline({ delimiter: '\r\n' }))

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const scales = [
  ['C4', 'E4', 'G4', 'B4', 'C5', 'E5'],
  ['A3', 'E4', 'B4', 'C5', 'E5', 'G5'],
  ['F3', 'C4', 'G4', 'A4', 'C4', 'F5'],
  ['G3', 'C4', 'D4', 'B4', 'D5', 'F5']
];
let currentScale = 0;

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

// Switches the port into "flowing mode"
parser.on('data', (data) => {
  console.log('data', data)
  if (data === 'buttonpress') {
    var color = '#' + Math.ceil(Math.random() * 1000);
    io.emit('buttonpressed', { color: color });
  }
});

setInterval(() => {
  currentScale = currentScale + 1;
  if (currentScale === scales.length) {
    currentScale = 0;
  }
  io.emit('scalechange', {scale: scales[currentScale]})
}, 5000)
