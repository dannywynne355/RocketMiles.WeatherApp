/*
    Generic service to handle communicatie with the NOAA Api
*/

angular.module('WeatherApp.services')
    .factory('apiBase', ApiBase);

function ApiBase($q, $http, apiCache, appEnvironment) {    
    var svc = function () {};

    /* Fetch api resource configuration and endpoints */
    svc.prototype.resource = function () {
        return {};
    }

    /* Get config settings for environment */
    svc.prototype.environment = appEnvironment.get();

    /* Api-specific adjustments for config args */
    svc.prototype.prepareConfig = function (config) {
        return config;
    }

    /* Returns a promise for an api request */
    svc.prototype.makeRequest = function (config) {
        var deferred = $q.defer();

        return $q.when(JSON.parse('{"data": {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":23.88,"pressure":1033,"humidity":35,"temp_min":21.2,"temp_max":26.6},"visibility":16093,"wind":{"speed":9.17,"deg":20},"clouds":{"all":1},"dt":1489250100,"sys":{"type":1,"id":1007,"message":0.3872,"country":"US","sunrise":1489234050,"sunset":1489276424},"id":4887398,"name":"Chicago","cod":200}}'));
        // return $q.when(JSON.stringify('{data: {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":23.88,"pressure":1033,"humidity":35,"temp_min":21.2,"temp_max":26.6},"visibility":16093,"wind":{"speed":9.17,"deg":20},"clouds":{"all":1},"dt":1489250100,"sys":{"type":1,"id":1007,"message":0.3872,"country":"US","sunrise":1489234050,"sunset":1489276424},"id":4887398,"name":"Chicago","cod":200}}'));

        console.log('hoper you are not here');
        // Run this first so that config properties are all fully set
        config = this.prepareConfig(config);
                
        if (apiCache.enabled) {
            // Return the data if we already have it
            var cacheId = config.url;            
            var cachedData = apiCache.cache.get(cacheId);
            if (cachedData) {
                console.log('retrieving cached value');                
                return $q.when(cachedData);
            }
        }
        console.log(config.url);
        // Execute request and store it
        $http(config).then(
            function (response) {
                // Cache it only if there's a value
                if (response.data != null
                    && response.data) {                    
                    apiCache.cache.put(cacheId, response);
                }
                deferred.resolve(response);                
            },
            function (response) {
                if (response.data != null
                    && response.data) {                    
                    deferred.resolve(svc.prototype.promiseErrorHandler(response));
                } else {                    
                    deferred.resolve(svc.prototype.trappedErrorHandler(response));
                }                                
            }
        );

        return deferred.promise;
    }

    /*
    Formats the response of a promise
     */
    function issueResponse(data, error, status, statusText) {
        status = Math.max(status, 0);

        return {
            error: error,
            data: data,
            status: status,
            statusText: statusText
        };
    }

    /*
    Format response object when successful request.  Properties include:
     - error
     - data
     - status
     - statusText
     */
    svc.prototype.promiseSuccessHandler = function (response) {
        return issueResponse(
            response.data,
            null,
            200,
            'OK'
        );
    };

    /*
    Format response object for manually trapping an unexpected data condition.  Properties include:
     - error
     - data
     - status
     - statusText
     */
    svc.prototype.trappedErrorHandler = function (response) {
        return issueResponse(
            {},
            {},
            400,
            'Bad request'
        );
    };

    /*
    Formats response object if an error occurs.  Properties include:
     - error
     - data
     - status
     - statusText
     */
    svc.prototype.promiseErrorHandler = function (response) {
        // NOTE: transforming exception to get case correct          
        return issueResponse(
            {},
            {
                exceptionType: response.data.status,
                message: response.data.message
            },
            400,
            'Bad Request'
        );
    };

    return svc;
}

ApiBase.$inject = ['$q', '$http', 'apiCache', 'appEnvironment'];