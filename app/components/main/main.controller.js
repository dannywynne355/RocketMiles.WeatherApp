angular.module('WeatherApp.controllers')
    .controller('MainCtrl', ['$scope', 'appCookieSvc', 'mainSvc' ,
    function ($scope, appCookieSvc, mainSvc) {            
            var getMostRecentEntry = function () {              

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
            $scope.lastLogEntry = {}; // Do this to give it an initial value in case something wonky happens with fetching data
            getMostRecentEntry();            
        }
    ]);