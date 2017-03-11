/*
    Structure to define the complete weather synopsis for a point in time.
    Includes the locale, the current weather, and the forecast
*/
angular.module('WeatherApp.services')
    .factory('LocaleWeather', LocaleWeather);

LocaleWeather.$inject = ['Locale'];

function LocaleWeather(Locale) {
    function LocaleWeather() {
        
    };

    LocaleWeather.prototype = {
        Locale: null,
        CurrentWeather: null,
        ImmediateForecast: null,
        Forecast: null
    };

    


    return LocaleWeather;
}