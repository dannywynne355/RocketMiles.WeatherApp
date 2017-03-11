var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('AdminCtrl', AdminController);

function AdminController($scope, broadcastEvents, appCookie) {

    $scope.refresh = function () {
        // Request that the data if refreshed
        $scope.$emit(broadcastEvents.setLocation.refreshNotification);
    };
}

AdminController.$inject = ['$scope', 'broadcastEvents', 'appCookie'];