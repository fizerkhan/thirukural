//  This code does not work
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var thirukuralData = require('../crawler/thirukural.json');
var kurals = thirukuralData.kurals;

console.log(__dirname);
function saveFile() {
  var result = JSON.stringify(thirukuralData, null, 2);
  fs.writeFile(__dirname + '/../crawler/thirukural.json', result, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('JSON saved!');
    }
  });
}

var tamilArray = require('../crawler/thirukural-ta.json');
var englishArray = require('../crawler/thirukural-en.json');

// Save to file

for (var j = 0; j < tamilArray.length; j++) {
    var object = tamilArray[j];
    var number = parseInt(object.url.split('=')[1]);
    var index = number - 1;
    var kural = kurals[index];
    kural.meaning = kural.meaning || {};
    kural.meaning.ta_mu_va = object.ta_mu_va;
    kural.meaning.ta_salamon = object.ta_salamon;
}

for (var j = 0; j < englishArray.length; j++) {
    var object = englishArray[j];
    var number = parseInt(object.url.split('=')[1]);
    var index = number - 1;
    var kural = kurals[index];
    kural.meaning = kural.meaning || {};
    kural.meaning.en = object.en;
}

saveFile();

// // Find Missing indexes
// var kuralsIndexes = [];
// for (var i = 1; i <= 1330; i++) {
//     kuralsIndexes.push(i);
// }

// var availableIndexes = [];
// for (var i = 0; i < tamilArray.length; i++) {
//     var number = parseInt(tamilArray[i].url.split('=')[1]);
//     availableIndexes.push(number);
// };
// availableIndexes = _.uniq(availableIndexes);

// var diffArray = _.difference(kuralsIndexes, availableIndexes);

// console.log('Length ' + kuralsIndexes.length);
// console.log('Length ' + availableIndexes.length);
// console.log(diffArray.join(','));




