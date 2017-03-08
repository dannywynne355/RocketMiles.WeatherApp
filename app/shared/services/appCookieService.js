angular.module('WeatherApp.services')
    .service('appCookieSvc', function ($cookieStore, appCookie) {
        this.create = function (sessionId, user) {
            this.id = sessionId;
            this.user = user;
            //  TODO: Add previous cities
                        
        };

        this.save = function () {
            $cookieStore.put(
                appCookie.name,
                JSON.stringify(
                    {
                        user: this.user
                    }
                )
            );
        };

        this.destroy = function () {
            this.id = null;
            this.user = null;
            
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
                    this.create(sessionId, cookieData.user);
                    
                    // Need to save the cookie state for browser reloads
                    this.save();
                }
            }
        }

        return this;
    });