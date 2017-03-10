/*
    Broadcast events used by WeatherApp
*/
angular.module('WeatherApp.config')
    .constant('broadcastEvents', {
        setLocation: {
            useDefaultLocaleNotification: 'use-default-locale-notification',        // Indicate that default locale (constant) should be used
            updateNotification: 'update-notification',                              // Indicate that a weather data request should be made
            refreshNotification: 'refresh-data-notification'                        // Indicate that the currently displayed locale should be updated
        }
    })
    ;