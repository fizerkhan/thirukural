// Thirukural app
angular.module('thirukural', ['ionic', 'ionic.contrib.ui.cards',
                'thirukural.controllers', 'thirukural.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })


    .state('tab.surprise', {
      url: '/surprise',
      views: {
        'tab-surprise': {
          templateUrl: 'templates/tab-surprise.html',
          controller: 'SurpriseCtrl'
        }
      }
    })

    .state('tab.all', {
      url: '/all',
      views: {
        'tab-all': {
          templateUrl: 'templates/tab-all.html',
          controller: 'AllKuralsCtrl'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/tab-about.html',
          controller: 'AboutCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/surprise');

})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});


