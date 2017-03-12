var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('SearchCtrl', LocationSearch);

function LocationSearch($scope, Locale, localeType, broadcastEvents) {
    // Init    
    $scope.searchData = {};    

    /* Actions to take upon submitting form */
    $scope.searchForLocation = function (form) {
                
        var callback = function (args) {            
            // Clear the search form
            $scope.searchData = {};
            form.$setUntouched();
            form.$setPristine();
        };
        
        if (form.$valid) {
            var locale = new Locale();
            locale.localeType = localeType.userAdded;            
            // Get search val - if numeric assume it is a zip, otherwise a city name
            // Directives handle most of error checking, but adding some here as well
            var searchStim = ($scope.searchData.query || "").trim();
            
            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(searchStim)) {
                locale.zip = searchStim.trim();
                //} else if (/^[A-Za-z]+$/.test(searchStim)) {                
            } else if (/^([^0-9]*)$/.test(searchStim)) {
                locale.city = searchStim.trim();
            }

            $scope.$emit(broadcastEvents.setLocation.updateNotification, { locale: locale, callback: callback });
        }        
    };
}

LocationSearch.$inject = ['$scope', 'Locale', 'localeType', 'broadcastEvents'];