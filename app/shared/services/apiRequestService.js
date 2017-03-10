angular.module('WeatherApp.services')    
    .factory('apiRequestSvc', function ($q, apiCache) {
        var svc = {};                        

        svc.getOrAdd = function (key, callback) {
            var deferred = $q.defer();
                        
            var cacheId = key;
            var cachedData = apiCache.get(cacheId);
            // Return the data if we already have it
            if (cachedData) {                
                success(cachedData);
                return;
            } else {
                // Execute request and store it
                callback().then(
                    function (response) {                                                
                        deferred.resolve(response);
                        apiCache.put(cacheId, deferred.resolve(response));                       
                    },
                    function (response) {                        
                        deferred.resolve(response);
                    }
                );
            }
            return deferred.promise;            
        }

        return svc;
    });