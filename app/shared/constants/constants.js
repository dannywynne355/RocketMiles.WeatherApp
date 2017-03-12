/*
    General constants for WeatherApp 
*/
angular.module('WeatherApp.config')
    .constant('appEnvironmentSettings', {
        production: {
            name: 'production',
            hosts: [
                ''
            ]
        }
    })
    .constant('localeType', {
        default: 'default',
        geolocation: 'geolocation',
        userAdded: 'userAdded'
    })
    .constant('defaultLocale', {
        localeType: 'default',
        city: 'Chicago',        
        countryCode: 'US',
        // latitude: '41.883030', Hiding lat & long because api was not returning full weather
        // longitude: '-87.644101',
        state: 'IL',        
        zip: '60661',
        cityId: '4887398' // Internal identifier for openweathermap api
    })
    