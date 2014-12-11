angular.module('thirukural.services', [])
.service('JSONService', function($http) {
    this.all =  function () {
        return $http.get('data/thirukural.json');
    }
});
