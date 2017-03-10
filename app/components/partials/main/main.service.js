angular.module('WeatherApp.services')    
    .factory('mainSvc', ['$http', 'apiRequestSvc', 'openWeatherMapApiSvc', 'appEnvironment', function ($http, apiRequestSvc, openWeatherMapApiSvc, appEnvironment) {
        var svc = {};

        svc.getNewApi = function () {
            var api = new openWeatherMapApiSvc();
            console.log(api.resource().endpoints.currentWeather.byZip);
            var config = api.resource().endpoints.currentWeather.byZip;

            var callback = function () {
                return api.makeRequest(config);
            }

            return apiRequestSvc
                .getOrAdd(config.url, callback)
                .then(
                    function (response) {
                        return api.promiseSuccessHandler(response);
                    },

                  function (response) {
                        // Get response (error) object                        
                        return api.promiseErrorHandler(response);
                    }
                );
        };

  

        return svc;
    }]);