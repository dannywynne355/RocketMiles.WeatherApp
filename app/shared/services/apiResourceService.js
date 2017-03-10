/*
    Generic service to handle communicatie with the NOAA Api
*/
angular.module('WeatherApp.services')
    .factory('apiResourceSvc', ['$http', 'apiSettings', 'appEnvironment', 'apiBaseSvc', function ($http, apiSettings, appEnvironment, apiBaseSvc) {
        var child = function () {
            apiBaseSvc.apply(this, arguments);
        };
        
              
        
        /*
        var child = function () {
            // apiBaseSvc.constructor.call(this)
            apiBaseSvc.apply(this, arguments);
        };
        */

        // Get base class prototype properties
        //child.prototype = apiBaseSvc.prototype;        
        angular.extend(child.prototype, apiBaseSvc.prototype);

        /* Fetch api configuration */        
        child.prototype.resource = function () {
            return apiSettings;
        }
        
        /* Appends the root depending on the environment of the site */
        /*
        svc.formatApiUrl = function (url) {
            if (url.indexOf('http') > -1) {
                return url;
            }
            console.log(apiSettings);
            console.log(this.resource());
            return apiSettings.config[this.environment.name].urlRoot + url;
        };
        */
        /* Adds token to header per Api directions - https://www.ncdc.noaa.gov/cdo-web/webservices/v2#gettingStarted */
        child.prototype.setHeaders = function () {                        
            return {
                token: apiSettings.config[this.environment.name].credentials.token
            }
        };
        
        child.prototype.prepareConfig = function (config) {            
            // Add header to set token for credentials                   
            config.headers = this.setHeaders();
            config.url = this.formatApiUrl(config.url);
            // Apply base logic
            return apiBaseSvc.prototype.prepareConfig(config);            
        }
        
        /* Appends the root depending on the environment of the site */
        child.prototype.formatApiUrl = function (url) {
            if (url.indexOf('http') > -1) {
                return url;
            }            
            return this.resource().config[this.environment.name].urlRoot + url;
        };

        /* Returns a promise for an api request */
        /*
        svc.makeRequest = function (config) {
            // Add appropriate host to request depending on environment            
            if (config.url) {
                config.url = this.formatApiUrl(config.url);
            }            
            
            // Add header to set token for credentials
            config.headers = this.setHeaders();

            return $http(config);
        }
        */
        return child;
    }]);