var WeatherAppDirectives = angular.module('WeatherApp.directives');

/* Submits search form when enter key is pressed */
WeatherAppDirectives.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

/* Validates the search stimuli.  Since it can be either a city or zip code, this logic is not obvious */
WeatherAppDirectives.directive('isValidSearchInput', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {

            // If it is a number, make sure it 5 digits
            // Otherwise, make sure that it is just alphabetical characters
            var checkSearchValidity = function (value) {
                var valid = true;

                // Number check - converting number back-and-forth from string
                var parsed = parseFloat(value);
                var casted = +value;
                if (parsed === casted && !isNaN(parsed) && !isNaN(casted)) {
                    valid = value.length === 5 ? true : false;
                } else {
                    // Search string has both alpha and numbers.  
                    if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
                        valid = false;
                    }
                }
                console.log(valid);
                ctrl.$setValidity('isValidSearchInput', valid);
                return value;
            };

            //For DOM -> model validation
            ctrl.$parsers.unshift(checkSearchValidity);
            //For model -> DOM validation
            ctrl.$formatters.unshift(checkSearchValidity);
        }
    };
});

/* Stop form submit process if the form is invalid */
WeatherAppDirectives.directive('onSearchSubmit', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'form',
        link: function (scope, formElement, attributes, formController) {

            var fn = $parse(attributes.onSearchSubmit);

            formElement.bind('submit', function (event) {
                // if form is not valid cancel it.
                if (!formController.$valid) return false;

                scope.$apply(function () {
                    fn(scope, { $event: event });
                });
            });
        }
    }
}]);

