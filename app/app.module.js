/* Create app */
var weatherApp = angular.module('WeatherApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'WeatherApp.config', 'WeatherApp.services', 'WeatherApp.controllers', 'WeatherApp.routes', 'ui.bootstrap'])
    .config(appConfig)    
    .run(appRun)    
;

/* Tasks to execute on injector registration/configuration phase */
function appConfig($httpProvider) {
    // Overriding default to allow cross domain requests
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

/* Tasks to execute on injector creation */
function appRun($rootScope, $location, $timeout) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
    
        var routeRequest = function () {

        };

        routeRequest();
    })
}

/* Initialize dependencies */
angular.module('WeatherApp.config', []);
angular.module('WeatherApp.routes', []);
angular.module('WeatherApp.services', []);
angular.module('WeatherApp.controllers', ['ui.bootstrap']);
angular.module('WeatherApp.directives', []);
    