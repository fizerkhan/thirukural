var Firebase = require("firebase");
var request = require('request');

var firebaseSectionsRef = new Firebase("https://thirukural.firebaseio.com/sections");
var firebaseChaptersRef = new Firebase("https://thirukural.firebaseio.com/chapters");
var firebaseKuralsRef = new Firebase("https://thirukural.firebaseio.com/kurals");

var sections = [ "அறத்துப்பால்", "பொருட்பால்", "காமத்துப்பால்"];
var chapters = ["கடவுள் வாழ்த்து","வான் சிறப்பு","நீத்தார் பெருமை","அரண் வலியுறுத்தல்","இல்வாழ்க்கை","வாழ்க்கைத் துணைநலம்","மக்கட்பேறு","அன்புடைமை","விருந்தோம்பல்","இனியவை கூறல்","செய்ந்நன்றி அறிதல்","நடுவு நிலைமை","அடக்கமுடைமை","ஒழுக்கமுடைமை","பிறனில் விழையாமை","பொறையுடைமை","அழுக்காறாமை","வெஃகாமை","புறங்கூறாமை","பயனில சொல்லாமை","தீவினையச்சம்","ஒப்புரவறிதல்","ஈகை","புகழ்","அருளுடைமை","புலால் மறுத்தல்","தவம்","கூடா ஒழுக்கம்","கள்ளாமை","வாய்மை","வெகுளாமை","இன்னா செய்யாமை","கொல்லாமை","நிலையாமை","துறவு","மெய்யுணர்தல்","அவா அறுத்தல்","ஊழ்","இறைமாட்சி","கல்வி","கல்லாமை","கேள்வி","அறிவுடைமை","குற்றங்கடிதல்","பெரியாரைத் துணைக்கோடல்","சிற்றினம் சேராமை","தெரிந்து செயல்வகை","வலியறிதல்","காலம் அறிதல்","இடன் அறிதல்","தெரிந்து தெளிதல்","தெரிந்து வினையாடல்","சுற்றந் தழால்","பொச்சாவாமை","செங்கோன்மை","கொடுங்கோன்மை","வெருவந்த செய்யாமை","கண்ணோட்டம்","ஒற்றாடல்","ஊக்கம் உடைமை","மடி இன்மை","ஆள்வினை உடைமை","இடுக்கண் அழியாமை","அமைச்சு","சொல்வன்மை","வினைத்தூய்மை","வினைத்திட்பம்","வினைசெயல்வகை","தூது","மன்னரைச் சேர்ந்தொழுகல்","குறிப்பறிதல்","அவை அறிதல்","அவை அஞ்சாமை","நாடு","அரண்","பொருள் செயல் வகை","படைமாட்சி","படைச் செருக்கு","நட்பு","நட்பாராய்தல்","பழைமை","தீ நட்பு","கூடா நட்பு","பேதைமை","புல்லறிவாண்மை","இகல்","பகைமாட்சி","பகைத்திறம் தெரிதல்","உட்பகை","பெரியாரைப் பிழையாமை","பெண்வழிச் சேரல்","வரைவின் மகளிர்","கள்ளுண்ணாமை","சூது","மருந்து","குடிமை","மானம்","பெருமை","சான்றாண்மை","பண்புடைமை","நன்றியில் செல்வம்","நாணுடைமை","குடிசெயல் வகை","உழவு","நல்குரவு","இரவு","இரவச்சம்","கயமை","தகையணங்குறுத்தல்","குறிப்பறிதல்","புணர்ச்சி மகிழ்தல்","நலம் புனைந்துரைத்தல்","காதற் சிறப்புரைத்தல்","நாணுத் துறவுரைத்தல்","அலர் அறிவுறுத்தல்","பிரிவாற்றாமை","படர்மெலிந் திரங்கல்","கண்விதுப்பழிதல்","பசப்புறு பருவரல்","தனிப்படர் மிகுதி","நினைந்தவர் புலம்பல்","கனவுநிலை உரைத்தல்","பொழுதுகண்டு இரங்கல்","உறுப்புநலன் அழிதல்","நெஞ்சோடு கிளத்தல்","நிறையழிதல்","அவர்வயின் விதும்பல்","குறிப்பறிவுறுத்தல்","புணர்ச்சி விதும்பல்","நெஞ்சோடு புலத்தல்","புலவி","புலவி நுணுக்கம்","ஊடலுவகை"];
firebaseSectionsRef.set(sections);
firebaseChaptersRef.set(chapters);

// Fetch kurals from getthirukural
for (var i = 1000; i <= 1330; i++) {
    var options = {
        url: 'http://getthirukural.appspot.com/api/2.0/kural/' + i + '?appid=m8gzum7bzuank&format=json',
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = body.KuralSet.Kural[0];
            var number = +object.Number;
            console.log(number);

            var fireBaseObject = {
                number: number,
                kural: [object.Line1, object.Line2],
                meaning: {
                    'en': object.Translation
                }
            };

            // Store sections
            var section = "";
            if (number <= 380) {
                section = sections[0];
            } else if (number <= 1080) {
                section = sections[1];
            } else {
                section = sections[2];
            }
            fireBaseObject.section = section;

            // Store chapters
            var chapterIndex = Math.floor(number/10);
            if (number % 10 === 0)  {
                chapterIndex =  chapterIndex - 1;
            }
            console.log(chapterIndex, chapters[chapterIndex]);
            fireBaseObject.chapter = chapters[chapterIndex];

            // Store it to firefox
            firebaseKuralsRef.child(number-1).set(fireBaseObject);
        }
    });
}


