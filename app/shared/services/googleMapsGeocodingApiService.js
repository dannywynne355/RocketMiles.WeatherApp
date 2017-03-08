/*
    Generic service to handle communicatie with the NOAA Api
*/
angular.module('WeatherApp.services')
    .factory('googleMapsGeocodingApiSvc', function ($http, environmentService) {
        var svc = {};

        /* Fetch endpoint definitions */
        svc.resource = function () {
            return {
                zipLookup: {
                    method: 'GET',
                    url: 'http://maps.googleapis.com/maps/api/geocode/json?address={0}',
                    withCredentials: false,
                    data: {}
                }
            };
        }

        /* Get config settings for environment */
        svc.environment = environmentService.getEnvironment();

        /* Appends the root depending on the environment of the site */
        svc.formatApiUrl = function (url) {
            url = url.replace("{0}", "60490");
            if (url.indexOf('http') > -1) {
                return url;
            }            
            return this.resource[this.environment.name].urlRoot + url;
        };        

        /* Returns a promise for an api request */
        svc.makeRequest = function (config) {
            // Add appropriate host to request depending on environment            
            if (config.url) {
                config.url = this.formatApiUrl(config.url);
            }

            return $http(config);
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
        svc.promiseSuccessHandler = function (response) {
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
        svc.trappedErrorHandler = function (response) {
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
        svc.promiseErrorHandler = function (response) {
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