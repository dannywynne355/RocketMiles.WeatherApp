var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('MainController', WeatherAppMain);

function WeatherAppMain($scope, $uibModal, Locale, defaultLocale, appCookie, geolocationFinder, broadcastEvents, mainSvc, weatherUnits, WeatherState) {
    $scope.$on(broadcastEvents.setLocation.useDefaultLocaleNotification, function (event, args) {
        console.log('Use default');

        // Use the default location            
        var getLocale = function () {
            var locale = new Locale(defaultLocale);
            locale.isDefault = true;
            return locale;
        };
        $scope.selectedLocale = getLocale();        

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });

    $scope.$on(broadcastEvents.setLocation.updateNotification, function (event, args) {
        console.log('update locale');

        // Check for unexpected case where no locale was provided            
        if (!args.locale) {
            $scope.$broadcast(broadcastEvents.setLocation.useDefaultLocaleNotification, { callback: args.callback });
        }

        $scope.selectedLocale = args.locale;
        
        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });

    $scope.$on(broadcastEvents.setLocation.refreshNotification, function (event, args) {
        console.log('Refresh data');

        // $scope.selectedLocale = args.locale;

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });

    

    $scope.$watch('selectedLocale', function () {
        console.log('hey, myVar has changed!');

        var weatherData = new LocaleWeather();        
        weatherData.Locale = new Locale(defaultLocale);
        weatherData.CurrentWeather = new WeatherState();
        weatherData.CurrentWeather.main.temperatureUnits = weatherUnits.getAbbreviation();
        weatherData.CurrentWeather.timestamp = 1435658272;
        $scope.weatherData = weatherData;
    });

    /*
    var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/app/components/modals/current-location/current-location.view.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope
    });
    */

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

    var getPreviousLocale = function () {
        var localeItems = [];

        appCookie.load();
        if (appCookie.locations != undefined) {
            angular.forEach(appCookie.locations, function (locale, key) {
                this.push(locale);
            }, localeItems);
        }
    };

    getPreviousLocale();


}
WeatherAppMain.$inject = ['$scope', '$uibModal', 'Locale', 'defaultLocale', 'appCookie', 'geolocationFinder', 'broadcastEvents', 'mainSvc', 'weatherUnits', 'WeatherState'];
