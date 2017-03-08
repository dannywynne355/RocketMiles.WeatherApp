angular.module('WeatherApp.controllers')
    .controller('MainCtrl', ['$scope', 'appCookieSvc', 'mainSvc',
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
            // console.log(new google.maps.LatLng(42.1038846, -72.5868353).toUrlValue());
            
            $scope.lastLogEntry = {}; // Do this to give it an initial value in case something wonky happens with fetching data
            getMostRecentEntry();

            
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
    ]);