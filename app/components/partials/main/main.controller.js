var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('MainController', WeatherAppMain);

function WeatherAppMain($scope, $uibModal, Locale, defaultLocale, appCookieSvc, geolocationFinder, broadcastEvents, mainSvc) {
    $scope.$on(broadcastEvents.currentLocation.useDefaultLocaleNotification, function (event, args) {
        // Use the default location            
        var getLocale = function () {
            var locale = new Locale(defaultLocale);
            locale.isDefault = true;
            return locale;
        };
        $scope.selectedLocale = getLocale();
        console.log($scope.selectedLocale);

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args.callback) {
            args.callback();
        }
    });

    $scope.$on(broadcastEvents.currentLocation.useCurrentGeolocationNotification, function (event, args) {        
        // Check for unexpected case where no locale was provided            
        if (!args.locale) {
            $scope.$broadcast(broadcastEvents.currentLocation.useDefaultLocaleNotification, { callback: args.callback });
        }

        $scope.selectedLocale = args.locale;
        
        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args.callback) {
            args.callback();
        }
    });
    
    var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/app/components/modals/current-location/current-location.view.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope
    });
    

    var getMostRecentEntry = function () {
        mainSvc.getNewApi().then(
            function (response) {
                console.log(response);
            },
            function (response) {
                console.log(response);
            }
            )
        ;
        mainSvc.getForecast()
            .then(
            function (response) {
                if (!response.error) {
                    $scope.lastLogEntry = response.data;
                } else {
                    $scope.lastLogEntry = 'Error: ' + response.error.message;
                }
            },
            function (response) {
                // Untrapped error case                        
            }
        );
    };
    // console.log(new google.maps.LatLng(42.1038846, -72.5868353).toUrlValue());

    $scope.lastLogEntry = {}; // Do this to give it an initial value in case something wonky happens with fetching data
    // getMostRecentEntry();

    var getCurrentLocale = function () {
        geolocationFinder.then(
            function (response) {
                var locale = response;
                locale.localeType = 'geolocation';
                $scope.currentLocale = locale;
            },
            function (response) {

            }
        );
    };

    getCurrentLocale();

    var getPreviousLocale = function () {
        var localeItems = [];

        appCookieSvc.load();
        if (appCookieSvc.locations != undefined) {
            angular.foreach(appCookieSvc.locations, function (locale) {
                localeItems.push(locale);
            });
        }
    };

    getPreviousLocale();

    /*
zipCodeLookupSvc.getExtent()
            .then(
            function (response) {
                if (!response.error) {                            
                    console.log(response.data.results.length);
                    if (response.data.results.length > 0) {
                        var match = response.data.results[0];
                        var extent = {
                            sw: match.geometry.bounds.southwest,
                            ne: match.geometry.bounds.northeast                                    
                        }
                        var extentArg = new google.maps.LatLngBounds(
                            new google.maps.LatLng(extent.sw.lat, extent.sw.lng),
                            new google.maps.LatLng(extent.ne.lat, extent.ne.lng)
                            ).toUrlValue();
                        console.log(extentArg);
                    } else {
                        // No results found for zip
                    }                            
                    $scope.lastLogEntry = response.data;
                } else {
                    $scope.lastLogEntry = 'Error: ' + response.error.message;
                }
            },
            function (response) {
                // Untrapped error case                        
            }
        );
    */

}
WeatherAppMain.$inject = ['$scope', '$uibModal', 'Locale', 'defaultLocale', 'appCookieSvc', 'geolocationFinder', 'broadcastEvents', 'mainSvc'];
