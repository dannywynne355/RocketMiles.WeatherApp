/*
    Locale - data structure for a place/location/zip code
*/
angular.module('WeatherApp.services')
    .factory('Locale', [function () {
        function Locale(localeData) {
            if (localeData) {
                this.setData(localeData);
            }
        
        };
        Locale.prototype = {
            localeType: 'userAdded', // default, geolocation, userAdded            
            city: '',
            country: '',
            countryCode: '',
            latitude: '',
            longitude: '',
            region: '',
            regionName: '',
            zip: '',
            setData: function (localeData) {
                angular.extend(this, localeData);
            }
        };
        return Locale;
    }]);