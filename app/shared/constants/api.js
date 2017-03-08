angular.module('WeatherApp.config')
    .constant('apiSettings', {
        config:{
            production: {
                urlRoot: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/',
                credentials: {
                    user: 'dannywynne@the355group.com',
                    token: 'iodYvwBfNbUFuoIWQYVeQwDxwAVeaYao'
                }
            }
        },
        endpoints: {
            forecast: {
                read: {
                    method: 'GET',
                    url: 'datasets',
                    withCredentials: false,
                    data: {}
                }
            }
        }
    });