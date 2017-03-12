var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('FooterCtrl', FooterController);

function FooterController($scope, weatherUnits, broadcastEvents, geolocationFinder, appCookie) {

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

    $scope.$on(broadcastEvents.localeList.refreshNotification, function (event, args) {
        // console.log('Refresh location list');

        getPreviousLocales();

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });
    

    /* Put the current geolocation  in the dropdown */
    var getGeoCurrentLocale = function () {
        geolocationFinder.then(
            function (response) {
                var locale = response;
                locale.localeType = 'geolocation';
                $scope.currentGeoLocale = locale;
            },
            function (response) {

            }
        );
    };
    getGeoCurrentLocale();

    /* Read previous locations from cookies */
    var getPreviousLocales = function () {
        var localeItems = [];

        appCookie.load();
        if (appCookie.locations != undefined) {
            angular.forEach(appCookie.locations, function (locale, key) {
                this.push(locale);
            }, localeItems);

            $scope.previousLocales = localeItems;
        }
    };

    // Init
    $scope.previousLocales = [];
}

FooterController.$inject = ['$scope', 'weatherUnits', 'broadcastEvents', 'geolocationFinder', 'appCookie'];