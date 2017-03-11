var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('SearchCtrl', LocationSearch);

function LocationSearch($scope) {
    
    $scope.search = function () {
        alert('sssdfsd');
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


            NEED TO PASS SOMETHING IN CALLBACK TO ADD LOCATION TO PREVIOUS LOCALE LIST IF ADDRESS IS LEGIT
        */
    };
}

LocationSearch.$inject = ['$scope'];