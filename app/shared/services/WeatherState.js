/*
    Locale - data structure for a place/location/zip code
*/
angular.module('WeatherApp.services')
    .factory('WeatherState', weatherState);

weatherState.$inject = [];

function weatherState() {
    function WeatherState(data) {
        if (data) {
            this.setData(data);
        }

    };
    WeatherState.default = {
        city: {
            id: false,
            name: false,
            country: false,
            coord: {
                latitude: false,
                longitude: false
            }
        },
        weather: {
            id: false,
            main: false,
            description: false,
            icon: false,
        },
        main: {
            temperature: false,
            temperatureUnits: false,
            humidity: false,
            pressure: false
        },
        wind: {
            speed: false,
            deg: false,
            direction: false,
            speedUnits: false
        },
        clouds: false,
        rain: false,
        snow: false,
        timestamp: false
    };    
        
    WeatherState.prototype = angular.extend(
        {
            setData: function (data) {
                angular.extend(this, data);
            }
        },
        WeatherState.default
    );

    return WeatherState;
}