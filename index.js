 var particle = new (require('particle-api-js'))(),
     exec = require('child_process').exec,
     Q = require('q'),
     spotify = require('./spotify-controller'),
     light = require('./light-controller');

var FILE_NAME = 'INDEX',
    PARTICLE_ID = '410023000347343138333038',
    PARTICLE_TOKEN = 'bd4ceffcbc18c73976a51a21fcb06492594b5557';

// Opens Spotify and sets volume to '3'
exec('open /Applications/Spotify.app', function(err) {
  if (!err) {
    console.log(FILE_NAME, '==>', 'Spotify application is open...');
    //Wait for Spotify to open, calibrate volume and then play (next) song
    setTimeout(function() {
      spotify.calibrateVolume();
      spotify.nextSong();
    }, 3000);
  } else {
    console.error(err);
  }
});

registerEventListener('changeSong', function(dataObj){
  var changeSong = dataObj.data;

  if (changeSong == 'next') {
    spotify.nextSong();
    return;
  }

  if (changeSong == 'prev') {
    spotify.prevSong();
    return;
  }
});

registerEventListener('volume', function(dataObj) {
  var volume = parseInt(dataObj.data);
  spotify.setVolume(volume);
});

registerEventListener('startPause', function(dataObj) {
  spotify.playOrPause();
});

registerEventListener('changeLight', function(dataObj) {
  var lightPresetNumber = dataObj.data;
  light.writeToPort(lightPresetNumber);
});

/* PARTICLE FUNCTIONS */
function registerEventListener(eventName, callback){
  var details = {
    deviceId: PARTICLE_ID,
    auth: PARTICLE_TOKEN,
    name: eventName
  };

  particle.getEventStream(details)
          .then(function(stream){
            stream.on('event', callback);
          });
}

function callParticleFunction(functionName, argument){
  var deferred = Q.defer(),
      details = {
        deviceId: PARTICLE_ID,
        auth: PARTICLE_TOKEN,
        name: functionName,
        argument: argument
      };

  particle.callFunction(details)
          .then(function(data) {
            deferred.resolve(data);
          }, function(err) {
            deferred.reject('Failed to call particle function');
          });

  return deferred.promise;
}
