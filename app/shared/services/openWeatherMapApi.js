/*
    Communication interface with openweathermap.org api
*/

angular.module('WeatherApp.services')
    .factory('openWeatherMapApi', OpenWeatherMapApi);

function OpenWeatherMapApi(apiBase, openWeatherMapApiSettings, defaultLocale, weatherUnits) {
    var child = function () {
        apiBase.apply(this, arguments);
    };

    /* Create a String.format() statement - can pass comma-delimited string or a simple array */
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
    angular.extend(child.prototype, apiBase.prototype);

    /* Fetch api configuration */
    child.prototype.resource = function () {
        return openWeatherMapApiSettings;
    }

    /* Modifications to config before execution */
    child.prototype.prepareConfig = function (config) {
        config.url = this.formatApiUrl(config.url);
        config.url = this.setUrlParameterValues(config);
        // Apply base logic
        return apiBase.prototype.prepareConfig(config);
    }

    /* Replaces string placeholders with parameter data */
    child.prototype.setUrlParameterValues = function (config) {
        if (config.parameters
            && config.parameters.length > 0) {
            var paramValues = [];
            var requestConfig = this.resource().config[this.environment.name];
            angular.forEach(config.parameters, function (param, idx) {
                if (param == "token") {
                    this.push(requestConfig.credentials.token);
                } else if (param == "units") {                    
                    this.push(weatherUnits.get());
                } else {                    
                    this.push(defaultLocale[param]);
                }                
            }, paramValues);
            config.url = config.url.format(paramValues);
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
}

OpenWeatherMapApi.$inject = ['apiBase', 'openWeatherMapApiSettings', 'defaultLocale', 'weatherUnits'];