var WeatherAppControllers = angular.module('WeatherApp.directives');

WeatherAppControllers.directive('ifZipOnly5Digits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {                
                if (val) {
                    console.log(angular.isNumber(val));
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }            
            // ctrl.$parsers.push(inputValue);
            console.log(val);
        }
    };
});