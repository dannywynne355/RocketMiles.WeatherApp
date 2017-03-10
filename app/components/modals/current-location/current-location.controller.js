﻿/// <reference path="current-location.controller.js" />
angular.module('WeatherApp.controllers')
    .controller('ModalInstanceCtrl', ['$rootScope', '$scope', '$uibModalInstance', 'geolocationFinder', 'broadcastEvents', function ($rootScope, $scope, $uibModalInstance, geolocationFinder, broadcastEvents) {
    // var $ctrl = this;
    /*
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };
    */
    /*
    $ctrl.ok = function () {
        console.log($modalInstance);
        // $modalInstance.close($ctrl.selected.item);
        $modalInstance.dismiss('ok');
    };

    $ctrl.cancel = function () {
        console.log('cancel');
        $modalInstance.dismiss('cancel');
        //$ctrl.dismiss({ $value: 'cancel' });
    };

    
    */
    
    $scope.ok = function () {
        // console.log(prefix + '$close returned ' + $scope.$close('ok'));
        geolocationFinder.then(
            function (responseLocale) {
                if (responseLocale) {
                    console.log(responseLocale);
                    // Call back to close modal
                    var callback = function () {
                        // Close the modal
                        $scope.$close('ok')
                    };                    

                    // Could not get current location, so just use the default location
                    $rootScope.$broadcast(broadcastEvents.setLocation.updateNotification, { locale: responseLocale, callback: callback });
                } else {
                    /* Trapped Error */

                    // Call back to close modal
                    var callback = function () {
                        // Close the modal
                        $scope.$close('ok')
                    };

                    // Could not get current location, so just use the default location
                    $rootScope.$broadcast(broadcastEvents.setLocation.useDefaultLocaleNotification, { callback: callback });
                }
            },
            function (response) {
                /* Error Case */
                
                // Call back to close modal
                var callback = function () {
                    // Close the modal
                    $scope.$close('ok')
                };

                // Could not get current location, so just use the default location
                $rootScope.$broadcast(broadcastEvents.currentLocation.useDefaultLocaleNotification, { callback: callback });
            }
        );
        
    };

    $scope.cancel = function () {
        var callback = function () {
            // Close the modal
            $scope.$dismiss('cancel')
        };

        // Throw notification upstream to make an update
        $rootScope.$broadcast(broadcastEvents.currentLocation.useDefaultLocaleNotification, { callback: callback });
        
    };
}]);