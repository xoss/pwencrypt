#!/usr/bin/env node
var base91 = require('base91');
var exec = require('child_process').exec;
var format = require('format');
var prompt = require('prompt');
var sha512 = require('sha512');

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

  var hash = sha512(concat).toString('hex');
  var encoded = base91.encode(hash);

  console.log(encoded);
});
