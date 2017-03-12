var WeatherAppControllers = angular.module('WeatherApp.controllers');

WeatherAppControllers.controller('MainController', WeatherAppMain);

function WeatherAppMain($scope, $uibModal, Locale, localeType, defaultLocale, appCookie, broadcastEvents, weatherData) {
    // Using this to toggle display of error conditions on load up.  Want to hide error screens when no data is available
    $scope.initialized = false;

    // Denotes whether a truly fatal error occured
    $scope.onLoadWeatherError = false;

    $scope.$on(broadcastEvents.setLocation.useDefaultLocaleNotification, function (event, args) {
        // console.log('Use default notification');

        // Use the default location            
        var getLocale = function () {
            var locale = new Locale(defaultLocale);
            locale.localeType = localeType.default;
            return locale;
        };
        $scope.selectedLocale = getLocale();                

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });

    $scope.$on(broadcastEvents.setLocation.updateNotification, function (event, args) {
        // console.log('update locale notification');        

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
        //console.log('Refresh data notification');

        // $scope.selectedLocale = args.locale;
        getSelectedLocaleWeatherReport();

        // If a callback exists, fire it.  From intro screen, this will close current location modal.
        if (args && args.callback) {
            args.callback();
        }
    });
    
    // Gets the weather report (current, forecast) for the variable $scope.selectedLocale 
    // NOTE: stored as function so that I can call it elsewhere to do refreshes
    var getSelectedLocaleWeatherReport = function () {        
        if ($scope.selectedLocale) {            
            $scope.onLoadWeatherError = false; // reset            
            $scope.$broadcast('$selectedLocaleStart', $scope.selectedLocale);

            var noWeatherFound = function () {
                // Indicate that we had an issue
                $scope.onLoadWeatherError = true;
                // Clear any previous data
                $scope.weatherData = false;
                // Turns off spinner
                $scope.$broadcast('$selectedLocaleSuccess', $scope.selectedLocale);
            };

            // Go get the weather data!
            weatherData
                .getWeather($scope.selectedLocale)
                .then(
                    function (data) {
                        // console.log('weather report returned');
                        // console.log(data);
                        if (data) {
                            $scope.weatherData = data;                            
                            return data.Locale;
                        } else {                            
                            noWeatherFound();
                        }
                    }, function (data) {
                        // Error case 
                        noWeatherFound();
                        return false;
                    }
                )
                .then(
                    function (locale) {
                        if (locale) {                            
                            locale.save();
                            return locale;
                        } else {
                            return false;
                        }
                    }
                )
                .then(function (locale) {
                    if (locale) {
                        $scope.$broadcast(broadcastEvents.localeList.refreshNotification, { locale: locale });
                    }

                    $scope.initialized = true;
                    
                    // Turns off spinner
                    $scope.$broadcast('$selectedLocaleSuccess', $scope.selectedLocale);
                })
            ;
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
WeatherAppMain.$inject = ['$scope', '$uibModal', 'Locale', 'localeType', 'defaultLocale', 'appCookie', 'broadcastEvents', 'weatherData'];
