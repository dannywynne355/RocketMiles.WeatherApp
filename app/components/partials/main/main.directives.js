/*
var WeatherAppDirectives = angular.module('WeatherApp.directives');

 WeatherAppDirectives.directive('routeLoadingIndicator', routeLoadingIndicator);

var routeLoadingIndicator = function ($rootScope) {
    return {
        restrict: 'E',
        template: "<div class='col-lg-12' ng-if='isWeatherLoading'><h1>Loading <i class='fa fa-cog fa-spin'></i></h1></div>",
        link: function (scope, elem, attrs) {
            scope.isWeatherLoading = false;

            $rootScope.$on('$routeChangeStart', function () {
                scope.isWeatherLoading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                scope.isWeatherLoading = false;
            });
        }
    };
};

routeLoadingIndicator.$inject = ['$rootScope'];
*/