var weatherApp = angular.module('WeatherApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'WeatherApp.config', 'WeatherApp.services', 'WeatherApp.controllers', 'WeatherApp.routes', 'ui.bootstrap'])
    .config(['$httpProvider', function ($httpProvider) {
        //$httpProvider.defaults.withCredentials = true; MOVED TO constants, API definition
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ])    
    .run(['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout){
            $rootScope.$on("$routeChangeStart", function (event, next, current) {

                var routeRequest = function () {
                                   
                };

                routeRequest();
            })
        }
    ])    
;

/* Initialize */
angular.module('WeatherApp.config', []);
angular.module('WeatherApp.services', []);
angular.module('WeatherApp.controllers', ['ui.bootstrap']);
angular.module('WeatherApp.directives', []);
    