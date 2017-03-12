var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('AdminCtrl', AdminController);

function AdminController($scope, broadcastEvents, appCookie, $cookieStore, appCookieSettings) {

    appCookie.load();
    
    // Add toggle state to show/hide this view
    $scope.adminToggleState = false;
    $scope.toggleAdmin = function () {        
        $scope.adminToggleState= !$scope.adminToggleState;        
    };

    $scope.cookieData = {
        weatherUnits: appCookie ? appCookie.units : "undefined",
        locations: appCookie ? appCookie.locations : []
    };

    $scope.refresh = function () {
        // Request that the data if refreshed
        $scope.$emit(broadcastEvents.setLocation.refreshNotification);
    };

    $scope.clearCookie = function () {        
        appCookie.destroy();
    };

    $scope.$watch(function () { return $cookieStore.get(appCookieSettings.name); }, function (newValue) {        
        appCookie.load();

        $scope.cookieData = {
            weatherUnits: appCookie ? appCookie.units : "undefined",
            locations: appCookie ? appCookie.locations : []
        };
    });
}

AdminController.$inject = ['$scope', 'broadcastEvents', 'appCookie', '$cookieStore', 'appCookieSettings' ];