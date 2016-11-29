var SerialPort = require('serialport');

var FILE_NAME = 'SERIAL';

var port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 9600
});

port.on('open', function() {
  console.log(FILE_NAME, '==>', 'Serial communication is open...');
});

port.on('error', function(err) {
  console.error(FILE_NAME, '==>', err.message);
})

port.on('data', function(data){
  console.log(new Buffer(data).toString());
})

function writeToPort(data) {
  if (!port.isOpen()) return;

  port.write(new Buffer(data), function(err) {
    if(err) {
      console.error(FILE_NAME, '==>', err.message);
    } else {
      console.log(FILE_NAME, '==>', 'Wrote to serial:', data);
    }
  });
}

module.exports.writeToPort = writeToPort;
