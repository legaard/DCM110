 var particle = new (require('particle-api-js'))(),
     exec = require('child_process').exec,
     Q = require('q'),
     spotify = require('./spotify-controller');

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

//Example: listen for light values and change volume based on that
registerEventListener('light', function(dataObj){
  var lightValue = dataObj.data;

  if (lightValue > 600) {
    spotify.setVolume(5);
  } else if (lightValue < 600 && lightValue > 400) {
    spotify.setVolume(4);
  } else if (lightValue < 400 && lightValue > 200) {
    spotify.setVolume(3);
  } else {
    spotify.nextSong();
  }
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
