/*  
    Provides data access for weather info.  Transforms data into
    LocaleWeather structure
*/
angular.module('WeatherApp.services')
    .factory('weatherData', WeatherData);

function WeatherData(openWeatherMapApi, openWeatherMapApiSettings, openWeatherMapJsonParser, Locale, LocaleWeather, WeatherState) {
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
        Gets the upcoming forecast in 3 hour increments for the supplied locale.
    */
    svc.getImmediateForecast = function (locale) {
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
                                var forecasts = response.data.list;
                                var next12Hours = [];
                                angular.forEach(forecasts, function (forecast, idx) {
                                    if (idx < 4) {
                                        // console.log(idx);
                                        // console.log(forecast);
                                        var currentForecast = openWeatherMapJsonParser.parseResponse(response.data,
                                            {
                                                offsets: {
                                                    city: ['city'],
                                                    weather: ['list', idx, 'weather', 0],
                                                    wind: ['list', idx, 'wind'],
                                                    main: ['list', idx, 'main'],
                                                    clouds: ['list', idx, 'clouds'],
                                                    timestamp: ['list', idx],
                                                    rain: ['list', idx, 'rain'],
                                                    snow: ['list', idx, 'snow']
                                                }
                                            });                                        
                                        this.push(currentForecast);
                                    }
                                }, next12Hours);
                                
                                return next12Hours;
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

    svc.getExtendedForecast = function (locale) {
        var api = new openWeatherMapApi();
        var queryType = this.getSearchType(locale);
        if (queryType) {
            var config = api.resource().endpoints.extendedForecast[queryType];
            return api
                .makeRequest(config)
                .then(
                    function (response) {
                        if (response.error) {
                            return false;
                        } else {
                            if (response.data.cnt > 0
                                && response.data.list) {                                
                                var forecasts = response.data.list;
                                var nextSeveralDays = [];
                                angular.forEach(forecasts, function (forecast, idx) {                                    
                                    if (idx < Math.min(7, openWeatherMapApiSettings.config.settings.extendedForecast.maxNumberOfDays)) {
                                        var dailyForecast = openWeatherMapJsonParser.parseResponse(response.data,
                                            {
                                                offsets: {
                                                    city: ['city'],
                                                    weather: ['list', idx, 'weather', 0],
                                                    wind: ['list', idx],
                                                    main: ['list', idx],
                                                    clouds: ['list', idx, 'clouds'],
                                                    timestamp: ['list', idx]
                                                },
                                                fieldNameMap: {
                                                    clouds: { all: "clouds" }
                                                }
                                            });
                                        // Special case for min and max temperature                                        
                                        dailyForecast.forecast.min = dailyForecast.main.temperature.hasOwnProperty("min") ? dailyForecast.main.temperature.min : false;
                                        dailyForecast.forecast.max = dailyForecast.main.temperature.hasOwnProperty("max") ? dailyForecast.main.temperature.max : false;
                                        this.push(dailyForecast);
                                    }
                                }, nextSeveralDays);
                                return nextSeveralDays;
                            }

                            return false;                            
                        }
                    }, function (response) {
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
                                    console.log('checkign city');
                                    console.log(weather);
                                    
                                    var returnedLocale = new Locale({
                                        city: weather.city.name,
                                        cityId: weather.city.id,
                                        zip: weather.city.zip ? weather.city.zip : false,
                                        latitude: weather.city.coord.latitude,
                                        longitude: weather.city.coord.longitude,                          
                                    });
                                    
                                    var weatherReport = new LocaleWeather();
                                    weatherReport.Locale = returnedLocale;
                                    weatherReport.CurrentWeather = weather;                                    
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
        loadImmediateForecast = function (weatherReport) {
            // Fetches the forecast in 3 hour chunks.  Assumes locale defined in weatherReport.Locale.
            // NOTE: weatherReport can be false
            if (weatherReport) {
                return svc
                        .getImmediateForecast(weatherReport.Locale)
                            .then(
                                function (immediateForecast) {
                                    if (immediateForecast) {
                                        weatherReport.ImmediateForecast = immediateForecast;
                                        return weatherReport;
                                    } else {
                                        // We got something, so pass it along
                                        return weatherReport;
                                    }
                                },
                                function (error) {
                                    // We got something, so pass it along
                                    return weatherReport;
                                }
                            );
            } else {
                return false;
            }
        },
        loadExtendedForecast = function (weatherReport) {
            // Fetches the daily forecast.  Assumes locale defined in weatherReport.Locale.
            // NOTE: weatherReport can be false
            if (weatherReport) {
                return svc
                        .getExtendedForecast(weatherReport.Locale)
                            .then(
                                function (extendedForecast) {
                                    if (extendedForecast) {                                        
                                        weatherReport.DailyForecast = extendedForecast;                                        
                                        return weatherReport;
                                    } else {
                                        // We got something, so pass it along
                                        return weatherReport;
                                    }
                                },
                                function (error) {
                                    // We got something, so pass it along
                                    return weatherReport;
                                }
                            );
            } else {
                return false;
            }
        };

        // Main call
        return loadCurrentWeather(locale)
            .then(loadImmediateForecast)
            .then(loadExtendedForecast);
    };

    return svc;
}

WeatherData.$inject = ['openWeatherMapApi', 'openWeatherMapApiSettings', 'openWeatherMapJsonParser', 'Locale', 'LocaleWeather', 'WeatherState'];