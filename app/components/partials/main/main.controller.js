var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('MainController', WeatherAppMain);

function WeatherAppMain($scope, $uibModal, Locale, defaultLocale, appCookie, broadcastEvents, weatherUnits, WeatherState) {
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
        // Get first one - locations being appended to front, so this will be last stored one
        $scope.$broadcast(broadcastEvents.setLocation.updateNotification, { locale: appCookie.locations[0] });
    }
}
WeatherAppMain.$inject = ['$scope', '$uibModal', 'Locale', 'defaultLocale', 'appCookie', 'broadcastEvents', 'weatherUnits', 'WeatherState'];
