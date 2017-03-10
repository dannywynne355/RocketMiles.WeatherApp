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
            id: '',
            name: '',
            coord: {
                latitude: '',
                longitude: ''
            }
        },
        weather: {
            id: '',
            main: '',
            description: '',
            icon: ''
        },
        main: {
            temperature: '',
            temperatureUnits: '',
            humidity: '',
            pressure: ''
        },
        wind: {
            speed: '',
            deg: ''
        },
        clouds: '',
        rain: '',
        snow: '',
        timestamp: ''
    };    
        
    WeatherState.prototype = angular.extend(
        {
            setData: function (data) {
                angular.extend(this, data);
            }
        },
        WeatherState.default
    );

    /*
    WeatherState.prototype = {
        city : {
            id : '',
            name : '',
            coord : {
                latitude: '',
                longitude: ''
            }
        },    			
        weather : {
            id : '',
            main : '',
            description : '',
            icon : ''
        },
        main : {
            temperature : '',
            humidity : '',
            pressure : ''
        },
        wind : {
            speed : '',
            deg : ''
        },
        clouds : '',
        rain : '',
        snow : '',
        timestamp: '',
        setData: function (localeData) {
            angular.extend(this, localeData);
        }
    };
    */
    return WeatherState;
}