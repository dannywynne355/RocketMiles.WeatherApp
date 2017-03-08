angular.module('WeatherApp.config')
    .constant('apiEndpoints', {
        forecast: {
            read: {
                method: 'GET',
                url: 'datasets',
                withCredentials: false,
                data: {}
            }
        }
    });