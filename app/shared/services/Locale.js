/*
    Locale - data structure for a place/location/zip code
*/
angular.module('WeatherApp.services')
    .factory('Locale', localeService);

function localeService(localeType, appCookie) {
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

    Locale.prototype.save = function () {        
        if (this.localeType == localeType.userAdded) {
            appCookie.load();            
            if (this.cityId) {
                console.log('check cityid');
                // awesome - we have a city id and we can just match on that                
                for (i=0; i < appCookie.locations.length; i++) {
                    if (appCookie.locations[i].cityId == this.cityId) {
                        // it exists
                        return ;
                    }
                }
            } else {
                console.log('check city and zip');
                // going to assume that checking city name & zip is sufficient
                for (i = 0; i < appCookie.locations.length; i++) {
                    if (appCookie.locations[i].city == this.city
                        && appCookie.locations[i].zip == this.zip) {
                        // it exists
                        return;
                    }
                }
            }

            // If we're here, then neither location checker found the city.  Add it
            // to the front of the array so that we known the first one is always
            // the most recently viewed.
            console.log('Locale saving locale');            
            appCookie.locations.unshift(angular.copy(this));
            appCookie.save();
        }        
    }

    return Locale;
}

localeService.$inject = ['localeType', 'appCookie'];