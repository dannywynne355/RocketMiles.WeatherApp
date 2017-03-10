/*
    Configuration settings for accessing openweathermap.org api
*/
angular.module('WeatherApp.config')
    .constant('openWeatherMapApiSettings', {
        config: {
            production: {
                urlRoot: 'http://api.xopenweathermap.org/data/2.5/',
                credentials: {
                    user: 'dannywynne@the355group.com',
                    token: '7310462f02c601a5787ebbb9b6039230'
                }
            }
        },
        endpoints: {
            currentWeather: {
                byZip: {
                    method: 'GET',
                    url: 'weather?APPID={0}&zip={1},{2}&units={3}',
                    withCredentials: false,
                    parameters: [
                        'token', 'zip', 'countryCode', 'units'
                    ],
                    data: {}
                }
            },
            forecast: {
                byCityName: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&q={1},{2}&units={3}',
                    withCredentials: false,
                    parameters:[
                        'token', 'city', 'countryCode', 'units'
                    ],
                    data: {}
                },
                byCityId: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&id={1}&units={2}',
                    withCredentials: false,
                    parameters: [
                        'token', 'cityId', 'units'
                    ],
                    data: {}
                },
                byGeolocation: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&lat={1}&lon={2}&units={3}',
                    withCredentials: false,
                    parameters: [
                        'token', 'longitude', 'latitude', 'units'
                    ],
                    data: {}
                },                
                byZip: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&zip={1},{2}&units={3}',
                    withCredentials: false,
                    parameters: [
                        'token', 'zip', 'countryCode', 'units'
                    ],
                    data: {}
                }
            }
        }
    });            