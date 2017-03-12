/*
    Holds the current units to use for displaying temperature
*/
angular.module('WeatherApp.services')
    .factory("weatherUnits", weatherUnits);

weatherUnits.$inject = ['appCookie'];

function weatherUnits(appCookie) {
    var units = 'imperial';
    // Check cookie to see if a value is there
    appCookie.load();
    if (appCookie != undefined
        && appCookie.units) {
        units = appCookie.units;
    }
    
    this.get = function () {
        return units;
    };

    this.set = function (u) {
        units = u;

        // Update cookie        
        appCookie.load();
        if (appCookie == undefined) {
            appCookie.create(u, []);
        } else {
            appCookie.units = u;
        }
        console.log('weather units saving locale');
        appCookie.save();        
    };

    this.getAbbreviation = function () {
        switch (this.get().toLowerCase()) {
            case "imperial":
                return "F";
                break;
            case "metric":
                return "C";
                break;
            default:
                return "K";
                break;        
        }
    };

    return this;    
}