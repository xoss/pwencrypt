var base91 = require('base91');
var prompt = require('prompt');
///var sha512 = require('sha512');
var sha512 = require('js-sha512').sha512;

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

  console.log('Passphrase: ' + result.passphrase);
  console.log('Id: ' + result.id);

  var concat = result.passphrase + ' ' + result.id;

  console.log('Passphrase + Id: ' + concat);
  var hash = sha512(concat).toString('hex');
  console.log('hash: ' + hash);
  var encoded = base91.encode(hash);

  console.log('encoded: ' + encoded.toString());
});
