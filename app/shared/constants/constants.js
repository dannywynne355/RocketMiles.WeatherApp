angular.module('WeatherApp.config', [])
    .constant('appCookie', {
        name: 'WeatherApp'
    })
    .constant('appEnvironment', {
        production: {
            name: 'PRODUCTION',
            api: {
                urlRoot: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/',
                user: 'dannywynne@the355group.com',                
                token: 'iodYvwBfNbUFuoIWQYVeQwDxwAVeaYao'
            },
            hosts: [
                ''
            ]
        }
    })