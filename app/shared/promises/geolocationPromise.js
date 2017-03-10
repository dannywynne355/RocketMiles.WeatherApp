/*
    Fetches the current geolocation info via the api at http://ip-api.com
*/
angular.module('WeatherApp.services')
    .factory('geolocationPromise', ['$q', '$http', 'Locale', function ($q, $http, Locale) {

        var deferred = $q.defer();
                
        var currentLocation = new Locale();
        
        $http.get('http://ip-api.com/json')
            .then(function (response) {
                var data = response.data;
                currentLocation.setData(data);                
                deferred.resolve(currentLocation);
            })
            .catch(function(response) {
                deferred.resolve(currentLocation);
            })
            .finally(function () {

            });            

        return deferred.promise;

    }]);