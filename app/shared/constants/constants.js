angular.module('WeatherApp.config', [])
    .constant('appCookie', {
        name: 'WeatherApp'
    })
    .constant('appEnvironment', {
        production: {
            name: 'production',
            hosts: [
                ''
            ]
        }
    });