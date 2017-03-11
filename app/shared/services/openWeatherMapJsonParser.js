/*
    Handles mapping of openweathermap json response to app strucutre of WeatherState
*/
angular.module('WeatherApp.services')
    .factory('openWeatherMapJsonParser', ownJsonParser);

function ownJsonParser(windDirection, weatherUnits, WeatherState) {
    return {
        parseResponse: function (json, args) {            
            return angular.extend(
                WeatherState.default, 
                {
                    city: this.parseLocale(json),
                    weather: this.parseWeatherProperty(json.weather[0]),
                    wind: this.parseWindProperty(json.wind),
                    main: this.parseMainProperty(json.main),
                    clouds: this.parseCloudsProperty(json.clouds),
                    timestamp: this.parseTimestampProperty(json),
                    rain: json.hasOwnProperty('rain') ? this.parseRainProperty(json.rain) : false,
                    snow: json.hasOwnProperty('snow') ? this.parseSnowProperty(json.snow) : false
                }
            );                        
        },
        parseWeatherProperty: function (json) {
            return {
                id: json.hasOwnProperty("id") ? json.id : false,
                main: json.hasOwnProperty("main") ? json.main : false,
                description: json.hasOwnProperty("description") ? json.description : false,
                icon: json.hasOwnProperty("icon") ? json.icon : false
            }
        },
        parseWindProperty: function (json) {
            return {
                speed: json.hasOwnProperty("speed") ? json.speed : false,
                deg: json.hasOwnProperty("deg") ? json.deg : false,
                direction: json.hasOwnProperty("deg") ? windDirection.get(json.deg) : false
            }
        },
        parseMainProperty: function (json) {            
            return {
                temperature: json.hasOwnProperty("temp") ? json.temp : false,
                temperatureUnits: json.hasOwnProperty("temp") ? weatherUnits.getAbbreviation() : false,
                pressure: json.hasOwnProperty("pressure") ? json.pressure : false,
                humidity: json.hasOwnProperty("humidity") ? json.humidity : false
            }
        },
        parseCloudsProperty: function (json) {
            return json.hasOwnProperty("all") ? json.all : false;
        },
        parseRainProperty: function (json) {
            return json.hasOwnProperty("3h") ? json["3h"] : false;
        },
        parseSnowProperty: function (json) {
            return json.hasOwnProperty("3h") ? json["3h"] : false;
        },
        parseTimestampProperty: function (json) {            
            return json.hasOwnProperty("dt") ? json.dt : false;
        },
        parseLocale: function (json) {
            return {
                id: json.hasOwnProperty("id") ? json.id : false,
                name: json.hasOwnProperty("name") ? json.name : false,
                country: json.hasOwnProperty("country") ? json.country : false,
                coord: {
                    latitude: json.hasOwnProperty("coord") && json.coord.hasOwnProperty("lat") ? json.coord.lat : false,
                    longitude: json.hasOwnProperty("coord") && json.coord.hasOwnProperty("lon") ? json.coord.lon : false
                }
            }
        }
    };
}

ownJsonParser.$inject = ['windDirection', 'weatherUnits', 'WeatherState'];