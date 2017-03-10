angular.module('WeatherApp.config')
    .constant('broadcastEvents', {
        setLocation: {
            useDefaultLocaleNotification: 'use-default-locale-notification',
            updateNotification: 'update-notification',            
            refreshNotification: 'refresh-data-notification'
        }
    })
    ;