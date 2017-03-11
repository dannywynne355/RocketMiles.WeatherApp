var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('MainController', WeatherAppMain);

function WeatherAppMain($scope, $uibModal, Locale, defaultLocale, appCookie, broadcastEvents, weatherData, weatherUnits, WeatherState) {
    // Using this to toggle display of error conditions on load up.  Want to hide error screens when no data is available
    $scope.initialized = false;        

    $scope.$on(broadcastEvents.setLocation.useDefaultLocaleNotification, function (event, args) {
        console.log('Use default');

        // Use the default location            
        var getLocale = function () {
            var locale = new Locale(defaultLocale);
            locale.isDefault = true;
            return locale;
        };
        $scope.selectedLocale = getLocale();        

        $scope.initialized = true;

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
        
        $scope.initialized = true;

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });

    $scope.$on(broadcastEvents.setLocation.refreshNotification, function (event, args) {
        console.log('Refresh data');

        // $scope.selectedLocale = args.locale;
        getSelectedLocaleWeatherReport();

        $scope.initialized = true;

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });

    // Gets the weather report (current, forecast) for the variable $scope.selectedLocale 
    // NOTE: stored as function so that I can call it elsewhere to do refreshes
    var getSelectedLocaleWeatherReport = function () {        
        if ($scope.selectedLocale) {
            console.log('update to locale');
            console.log($scope.selectedLocale);
            weatherData
                .getWeather($scope.selectedLocale)
                .then(
                    function (data) {
                        console.log('here');
                        console.log(data);
                        $scope.weatherData = data;
                    }
                );            

            var wd2 = new LocaleWeather();
            wd2.Locale = new Locale(defaultLocale);
            wd2.CurrentWeather = new WeatherState();
            wd2.CurrentWeather.main.temperatureUnits = weatherUnits.getAbbreviation();
            wd2.CurrentWeather.timestamp = 1435658272;
            // $scope.weatherData = wd2;
        }
    }

    /* On changes to the selectedLocale variable, run the code to pull in its weather */
    $scope.$watch('selectedLocale', function () {
        getSelectedLocaleWeatherReport();
    });        
    
    /* Check cookie for previous locations */
    appCookie.load();
    if (appCookie.locations == undefined
        || appCookie.locations.length == 0) {
        // Launch popup for current location
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/app/components/modals/current-location/current-location.view.html',
            controller: 'CurrentLocationCtrl',
            scope: $scope
        });
    } else {
        var cb = function () {
            $scope.initialized = true;
        };

        // Get first one - locations being appended to front, so this will be last stored one
        $scope.$broadcast(broadcastEvents.setLocation.updateNotification, { locale: appCookie.locations[0], callback: cb });
    }
}
WeatherAppMain.$inject = ['$scope', '$uibModal', 'Locale', 'defaultLocale', 'appCookie', 'broadcastEvents', 'weatherData', 'weatherUnits', 'WeatherState'];
