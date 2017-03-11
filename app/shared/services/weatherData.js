/*  
    Provides data access for weather info.  Transforms data into
    LocaleWeather structure
*/
angular.module('WeatherApp.services')
    .factory('weatherData', WeatherData);

function WeatherData(openWeatherMapApi, LocaleWeather, WeatherState, weatherUnits, windDirection) {
    var svc = {};

    /* 
    Get the type of query based on locale data.
    Go in order of accuracy 1) geolocation, 2) existing city id,
    3) zip code, 4) city name
    */
    svc.getSearchType = function (locale) {
        if (locale == undefined) {
            return false;
        }

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
        var queryType = svc.getSearchType(locale);
        if (queryType) {
            var config = api.resource().endpoints.currentWeather[queryType];            
            return api
                .makeRequest(config)
                .then(
                    function (response) {
                        if (response.error) {
                            return false;
                        } else {
                            console.log('sfkjlsfjksdh');
                            console.log(response.data);
                            var weather = WeatherState.default;
                            weather.city.id = response.data.id;
                            weather.city.name = response.data.name;
                            weather.city.coord.latitude = response.data.coord.lat;
                            weather.city.coord.longitude = response.data.coord.lon;
                            weather.weather.id = response.data.weather[0].id;
                            weather.weather.main = response.data.weather[0].main;
                            weather.weather.description = response.data.weather[0].description;
                            weather.weather.icon = response.data.weather[0].icon;
                            weather.main.temperature = response.data.main.temp;
                            weather.main.temperatureUnits = weatherUnits.getAbbreviation();
                            weather.main.humidity = response.data.main.humidity;
                            weather.main.pressure = response.data.main.pressure;
                            weather.wind.speed = response.data.wind.speed;
                            weather.wind.deg = response.data.wind.deg;
                            weather.wind.direction = windDirection.get(response.data.wind.deg);
                            weather.clouds = response.data.clouds.all;
                            if (response.data.hasOwnProperty('rain')
                                && typeof response.data.rain.hasOwnProperty('3h')) {
                                weather.rain = response.data.rain['3h'];
                            }
                            if (response.data.hasOwnProperty('snow')
                                && typeof response.data.snow.hasOwnProperty('3h')) {
                                weather.snow = response.data.snow['3h'];
                            }
                            weather.timestamp = response.data.dt;
                            return weather;
                            //return api.promiseSuccessHandler({ data: weather });
                        }
                    },

                    function (response) {                        
                        // There was an error - return nothing
                        return false;
                    }
                );
        }
    };

    svc.getWeather = function (locale) {
        // {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":23.52,"pressure":1030,"humidity":25,"temp_min":19.4,"temp_max":26.6},"visibility":16093,"wind":{"speed":8.05,"deg":340},"clouds":{"all":75},"dt":1489208160,"sys":{"type":1,"id":961,"message":0.0069,"country":"US","sunrise":1489234099,"sunset":1489276391},"id":4887398,"name":"Chicago","cod":200}
        return svc.getCurrentWeather(locale)
            .then(
                function (weather) {
                    if (weather) {                        
                        var weatherReport = new LocaleWeather();
                        weatherReport.Locale = locale;
                        weatherReport.CurrentWeather = weather;
                        return weatherReport;
                    } else {
                        console.log('trapped error');                        
                    }
                },

                function (response) {
                    // Get response (error) object                        
                    console.log('error');
                    console.log(response);
                }
            );
    };

    return svc;
}

WeatherData.$inject = ['openWeatherMapApi', 'LocaleWeather', 'WeatherState', 'weatherUnits', 'windDirection'];