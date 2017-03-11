/*
    Locale - data structure for a place/location/zip code
*/
angular.module('WeatherApp.services')
    .factory('Locale', localeService);

localeService.$inject = ['localeType'];

function localeService(localeType) {
    function Locale(localeData) {
        if (localeData) {
            this.setData(localeData);
        }
        
    };
    Locale.prototype = {
        localeType: localeType.userAdded, // default, geolocation, userAdded            
        city: '',
        cityId: '',
        country: '',
        countryCode: '',
        latitude: '',
        longitude: '',
        state: '',
        stateName: '',
        zip: '',
        setData: function (localeData) {
            angular.extend(this, localeData);
        }
    };
    return Locale;
}