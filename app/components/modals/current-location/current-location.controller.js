/*
    Controller for Current Location modal.  Shown when user comes to site for first time and there
    is no knowledge of a site.  Allow them to use either their current geocoordinates or the default
    locale in the system.
*/

angular.module('WeatherApp.controllers')
    .controller('CurrentLocationCtrl', CurrentLocationController);

function CurrentLocationController($scope, $uibModalInstance, geolocationFinder, broadcastEvents) {       
    $scope.ok = function () {        
        geolocationFinder.then(
            function (responseLocale) {
                var callback = function () {
                    // Close the modal
                    $scope.$close('ok');
                    $scope.initialized = true;
                };

                if (responseLocale) {                                        
                    // Got a location - use it!
                    $scope.$emit(broadcastEvents.setLocation.updateNotification, { locale: responseLocale, callback: callback });
                } else {
                    /* Trapped Error */                    
                    // Could not get current location, so just use the default location
                    $scope.$emit(broadcastEvents.setLocation.useDefaultLocaleNotification, { callback: callback });
                }
            },
            function (response) {
                /* Error Case */                                
                // Could not get current location, so just use the default location
                $scope.$emit(broadcastEvents.setLocation.useDefaultLocaleNotification, { callback: callback });
            }
        );
        
    };

    $scope.cancel = function () {
        var callback = function () {
            // Close the modal
            $scope.$dismiss('cancel');
            $scope.initialized = true;
        };

        // Throw notification upstream to make an update
        $scope.$emit(broadcastEvents.setLocation.useDefaultLocaleNotification, { callback: callback });
        
    };
};

CurrentLocationController.$inject = ['$scope', '$uibModalInstance', 'geolocationFinder', 'broadcastEvents'];