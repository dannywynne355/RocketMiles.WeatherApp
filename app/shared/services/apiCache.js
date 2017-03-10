/* 
    Cache object used to store api responses

    NOTE: Cache will be lost on page reload/browser refresh
*/

angular.module('WeatherApp.config')
    .constant('apiCacheSettings', {
        enabled: true,
        name: 'WeatherApp'
    });

angular.module('WeatherApp.services')
    .factory('apiCache', apiCache);

apiCache.$inject = ['$cacheFactory', 'apiCacheSettings'];
        
function apiCache($cacheFactory, apiCacheSettings) {
    return {
        enabled: apiCacheSettings.enabled,
        cache: $cacheFactory(apiCacheSettings.name)
    };
}