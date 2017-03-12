/*
    Handles mapping of openweathermap json response to app strucutre of WeatherState
*/
angular.module('WeatherApp.services')
    .factory('openWeatherMapJsonParser', ownJsonParser);

function ownJsonParser(wind, weatherUnits, WeatherState) {
    return {
        getOffset: function (json, offset) {
            // console.log('getOffset');
            // console.log(offset);
            var currentParentNode = json;
            angular.forEach(offset, function (v) {
                currentParentNode = currentParentNode[v];
            });
            // console.log(currentParentNode);
            // console.log('done with get offset');
            return currentParentNode;
            
        },
        parseResponse: function (json, args) {
            // args can be empty
            args = args || { offsets: {} };
            
            // Offsets determine the path into the json source where the data can be found.
            // This will determine the parent that contains the field(s) with data
            args.offsets = angular.extend(
                {},
                {
                        city: ['city'],
                        weather: ['weather', 0],
                        wind: ['wind'],
                        main: ['main'],
                        clouds: ['clouds'],
                        timestamp: [],
                        rain: ['rain'],
                        snow: ['snow']                    
                },
                args.offsets                
            );
            
            // Merge up the default structure with the current data
            var dst = {};
            angular.merge(
                dst,
                WeatherState.default, 
                {
                    city: this.parseLocale(this.getOffset(json, args.offsets.city)),
                    weather: this.parseWeatherProperty(this.getOffset(json, args.offsets.weather)),
                    wind: this.parseWindProperty(this.getOffset(json, args.offsets.wind)),
                    main: this.parseMainProperty(this.getOffset(json, args.offsets.main)),
                    clouds: this.parseCloudsProperty(this.getOffset(json, args.offsets.clouds)),
                    timestamp: this.parseTimestampProperty(this.getOffset(json, args.offsets.timestamp)),
                    rain: json.hasOwnProperty('rain') ? this.parseRainProperty(this.getOffset(json, args.offsets.rain)) : false,
                    snow: json.hasOwnProperty('snow') ? this.parseSnowProperty(this.getOffset(json, args.offsets.snow)) : false
                }                
            );
            
            return dst;
        },
        parseWeatherProperty: function (json) {            
            return json == undefined ? {} : {
                id: json.hasOwnProperty("id") ? json.id : false,
                main: json.hasOwnProperty("main") ? json.main : false,
                description: json.hasOwnProperty("description") ? json.description : false,
                icon: json.hasOwnProperty("icon") ? ["http://openweathermap.org/img/w/", json.icon, ".png"].join("") : false
            }
        },
        parseWindProperty: function (json) {
            return json == undefined ? {} : {
                speed: json.hasOwnProperty("speed") ? json.speed : false,
                deg: json.hasOwnProperty("deg") ? json.deg : false,
                direction: json.hasOwnProperty("deg") ? wind.getDirection(json.deg) : false,
                speedUnits: json.hasOwnProperty("speed") ? wind.getUnits() : false
            }
        },
        parseMainProperty: function (json) {            
            return json == undefined ? {} : {
                temperature: json.hasOwnProperty("temp") ? json.temp : false,
                temperatureUnits: json.hasOwnProperty("temp") ? weatherUnits.getAbbreviation() : false,
                pressure: json.hasOwnProperty("pressure") ? json.pressure : false,
                humidity: json.hasOwnProperty("humidity") ? json.humidity : false
            }
        },
        parseCloudsProperty: function (json) {
            return json == undefined ? false : json.hasOwnProperty("all") ? json.all : false;
        },
        parseRainProperty: function (json) {
            return json == undefined ? false : json.hasOwnProperty("3h") ? json["3h"] : false;
        },
        parseSnowProperty: function (json) {
            return json == undefined ? false : json.hasOwnProperty("3h") ? json["3h"] : false;
        },
        parseTimestampProperty: function (json) {            
            return json == undefined ? false : json.hasOwnProperty("dt") ? json.dt : false;
        },
        parseLocale: function (json) {
            return json == undefined ? {} : {
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

ownJsonParser.$inject = ['wind', 'weatherUnits', 'WeatherState'];