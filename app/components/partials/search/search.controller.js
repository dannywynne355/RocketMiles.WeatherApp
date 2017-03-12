var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('SearchCtrl', LocationSearch);

function LocationSearch($scope, Locale, broadcastEvents) {
    // Init    
    $scope.searchData = {};
    $scope.query = "";

    $scope.searchForLocation = function () {
        // Error checking: if numbers, make sure it is 5

        var callback = function (args) {
            console.log("Do stuff after trying to query address");

            $scope.searchData = {};
            $scope.search.$setUntouched();
            $scope.search.$setPristine();
        };

        console.log($scope);
        if ($scope.search.$valid) {
            var locale = new Locale();
            var searchStim = ($scope.searchData.query || "").trim();
            console.log(searchStim);
            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(searchStim)) {
                console.log('in zip');
                locale.zip = searchStim.trim();
            } else if (/^[A-Za-z]+$/.test(searchStim)) {
                console.log('in city');
                locale.city = searchStim.trim();
            } else {
                // $scope.searchData.query.$error.whatareyou = "xyz";
            }


            if (true) {
                locale.zip = $scope.query;
            }
        }

        // if (responseLocale) {                                        
            // Got a location - use it!
           // $scope.$emit(broadcastEvents.setLocation.updateNotification, { locale: responseLocale, callback: callback });

        /*
            

            Get the search stim
                - Maybe do check of zip versus city to get right query
                - Do the query (promise)
                    - in promise result:
                        - SUCCESS
                            - Store in cookie
                            - Broadcast new locale
                        - FAIL
                            - NOT SURE


            NEED TO PASS SOMETHING IN CALLBACK TO ADD LOCATION TO PREVIOUS LOCALE LIST IF ADDRESS IS LEGIT
        */
    };
}

LocationSearch.$inject = ['$scope', 'Locale', 'broadcastEvents'];

WeatherAppControllers.directive('ngEnter', function () {
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

WeatherAppControllers.directive('isValidSearchInput', function () {
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

WeatherAppControllers.directive('onSearchSubmit', ['$parse', function ($parse) {
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

