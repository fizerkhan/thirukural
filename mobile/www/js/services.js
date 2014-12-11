angular.module('thirukural.services', [])
.factory('JSONService', function($http) {
    return $http.get('data/thirukural.json');
});
