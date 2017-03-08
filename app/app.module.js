var weatherApp = angular.module('WeatherApp', ['ngRoute', 'ngCookies', 'WeatherApp.config', 'WeatherApp.services', 'WeatherApp.controllers', 'WeatherApp.routes'])
    .config(['$httpProvider', function ($httpProvider) {
        //$httpProvider.defaults.withCredentials = true; MOVED TO constants, API definition
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])
    .run(
    
        function($rootScope, $location, $timeout){
            $rootScope.$on("$routeChangeStart", function (event, next, current) {

                var routeRequest = function () {
                                   
                };

                routeRequest();
            })
        }
    )
;

/* Initialize */
angular.module('WeatherApp.config', []);
angular.module('WeatherApp.services', []);
angular.module('WeatherApp.controllers', []);
    