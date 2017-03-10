/*
    Handles all routing for app
*/
angular
    .module('WeatherApp.routes')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/components/partials/main/main.view.html',
            controller: 'MainController',            
        })
        .otherwise('/', {
            templateUrl: 'app/components/partials/main/main.view.html',
            controller: 'MainController',            
        });
}