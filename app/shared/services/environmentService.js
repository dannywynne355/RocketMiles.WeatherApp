/*
    Provides interface to determine the environment for the App.
    Possibilities include Development, Staging, and Production.
    Uses the host name of the App to determine environment
 */
angular.module('WeatherApp.services')
    .factory('environmentService', function ($location, appEnvironment) {
        var svc = {};

        /* Returns an object containing the environment settings */
        svc.getEnvironment = function () {
            if (appEnvironment.development
                && appEnvironment.development.hosts.indexOf($location.host()) > -1) {
                return appEnvironment.development;
            } else if (appEnvironment.staging
                && appEnvironment.staging.hosts.indexOf($location.host()) > -1) {
                return appEnvironment.staging;
            } else {
                return appEnvironment.production;
            }
            ;
        };

        return svc;
    });