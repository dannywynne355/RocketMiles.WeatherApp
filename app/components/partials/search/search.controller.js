var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('SearchCtrl', LocationSearch);

function LocationSearch($scope) {
    $scope.search = function () {
        /*
            Error checking: if numbers, make sure it is 5

            Get the search stim
                - Maybe do check of zip versus city to get right query
                - Do the query (promise)
                    - in promise result:
                        - SUCCESS
                            - Store in cookie
                            - Broadcast new locale
                        - FAIL
                            - NOT SURE

        */
    };
}

LocationSearch.$inject = ['$scope'];