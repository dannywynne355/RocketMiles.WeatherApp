
var WeatherAppDirectives = angular.module('WeatherApp.directives');

WeatherAppDirectives.directive('weatherLoadingIndicator', weatherLoadingIndicator);
function weatherLoadingIndicator() {
    return {
        restrict: 'E',
        template: "<div class='col-lg-12' ng-if='isWeatherLoading'><h2>Wait for it... <i class='fa fa-cog fa-spin'></i></h2></div>",
        link: function (scope, elem, attrs) {
            scope.isWeatherLoading = false;

            scope.$on('$selectedLocaleStart', function () {                
                scope.isWeatherLoading = true;
            });

            scope.$on('$selectedLocaleSuccess', function () {                
                scope.isWeatherLoading = false;
            });
        }
    };
}

weatherLoadingIndicator.$inject = [];
