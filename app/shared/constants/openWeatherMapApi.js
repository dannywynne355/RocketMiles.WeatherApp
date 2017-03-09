angular.module('WeatherApp.config')
    .constant('openWeatherMapApi', {
        config: {
            production: {
                urlRoot: 'http://api.openweathermap.org/data/2.5/',
                credentials: {
                    user: 'dannywynne@the355group.com',
                    token: '7310462f02c601a5787ebbb9b6039230'
                }
            }
        },
        endpoints: {
            forecast: {
                byCityName: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&q={1},{2}',
                    withCredentials: false,
                    data: {}
                },
                byCityId: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&id={1}',
                    withCredentials: false,
                    data: {}
                },
                byGeolocation: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&lat={1}&lon={2}',
                    withCredentials: false,
                    data: {}
                },
                byGeolocation: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&lat={1}&lon={2}',
                    withCredentials: false,
                    data: {}
                },
                byXip: {
                    method: 'GET',
                    url: 'forecast?APPID={0}&zip={1},{2}',
                    withCredentials: false,
                    data: {}
                }
            }
        }
    });            