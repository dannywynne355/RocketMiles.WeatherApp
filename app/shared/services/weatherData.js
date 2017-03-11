/*  
    Provides data access for weather info.  Transforms data into
    LocaleWeather structure
*/
angular.module('WeatherApp.services')
    .factory('weatherData', WeatherData);

function WeatherData(openWeatherMapApi, openWeatherMapJsonParser, LocaleWeather, WeatherState) {
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
    

    /*
    Gets the current weather conditions for the supplied locale.
    Internal logic will determine exactly how locale location 
    is determined.
    */
    svc.getCurrentWeather = function (locale) {        
        var api = new openWeatherMapApi();
        var queryType = this.getSearchType(locale);
        if (queryType) {
            var config = api.resource().endpoints.currentWeather[queryType];            
            return api
                .makeRequest(config)
                .then(
                    function (response) {
                        if (response.error) {
                            return false;
                        } else {                            
                            return openWeatherMapJsonParser
                                .parseResponse(
                                    response.data,
                                    {
                                        offsets: {
                                            city: []
                                        }
                                    }
                                );
                        }
                    },

                    function (response) {                        
                        // There was an error - return nothing
                        return false;
                    }
                );
        }
    };

    /*
        Gets the forecast for the supplied locale.
    */
    svc.getForecast = function (locale) {
        var api = new openWeatherMapApi();
        var queryType = this.getSearchType(locale);
        if (queryType) {
            var config = api.resource().endpoints.forecast[queryType];
            return api
                .makeRequest(config)
                .then(
                    function (response) {
                        if (response.error) {
                            return false;
                        } else {
                            if (response.data.cnt > 0
                                && response.data.list) {
                                console.log(response.data);
                                var forecasts = response.data.list;
                                angular.forEach(forecasts, function (forecast, idx) {
                                    if (idx < 3) {
                                        console.log(idx);
                                        console.log(forecast);
                                        console.log(openWeatherMapJsonParser.parseResponse(response.data, 
                                            {
                                                offsets: {
                                                    city: { offset: ['city'] }
                                                }
                                            }));
                                    }
                                });
                            }
                            return false;
                        }
                    },function (response) {                        
                        // There was an error - return nothing
                        return false;
                    }
                );
        }        
    }

    svc.getWeather = function (locale) {

        var loadCurrentWeather = function (locale) {
            // Fetches current weather conditions
            return svc
                    .getCurrentWeather(locale)
                        .then(
                            function (weather) {
                                if (weather) {                        
                                    var weatherReport = new LocaleWeather();
                                    weatherReport.Locale = locale;
                                    weatherReport.CurrentWeather = weather;
                                    console.log('current weather output');
                                    console.log(weather);
                                    return weatherReport;
                                } else {                            
                                    return false;
                                }
                            },
                            function (response) {
                                // Error condition
                                return false;
                            }
                        )
        },
        loadForecast = function (weatherReport) {
            // Fetches the forecast.  Assumes locale defined in weatherReport.Locale.
            // NOTE: weatherReport can be false
            if (weatherReport) {
                return svc
                        .getForecast(weatherReport.Locale)
                            .then(
                                function (weather) {
                                    if (weather) {
                                        console.log('got forecast');
                                        return weatherReport;
                                    } else {
                                        console.log('did nit get forecast');
                                        console.log(weatherReport);
                                        return weatherReport;
                                    }
                                },
                                function (error) {
                                    console.log('forecast error');
                                    return weatherReport;
                                }
                            );
            } else {
                return false;
            }
        };

        // Main call
        return loadCurrentWeather(locale)
            .then(loadForecast);
    };

    return svc;
}

WeatherData.$inject = ['openWeatherMapApi', 'openWeatherMapJsonParser', 'LocaleWeather', 'WeatherState'];