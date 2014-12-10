//  This code does not work
var request = require('request');
var async = require('async');
var fs = require('fs');
var thirukuralData = require('./thirukural.json');
var kurals = thirukuralData.kurals;

var apiKey = process.env.APIKEY;
if (!apiKey) {
  console.log('There is no APIKEY');
  process.exit();
}

function saveFile() {
  var result = JSON.stringify(thirukuralData, null, 2);
  fs.writeFile(__dirname + 'data.json', result, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('JSON saved!');
    }
  });
}

function getTamilMeaning() {
    var options = {
        url: 'https://www.kimonolabs.com/api/3b16d948?apikey='+ apiKey,
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var array = body.results.thirukural;
          for (var i = 0; i <= array.length; i++) {
            var object = array[i];
            var kural = kurals[i];
            kural.meaning = kural.meaning || {};
            kural.meaning.ta_mu_va = object.ta_mu_va;
            kural.meaning.ta_salamon = object.ta_salamon;
          };
          saveFile();
      } else {
        console.log('Tamil Error: ' + error);
      }
  });
}

function getEnglishMeaning() {
    var options = {
        url: 'https://www.kimonolabs.com/api/2mfbd70k?apikey='+ apiKey,
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var array = body.results.thirukural;
          for (var i = 0; i <= array.length; i++) {
            var object = array[i];
            var kural = kurals[i];
            kural.meaning = kural.meaning || {};
            kural.meaning.en = object.en;
          };
          saveFile();
      } else {
        console.log('English Error: ' + error);
      }
  });
}

// getTamilMeaning();
// getEnglishMeaning();
console.log(require('./thirukural-ta.json').length);
console.log(require('./thirukural-en.json').length);
