angular.module('thirukural.controllers', ['ngCordova', 'thirukural.services'])

.controller('KuralsCtrl', function($scope, $stateParams, JSONService, $cordovaSocialSharing) {
    // It can be used for both surprise as well as chapter kurals
    var chapterIndex = $stateParams.chapter;
    var kurals = [];
    var maxSize = 1330;
    var currentIndex = 0;
    $scope.activeKurals = [];
    JSONService.then(function(response) {
            var thirukural = response.data;

            if (chapterIndex) {
                maxSize = 10;
                chapterIndex = +chapterIndex;
                $scope.title = thirukural.chapters[chapterIndex];

                var beginIndex = chapterIndex * maxSize;
                var endIndex = beginIndex + maxSize;
                kurals = thirukural.kurals.slice(beginIndex, endIndex);
                $scope.activeKurals.push(kurals[currentIndex]);
                currentIndex++;

            } else {
                $scope.title = 'Surprise';
                kurals = thirukural.kurals;
                var newKural = kurals[Math.floor(Math.random() * maxSize)];
                $scope.activeKurals.push(newKural);
            }
        });

    $scope.cardSwiped = function(index) {
        $scope.addCard(index);
    };

    $scope.cardDestroyed = function(index) {
        $scope.activeKurals.splice(index, 1);
    };

    $scope.addCard = function(index) {
        if (typeof chapterIndex !== 'undefined') {
            var newKural = kurals[currentIndex];
            $scope.activeKurals.push(newKural);
            if (currentIndex === 9) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
        } else {
            var newKural = kurals[Math.floor(Math.random() * maxSize)];
            $scope.activeKurals.push(newKural);
        }
    }

    $scope.getKuralNumber = function (number) {
        var reminder = number % 10;
        if (!reminder) {
            reminder = 10;
        }
        return reminder;
    }

    $scope.share = function () {
        var kural = $scope.activeKurals[0];
        var message = kural.kural[0] + '\n' + kural.kural[1] + '\n\n' +
                      kural.meaning.ta_mu_va +  '\n\n' +
                      kural.meaning.ta_salamon + '\n\n' +
                      kural.meaning.en + '\n';
        $cordovaSocialSharing.share(message, 'This Kural is awesome!', null, null);
    }

})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
    $scope.goAway = function() {
        var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
        card.swipe();
    };
})

.controller('PalCtrl', function($scope, JSONService) {
    JSONService.then(function(response) {
            $scope.pals = response.data.pals;
        });
})

.controller('ChaptersCtrl', function($scope, $stateParams, JSONService) {
    var pal = +$stateParams.pal;
    JSONService.then(function(response) {
            $scope.title = response.data.pals[pal];
            if (pal === 0) {
                $scope.chapterStartIndex = 0;
                $scope.chapters = response.data.chapters.slice($scope.chapterStartIndex, 38);
            } else if (pal === 1) {
                $scope.chapterStartIndex = 38;
                $scope.chapters = response.data.chapters.slice($scope.chapterStartIndex, 108);
            } else if (pal === 2) {
                $scope.chapterStartIndex = 108;
                $scope.chapters = response.data.chapters.slice($scope.chapterStartIndex);
            } else {
                $scope.chapterStartIndex = 0;
                $scope.chapters = response.data.chapters.slice();
                $scope.title = 'அதிகாரங்கள்';
            }
        });
})


.controller('AboutCtrl', function($scope, $cordovaSocialSharing, $location) {

    $scope.share = function () {
        var message = "Thirukural is an awesome free app for classic Tamil sangam literature Thirukural." +
            "\n\nDownload it from here "+
            "https://play.google.com/store/apps/details?id=com.fizerkhan.thirukural";
        $cordovaSocialSharing.share(message, 'Share Thirukural with you', null, null);
    }

    $scope.feedback = function () {
        $cordovaSocialSharing
            .shareViaEmail('', 'Thirukural app feedback', 'fizerkhan@gmail.com');
    }

    $scope.rateUs = function () {
        window.open('market://details?id=com.fizerkhan.thirukural', '_system');
    }

    $scope.goBack = function() {
        $location.path('/tab/vegetables');
    }
});




