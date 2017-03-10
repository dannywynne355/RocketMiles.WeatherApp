var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('FooterCtrl', FooterController);

function FooterController($scope, weatherUnits, broadcastEvents) {

    /* Handles changes in temperature units */
    $scope.setUnits = function (unit) {
        // Update our object with the units
        weatherUnits.set(unit);

        // Request that the data if refreshed
        $scope.$emit(broadcastEvents.setLocation.refreshNotification);

    };

    /* Handles selecting an existing location */
    $scope.setKnownLocale = function (locale) {
        $scope.$emit(broadcastEvents.setLocation.updateNotification, { locale: locale });
    };
}

FooterController.$inject = ['$scope', 'weatherUnits', 'broadcastEvents'];