/*
    Generic service to handle communicatie with the NOAA Api
*/
angular.module('WeatherApp.services')
    .factory('openWeatherMapApiSvc', ['openWeatherMapApiSettings', 'environmentService', 'apiBaseSvc', 'appCookie', 'defaultLocale',
        function (openWeatherMapApiSettings, environmentService, apiBaseSvc, appCookieSvc, defaultLocale) {
        var child = function () {
            apiBaseSvc.apply(this, arguments);
        };

        /* Create a String.format() statement */
        String.prototype.format = function () {
            var formatted = this;
            // Check if an array has been passed in or a string list
            var args = arguments.length == 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments;

            for (var i = 0; i < args.length; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                formatted = formatted.replace(regexp, args[i]);
            }
            return formatted;
        };

        // Get base class prototype properties
        //child.prototype = apiBaseSvc.prototype;        
        angular.extend(child.prototype, apiBaseSvc.prototype);

        /* Fetch api configuration */
        child.prototype.resource = function () {
            return openWeatherMapApiSettings;
        }

        /* Modifications to config before execution */
        child.prototype.prepareConfig = function (config) {
            config.url = this.formatApiUrl(config.url);
            config.url = this.setUrlParameterValues(config);
            // Apply base logic
            return apiBaseSvc.prototype.prepareConfig(config);
        }

        /* Replaces string placeholders with parameter data */
        child.prototype.setUrlParameterValues = function (config) {
            if (config.parameters
                && config.parameters.length > 0) {
                var paramValues = [];                
                var requestConfig = this.resource().config[this.environment.name];
                angular.forEach(config.parameters, function (param, idx) {
                    if (param == "token") {
                        console.log(requestConfig);
                        paramValues.push(requestConfig.credentials.token);
                    } else {
                        console.log(defaultLocale[param]);
                        paramValues.push(defaultLocale[param]);
                    }
                    console.log(idx + "-" + param);
                });                
                config.url = config.url.format(paramValues);                
                console.log(config.url);
            }

            return config.url;
        }
        /* Appends the root depending on the environment of the site */
        child.prototype.formatApiUrl = function (url) {
            if (url.indexOf('http') > -1) {
                return url;
            }
            
            return this.resource().config[this.environment.name].urlRoot + url;
        };

        return child;
    }]);