/*
    Generic service to handle communicatie with the NOAA Api
*/
angular.module('WeatherApp.services')
    .factory('apiBaseSvc', function ($http, appEnvironment) {
        // var svc = { };

        // environment: environmentService.getEnvironment() // Get config settings for environment
        var svc = function () { 
            
        };
        
        /* Fetch api resource configuration and endpoints */
        svc.prototype.resource = function () {
            return {};
        }
        
        /* Get config settings for environment */
        svc.prototype.environment = appEnvironment.getEnvironment();
                        
        /* Api-specific adjustments for config args */
        svc.prototype.prepareConfig = function (config) {            
            return config;
        }

        /* Returns a promise for an api request */
        svc.prototype.makeRequest = function (config) {
            return $http(this.prepareConfig(config));
        }

        /*
        Formats the response of a promise
         */
        function issueResponse(data, error, status, statusText) {
            status = Math.max(status, 0);

            return {
                error: error,
                data: data,
                status: status,
                statusText: statusText
            };
        }

        /*
        Format response object when successful request.  Properties include:
         - error
         - data
         - status
         - statusText
         */
        svc.prototype.promiseSuccessHandler = function (response) {
            return issueResponse(
                response.data,
                null,
                200,
                'OK'
            );
        };

        /*
        Format response object for manually trapping an unexpected data condition.  Properties include:
         - error
         - data
         - status
         - statusText
         */
        svc.prototype.trappedErrorHandler = function (response) {
            return issueResponse(
                {},
                {},
                400,
                'Bad request'
            );
        };

        /*
        Formats response object if an error occurs.  Properties include:
         - error
         - data
         - status
         - statusText
         */
        svc.prototype.promiseErrorHandler = function (response) {
            // NOTE: transforming exception to get case correct          
            return issueResponse(
                {},
                {
                    exceptionType: response.data.status,
                    message: response.data.message
                },
                400,
                'Bad Request'
            );
        };

        return svc;
    });