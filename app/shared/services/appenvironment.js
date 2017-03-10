/*
    Provides interface to determine the environment for the App.
    Possibilities include Development, Staging, and Production.
    Uses the host name of the App to determine environment
 */
angular.module('WeatherApp.services')
    .factory('environmentService', appEnvironment);

appEnvironment.$inject = ['$location', 'appEnvironmentSettings'];

function appEnvironment($location, appEnvironmentSettings) {
    var svc = {};

    /* Returns an object containing the environment settings */
    svc.getEnvironment = function () {
        if (appEnvironmentSettings.development
            && appEnvironmentSettings.development.hosts.indexOf($location.host()) > -1) {
            return appEnvironmentSettings.development;
        } else if (appEnvironmentSettings.staging
            && appEnvironmentSettings.staging.hosts.indexOf($location.host()) > -1) {
            return appEnvironmentSettings.staging;
        } else {
            return appEnvironmentSettings.production;
        }
        ;
    };

    return svc;
}