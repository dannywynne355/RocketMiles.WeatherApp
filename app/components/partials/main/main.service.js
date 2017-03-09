angular.module('WeatherApp.services')
    .factory('zipCodeLookupSvc', function ($http, googleMapsGeocodingApiSvc, appCookieSvc) {
        var svc = {};

        svc.getExtent = function () {
            var config = googleMapsGeocodingApiSvc.resource().zipLookup;
            // config.data = {};
            
            return googleMapsGeocodingApiSvc
                .makeRequest(config)
                .then(
                function (response) {
                    var r = googleMapsGeocodingApiSvc.promiseSuccessHandler(response);

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
                    var r = googleMapsGeocodingApiSvc.promiseErrorHandler(response);
                    return r;
                }
            );
        };

        return svc;
    })
    .factory('mainSvc', function ($http, apiRequestSvc, apiResourceSvc, appCookieSvc) {
        var svc = {};

        svc.getForecast = function () {
            //var api = new apiResourceSvc();            
            //var config = api.resource().endpoints.forecast.read;
            // config.data = {};            
            var api = new apiResourceSvc();
            var config = api.resource().endpoints.forecast.read;

            var callback = function () {                
                return api.makeRequest(config);
            }
            //.getOrAdd(api.makeRequest(config))

            return apiRequestSvc
                .getOrAdd(config.url, callback)
                .then(
                    function (response) {                        
                        return api.promiseSuccessHandler(response);
                        return r;
                    },
                    function (response) {
                        // Get response (error) object                        
                        return api.promiseErrorHandler(response);                    
                    }
                );
            

            /*
            return api
                .makeRequest(config)
                .then(
                function (response) {
                    var r = api.promiseSuccessHandler(response);
*/                    
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
/*
                    return r;
                },
                function (response) {
                    // Get response (error) object
                    var r = api.promiseErrorHandler(response);
                    return r;
                }
            );
*/
        };

        return svc;
    });