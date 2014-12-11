angular.module('thirukural.controllers', ['ngCordova', 'thirukural.services'])

.controller('SurpriseCtrl', function($scope, JSONService) {
    JSONService.all().then(function(response) {
            $scope.thirukural = response.data;
            $scope.kurals = $scope.thirukural.kurals;
            $scope.activeKurals = Array.prototype.slice.call($scope.kurals, 0, 10);
        });

    $scope.cardSwiped = function(index) {
        $scope.addCard();
    };

    $scope.cardDestroyed = function(index) {
        $scope.activeKurals.splice(index, 1);
    };

    $scope.addCard = function() {
        var newKural = $scope.kurals[Math.floor(Math.random() * $scope.kurals.length)];
        newKural.id = Math.random();
        $scope.activeKurals.push(angular.extend({}, newKural));
    }
})

.controller('KuralCtrl', function($scope, $ionicSwipeCardDelegate) {

    $scope.goAway = function() {
        var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
        card.swipe();
    };
})

.controller('AllKuralsCtrl', function($scope, JSONService) {
    // JSONService.all().then(function(response) {
    //         $scope.thirukural = response.data;
    //         $scope.kurals = $scope.thirukural.kurals;
    //     });
})


.controller('AboutCtrl', function($scope, $cordovaSocialSharing, $location) {

    $scope.share = function () {
        var message = "Thirukural is an awesome free app for Thirukural." +
            "\n\nDownload it from here "+
            "https://play.google.com/store/apps/details?id=com.fizerkhan.thirukural";
        $cordovaSocialSharing.share(message, 'Share Thirukural with you', null, null);
    }

    $scope.feedback = function () {
        $cordovaSocialSharing
            .shareViaEmail('', 'Thirukural Feedback', 'fizerkhan@gmail.com');
    }

    $scope.rateUs = function () {
        window.open('market://details?id=com.fizerkhan.thirukural', '_system');
    }

    $scope.goBack = function() {
        $location.path('/tab/vegetables');
    }
});




