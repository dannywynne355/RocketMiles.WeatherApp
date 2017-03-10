angular.module('WeatherApp.config')    
    .constant('appEnvironment', {
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
        city: 'Chicago',        
        countryCode: 'US',
        latitude: '41.883030',
        longitude: '-87.644101',
        state: 'IL',        
        zip: '60661'
    })
    