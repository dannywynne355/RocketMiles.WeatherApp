/*
    Fetches the current geolocation info via the api at http://ip-api.com
*/
angular.module('WeatherApp.services')
    .factory('geolocationPromise', function ($q, $http) {

        var deferred = $q.defer();

        var currentLocation = {
            city: '',
            country: '',
            countryCode: '',
            latitude: '',
            longitude: '',
            region: '',
            regionName: '',
            zip: ''
        };

        $http.get('http://ip-api.com/json')
            .then(function (response) {
                var data = response.data;
                var loc = currentLocation;                
                loc.city = data.city;
                loc.country = data.country;
                loc.countryCode = data.countryCode;
                loc.latitude = data.lat;
                loc.longitude = data.lon;
                loc.region = data.region;
                loc.regionName = data.regionName;
                loc.zip = data.zip;                
                deferred.resolve(loc);
            })
            .catch(function(response) {
                deferred.resolve(currentLocation);
            })
            .finally(function () {

            });            

        return deferred.promise;

    });