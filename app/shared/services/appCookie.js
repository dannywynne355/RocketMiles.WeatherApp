/*
    Wrapper for storing app data in a cookie

    Cookies for app:
    - the units to use to display the weather
    - previous locales searched
*/

/* Putting config settings here for ease of access */
angular.module('WeatherApp.config')
    .constant('appCookieSettings', {
        name: 'WeatherApp'
    });

angular.module('WeatherApp.services')
    .service('appCookie', appCookie);

appCookie.$inject = ['$cookieStore', 'appCookieSettings'];

function appCookie ($cookieStore, appCookieSettings) {
    this.create = function (units, locations) {            
        this.units = units;
        this.locations = locations;
    };

    this.save = function () {
        $cookieStore.put(
            appCookieSettings.name,
            JSON.stringify(
                {                        
                    units: this.units,
                    locations: this.locations
                }
            )
        );
    };

    this.destroy = function () {            
        this.units = null;
        this.locations = null;
        $cookieStore.remove(appCookieSettings.name);
    };        

    this.load = function () {            
        var cookieSession = $cookieStore.get(appCookieSettings.name);
        if (cookieSession) {
            var cookieData = JSON.parse(cookieSession);
            this.units = cookieData.units;
            this.locations = cookieData.locations;                
                    
            // Need to save the cookie state for browser reloads
            this.save();
        }
    }

    return this;
};