angular.module('WeatherApp.services')
    .factory('mainSvc', function ($http, apiResourceSvc, appCookieSvc) {
        var svc = {};

        svc.getForecast = function () {
            var config = apiResourceSvc.resource().forecast.read;
            // config.data = {};

            return apiResourceSvc
                .makeRequest(config)
                .then(
                function (response) {
                    var r = apiResourceSvc.promiseSuccessHandler(response);
                    
                    // Check for something wacky happening - we either didn't get a user record back, or the user doesn't have an id
                    /*
                    if (!response.data.d || !response.data.d.BodyCopy) {
                        r = apiResourceSvc.trappedErrorHandler(response);
                        r.error = {
                            exceptionType: 'Exception',
                            message: 'Unable to fetch Terms of Use'
                        };
                    } else {
                        var lastUpdated = response.data.d.LastUpdated.replace('/Date(', '');
                        lastUpdated = parseInt(lastUpdated, 10);

                        var terms = {
                            text: response.data.d.BodyCopy,
                            lastUpdated: new Date(lastUpdated)
                        }
                        r.data = terms;
                    }
                    */
                    return r;
                },
                function (response) {
                    // Get response (error) object
                    var r = apiResourceSvc.promiseErrorHandler(response);
                    return r;
                }
            );
        };

        return svc;
    });