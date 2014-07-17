var base91 = require('base91');
var exec = require('child_process').exec;
var format = require('format');
var prompt = require('prompt');

var schema = {
  properties: {
    passphrase: {
      hidden: true
    },
    id: {}
  }
};

prompt.start();
prompt.get(schema, function (err, result) {
  if (err) {
    return console.log(err);
  }

  var concat = result.passphrase + ' ' + result.id;

  var cmd = format('echo %s | shasum -a 512', concat);
  exec(cmd, function (err, stdout, stderr) {
    if (err || stderr) {
      return console.log(err || stderr);
    }

    var hash = stdout;
    var encoded = base91.encode(hash);

    console.log(encoded);
    cmd = format('echo %s | pbcopy', encoded);
    exec(cmd, function (err, stdout, sterr) {
      if (err || stderr) {
        return console.log(err || stderr);
      }

      console.log('Copied to clipboard!');
    });
  });
});
