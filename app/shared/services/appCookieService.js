/*
    Wrapper for storing app data in a cookie
*/
angular.module('WeatherApp.services')
    .service('appCookieSvc', function ($cookieStore, appCookie) {
        this.create = function (sessionId, user, locations) {
            this.id = sessionId;
            this.user = user;
            this.locations = locations;
        };

        this.save = function () {
            $cookieStore.put(
                appCookie.name,
                JSON.stringify(
                    {
                        user: this.user,
                        locations: this.locations
                    }
                )
            );
        };

        this.destroy = function () {
            this.id = null;
            this.user = null;
            this.locations = null;
            $cookieStore.remove(appCookie.name);
        };

        this.makeSessionId = function (user) {
            return user.id;
        };

        this.load = function () {
            if (!this.id) {
                var cookieSession = $cookieStore.get(appCookie.name);
                if (cookieSession) {
                    var cookieData = JSON.parse(cookieSession);
                    // NOTE: this blows away data
                    var sessionId = this.makeSessionId(cookieData.user);
                    this.create(sessionId, cookieData.user, cookieData.locations);
                    
                    // Need to save the cookie state for browser reloads
                    this.save();
                }
            }
        }

        return this;
    });