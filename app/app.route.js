angular.module('WeatherApp.routes', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'app/components/partials/main/main.view.html'
        })
        .otherwise({
            controller: 'MainCtrl',
            templateUrl: 'app/components/partials/main/main.view.html'
        });
    }]);