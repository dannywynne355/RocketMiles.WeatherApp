/*
    Provides data access for weather info.  Transforms data into
    LocaleWeather structure
*/
angular.module('WeatherApp.services')
    .factory('weatherData', WeatherData);

function WeatherData(openWeatherMapApi) {
    var svc = {};

    /* 
    Get the type of query based on locale data.
    Go in order of accuracy 1) geolocation, 2) existing city id,
    3) zip code, 4) city name
    */
    svc.getSearchType = function (locale) {
        if (locale.latitude && locale.longitude) {
            return "byGeolocation";
        } else if (locale.cityId) {
            return "byCityId";
        } else if (locale.zip) {
            return "byZip";
        } else if (locale.city) {
            return "byCityName";
        } else {
            return false;
        }
    };

    svc.getCurrentWeather = function (locale) {
        var api = new openWeatherMapApi();
        console.log(api.resource().endpoints.currentWeather.byZip);
        var config = api.resource().endpoints.currentWeather.byZip;

        return api
            .makeRequest(config)
            .then(
                function (response) {
                    return api.promiseSuccessHandler(response);
                },

                function (response) {
                    // Get response (error) object                        
                    return api.promiseErrorHandler(response);
                }
            );
    };

    svc.getWeather = function (locale) {
        // {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":23.52,"pressure":1030,"humidity":25,"temp_min":19.4,"temp_max":26.6},"visibility":16093,"wind":{"speed":8.05,"deg":340},"clouds":{"all":75},"dt":1489208160,"sys":{"type":1,"id":961,"message":0.0069,"country":"US","sunrise":1489234099,"sunset":1489276391},"id":4887398,"name":"Chicago","cod":200}
        return svc.getCurrentWeather(locale)
            .then(
                function (response) {
                    console.log(response);
                },

                function (response) {
                    // Get response (error) object                        
                    console.log(response);
                }
            );
    };

    return svc;
}

WeatherData.$inject = ['openWeatherMapApi'];