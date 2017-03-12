var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('SearchCtrl', LocationSearch);

function LocationSearch($scope, Locale, broadcastEvents) {
    // Init    
    $scope.searchData = {};    

    $scope.searchForLocation = function (form) {
        // Error checking: if numbers, make sure it is 5
        
        var callback = function (args) {
            console.log("Do stuff after trying to query address");

            // Clear the search form
            $scope.searchData = {};
            form.$setUntouched();
            form.$setPristine();
        };
        
        if (form.$valid) {
            var locale = new Locale();
            var searchStim = ($scope.searchData.query || "").trim();

            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(searchStim)) {
                locale.zip = searchStim.trim();
            } else if (/^[A-Za-z]+$/.test(searchStim)) {                
                locale.city = searchStim.trim();
            }

            $scope.$emit(broadcastEvents.setLocation.updateNotification, { locale: locale, callback: callback });
        }
        

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