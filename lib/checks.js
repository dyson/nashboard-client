module.exports.load = function(config) {

  var checks = config.get('checks'),
      checks_path = config.get('checks_path'),
      loaded_checks = {};

  for (var type in checks) {
    for (var check in checks[type]) {

      var label = checks[type][check]['label']

      if ( ! label) {
        label = check;
      }

      loaded_checks[label] =
        {
          "label": label,
          "run": require(checks_path + '/' + type + '/' + check),
          "interval": checks[type][check]['interval']
        };

    }
  }

  exports['loaded'] = loaded_checks;

  return exports;
}
