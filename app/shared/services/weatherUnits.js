/*
    Holds the current units to use for displaying temperature
*/
angular.module('WeatherApp.services')
    .factory("weatherUnits", weatherUnits);

weatherUnits.$inject = ['appCookie'];

function weatherUnits(appCookie) {
    var units = 'imperial';
    // Check cookie to see if a value is there
    var cookie = appCookie.load();
    if (cookie != undefined
        && cookie.units) {
        units = cookie.units;
    }
    
    this.get = function () {
        return units;
    };

    this.set = function (u) {
        units = u;

        // Update cookie
        var cookie = appCookie.load();
        if (cookie == undefined) {
            appCookie.create(u, []);
        }
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