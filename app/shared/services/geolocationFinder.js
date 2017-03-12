/*
    Fetches the current geolocation info via the api at http://ip-api.com
    as a promise
*/
angular.module('WeatherApp.services')
    .factory('geolocationFinder', geolocationFinder);

function geolocationFinder($q, $http, Locale, localeType) {
    var deferred = $q.defer();

    var currentLocation = new Locale();

    $http.get('http://ip-api.com/json')
        .then(function (response) {
            var data = response.data;
            data.localeType = localeType.geolocation;
            // Copying over fields to standard ones for state
            data.state = data.region;
            data.stateName = data.regionName;
            currentLocation.setData(data);
            deferred.resolve(currentLocation);
        })
        .catch(function (response) {
            deferred.resolve(currentLocation);
        })
        .finally(function () {

        });

    return deferred.promise;
}

geolocationFinder.$inject = ['$q', '$http', 'Locale', 'localeType'];