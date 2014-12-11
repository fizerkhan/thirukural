//  This code does not work
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var thirukuralData = require('./thirukural.json');
var kurals = thirukuralData.kurals;

console.log(__dirname);
function saveFile() {
  var result = JSON.stringify(thirukuralData, null, 2);
  fs.writeFile(__dirname + '/thirukural.json', result, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('JSON saved!');
    }
  });
}

var tamilArray = require('./thirukural-ta.json');
var englishArray = require('./thirukural-en.json');

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

// var kuralsIndexes = [];
// for (var i = 1; i <= 1330; i++) {
//     kuralsIndexes.push(i);
// }

// var availableIndexes = [];
// for (var i = 0; i < englishArray.length; i++) {
//     var number = parseInt(englishArray[i].url.split('=')[1]);
//     availableIndexes.push(number);
// };
// availableIndexes = _.uniq(availableIndexes);

// var diffArray = _.difference(kuralsIndexes, availableIndexes);

// console.log('Length ' + kuralsIndexes.length);
// console.log('Length ' + availableIndexes.length);
// console.log(diffArray.join(','));

// for (var j = 0; j < diffArray.length; j++) {
//     // console.log('http://www.dinamalar.com/kural_detail.asp?kural_no=' + diffArray[j]);
//     console.log('http://www.dinamalar.com/kural_detail_en.asp?kural_no=' + diffArray[j]);
// }



