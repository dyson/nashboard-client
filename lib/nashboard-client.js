exports.run = function () {

  var config = require('./config');

  var io = require('socket.io-client'),
      socket = io.connect('https://' + config.get("server:host") + ':' + config.get('server:port'), {
          secure: true,
          query: 'client=' + config.get('client:name') + '&token=' + config.get('client:token')
        }),
      checks = require('./checks').load(config);

  socket.on('error', function (reason){
    console.error('Unable to connect Socket.IO', reason);
  });


  console.log(checks.loaded);

  socket.on('connect', function() {
    for(var check in checks.loaded) {
      interval_check(checks.loaded[check]);
    }
    function interval_check(check) {
      setInterval(function() {
        // console.log(check.run.filename + ' - ' + check.label + ' - ' + check.interval);
        check.run.check(socket);
      }, check.interval);
    }
  });

  socket.on('disconnect', function() {
  });
};
