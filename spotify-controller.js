var robot = require('robotjs');

var FILE_NAME = 'SPOTIFY';

module.exports = (function (){
  var VOLUME_INTERVAL_SIZE = 5,
      INITIAL_VOLUME_VALUE = 3;

  var currentVolume = null;

  function nextSong() {
    robot.keyTap('right', ['control', 'command']);
    console.log(FILE_NAME, '==>', 'Play next song');
  }

  function prevSong() {
    robot.keyTap('left', ['control', 'command']);
    console.log(FILE_NAME, '==>','Play previous song');
  }

  function playOrPause() {
    robot.keyTap('space');
    console.log(FILE_NAME, '==>', 'Song played/paused');
  }

  function volumeUp() {
    robot.keyTap('up', 'command');
  }

  function volumeDown() {
    robot.keyTap('down', 'command');
  }

  function volumeMute() {
    robot.keyTap('down', ['command', 'shift']);
  }

  function volumeMax() {
    robot.keyTap('up', ['command', 'shift']);
  }

  function setVolume(newVolume) {
    var volumeDiff = newVolume - currentVolume;

    // If calibration of the volume has not been executed --> do nothing
    if (currentVolume === null) {
      return;
    }

    // If the new value exeeds interval --> do nothing
    if (newVolume > VOLUME_INTERVAL_SIZE) {
      return;
    }

    // If the new value is the same --> do nothing
    if (volumeDiff === 0) {
      return;
    }

    // Turn volume up or down based on the difference between new and old value
    if (volumeDiff > 0) {
      for (var i = 0; i < volumeDiff; i++) {
        volumeUp();
      }
    } else {
      for (var j = 0; j > volumeDiff; j--) {
        volumeDown();
      }
    }

    // Set new value to current value
    currentVolume = newVolume;
    console.log(FILE_NAME, '==>', 'Changed volume to', currentVolume);
  }

  function calibrateVolume(){
    volumeMute();
    for (var i = 0; i < INITIAL_VOLUME_VALUE; i++) {
      volumeUp();
    }
    currentVolume = INITIAL_VOLUME_VALUE;
    console.log(FILE_NAME, '==>', 'Completed calibration!');
  }

  return {
    nextSong: nextSong,
    prevSong: prevSong,
    playOrPause: playOrPause,
    setVolume: setVolume,
    volumeMute: volumeMute,
    volumeMax: volumeMax,
    calibrateVolume: calibrateVolume
  };
})();
