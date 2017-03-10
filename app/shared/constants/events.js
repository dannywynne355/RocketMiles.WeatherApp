angular.module('WeatherApp.config')
    .constant('broadcastEvents', {
        currentLocation: {
            useDefaultLocaleNotification: 'use-default-locale-notification',
            useCurrentGeolocationNotification: 'use-current-geolocation-notification'
        }
    })
    ;