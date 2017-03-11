﻿/*
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

        if (config.url.indexOf('weather?') > -1) {
            return $q.when(JSON.parse('{"data": {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":23.88,"pressure":1033,"humidity":35,"temp_min":21.2,"temp_max":26.6},"visibility":16093,"wind":{"speed":9.17,"deg":20},"clouds":{"all":1},"dt":1489250100,"sys":{"type":1,"id":1007,"message":0.3872,"country":"US","sunrise":1489234050,"sunset":1489276424},"id":4887398,"name":"Chicago","cod":200}}'));
            // return $q.when(JSON.stringify('{data: {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":23.88,"pressure":1033,"humidity":35,"temp_min":21.2,"temp_max":26.6},"visibility":16093,"wind":{"speed":9.17,"deg":20},"clouds":{"all":1},"dt":1489250100,"sys":{"type":1,"id":1007,"message":0.3872,"country":"US","sunrise":1489234050,"sunset":1489276424},"id":4887398,"name":"Chicago","cod":200}}'));
        } else {
            return $q.when(JSON.parse('{"data": {"cod":"200","message":0.0045,"cnt":40,"list":[{"dt":1489255200,"main":{"temp":27.34,"temp_min":22.7,"temp_max":27.34,"pressure":1024.42,"sea_level":1048.47,"grnd_level":1024.42,"humidity":100,"temp_kf":2.58},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":10.98,"deg":327.004},"sys":{"pod":"d"},"dt_txt":"2017-03-11 18:00:00"},{"dt":1489266000,"main":{"temp":29.44,"temp_min":25.97,"temp_max":29.44,"pressure":1022.86,"sea_level":1046.89,"grnd_level":1022.86,"humidity":100,"temp_kf":1.93},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":9.22,"deg":333.002},"sys":{"pod":"d"},"dt_txt":"2017-03-11 21:00:00"},{"dt":1489276800,"main":{"temp":28.94,"temp_min":26.63,"temp_max":28.94,"pressure":1022.6,"sea_level":1046.79,"grnd_level":1022.6,"humidity":100,"temp_kf":1.29},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":10.22,"deg":335.502},"sys":{"pod":"n"},"dt_txt":"2017-03-12 00:00:00"},{"dt":1489287600,"main":{"temp":26.76,"temp_min":25.61,"temp_max":26.76,"pressure":1023.63,"sea_level":1047.92,"grnd_level":1023.63,"humidity":100,"temp_kf":0.64},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":11.65,"deg":323.001},"sys":{"pod":"n"},"dt_txt":"2017-03-12 03:00:00"},{"dt":1489298400,"main":{"temp":24.05,"temp_min":24.05,"temp_max":24.05,"pressure":1023.34,"sea_level":1047.79,"grnd_level":1023.34,"humidity":100,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":10.87,"deg":320.5},"sys":{"pod":"n"},"dt_txt":"2017-03-12 06:00:00"},{"dt":1489309200,"main":{"temp":22.13,"temp_min":22.13,"temp_max":22.13,"pressure":1022.93,"sea_level":1047.48,"grnd_level":1022.93,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":12.19,"deg":323.005},"sys":{"pod":"n"},"dt_txt":"2017-03-12 09:00:00"},{"dt":1489320000,"main":{"temp":20.76,"temp_min":20.76,"temp_max":20.76,"pressure":1022.48,"sea_level":1047.26,"grnd_level":1022.48,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":9.19,"deg":324.501},"sys":{"pod":"n"},"dt_txt":"2017-03-12 12:00:00"},{"dt":1489330800,"main":{"temp":24.11,"temp_min":24.11,"temp_max":24.11,"pressure":1022.67,"sea_level":1046.87,"grnd_level":1022.67,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":7,"deg":311.501},"sys":{"pod":"d"},"dt_txt":"2017-03-12 15:00:00"},{"dt":1489341600,"main":{"temp":27.6,"temp_min":27.6,"temp_max":27.6,"pressure":1021.87,"sea_level":1045.86,"grnd_level":1021.87,"humidity":100,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":4.29,"deg":326.006},"sys":{"pod":"d"},"dt_txt":"2017-03-12 18:00:00"},{"dt":1489352400,"main":{"temp":28.73,"temp_min":28.73,"temp_max":28.73,"pressure":1019.13,"sea_level":1042.89,"grnd_level":1019.13,"humidity":100,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":88},"wind":{"speed":3.94,"deg":112.501},"sys":{"pod":"d"},"dt_txt":"2017-03-12 21:00:00"},{"dt":1489363200,"main":{"temp":28.91,"temp_min":28.91,"temp_max":28.91,"pressure":1016.75,"sea_level":1040.62,"grnd_level":1016.75,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":80},"wind":{"speed":8.66,"deg":123.503},"snow":{"3h":0.01375},"sys":{"pod":"n"},"dt_txt":"2017-03-13 00:00:00"},{"dt":1489374000,"main":{"temp":29.4,"temp_min":29.4,"temp_max":29.4,"pressure":1017.03,"sea_level":1041.09,"grnd_level":1017.03,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":88},"wind":{"speed":7.85,"deg":142},"snow":{"3h":0.51875},"sys":{"pod":"n"},"dt_txt":"2017-03-13 03:00:00"},{"dt":1489384800,"main":{"temp":29.09,"temp_min":29.09,"temp_max":29.09,"pressure":1015.78,"sea_level":1039.82,"grnd_level":1015.78,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":92},"wind":{"speed":8.41,"deg":130.004},"snow":{"3h":1.305},"sys":{"pod":"n"},"dt_txt":"2017-03-13 06:00:00"},{"dt":1489395600,"main":{"temp":30.02,"temp_min":30.02,"temp_max":30.02,"pressure":1012.81,"sea_level":1036.9,"grnd_level":1012.81,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":88},"wind":{"speed":12.82,"deg":139.502},"snow":{"3h":0.73},"sys":{"pod":"n"},"dt_txt":"2017-03-13 09:00:00"},{"dt":1489406400,"main":{"temp":30.16,"temp_min":30.16,"temp_max":30.16,"pressure":1011.28,"sea_level":1035.28,"grnd_level":1011.28,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":92},"wind":{"speed":14.79,"deg":141.5},"snow":{"3h":0.675},"sys":{"pod":"n"},"dt_txt":"2017-03-13 12:00:00"},{"dt":1489417200,"main":{"temp":30.64,"temp_min":30.64,"temp_max":30.64,"pressure":1010.25,"sea_level":1033.97,"grnd_level":1010.25,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":88},"wind":{"speed":15.46,"deg":134},"snow":{"3h":1.1525},"sys":{"pod":"d"},"dt_txt":"2017-03-13 15:00:00"},{"dt":1489428000,"main":{"temp":31.78,"temp_min":31.78,"temp_max":31.78,"pressure":1008.19,"sea_level":1031.72,"grnd_level":1008.19,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":88},"wind":{"speed":15.57,"deg":122.501},"snow":{"3h":1.325},"sys":{"pod":"d"},"dt_txt":"2017-03-13 18:00:00"},{"dt":1489438800,"main":{"temp":32.45,"temp_min":32.45,"temp_max":32.45,"pressure":1006.3,"sea_level":1029.62,"grnd_level":1006.3,"humidity":100,"temp_kf":0},"weather":[{"id":601,"main":"Snow","description":"snow","icon":"13d"}],"clouds":{"all":92},"wind":{"speed":12.8,"deg":103.502},"snow":{"3h":1.5975},"sys":{"pod":"d"},"dt_txt":"2017-03-13 21:00:00"},{"dt":1489449600,"main":{"temp":32.5,"temp_min":32.5,"temp_max":32.5,"pressure":1006.52,"sea_level":1029.98,"grnd_level":1006.52,"humidity":100,"temp_kf":0},"weather":[{"id":601,"main":"Snow","description":"snow","icon":"13n"}],"clouds":{"all":92},"wind":{"speed":13.47,"deg":70.5015},"snow":{"3h":1.525},"sys":{"pod":"n"},"dt_txt":"2017-03-14 00:00:00"},{"dt":1489460400,"main":{"temp":32.05,"temp_min":32.05,"temp_max":32.05,"pressure":1006.71,"sea_level":1030.48,"grnd_level":1006.71,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":88},"wind":{"speed":15.55,"deg":62.5012},"snow":{"3h":1.15},"sys":{"pod":"n"},"dt_txt":"2017-03-14 03:00:00"},{"dt":1489471200,"main":{"temp":31.05,"temp_min":31.05,"temp_max":31.05,"pressure":1007.15,"sea_level":1031.03,"grnd_level":1007.15,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":88},"wind":{"speed":15.68,"deg":61.5027},"snow":{"3h":0.335},"sys":{"pod":"n"},"dt_txt":"2017-03-14 06:00:00"},{"dt":1489482000,"main":{"temp":29.66,"temp_min":29.66,"temp_max":29.66,"pressure":1008.39,"sea_level":1032.35,"grnd_level":1008.39,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":80},"wind":{"speed":16.69,"deg":41.0002},"snow":{"3h":0.1525},"sys":{"pod":"n"},"dt_txt":"2017-03-14 09:00:00"},{"dt":1489492800,"main":{"temp":28.3,"temp_min":28.3,"temp_max":28.3,"pressure":1010.77,"sea_level":1034.81,"grnd_level":1010.77,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":88},"wind":{"speed":18.59,"deg":39.501},"snow":{"3h":0.032499999999999},"sys":{"pod":"n"},"dt_txt":"2017-03-14 12:00:00"},{"dt":1489503600,"main":{"temp":28.41,"temp_min":28.41,"temp_max":28.41,"pressure":1013.22,"sea_level":1037.17,"grnd_level":1013.22,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":88},"wind":{"speed":16.02,"deg":40.0005},"snow":{"3h":0.1725},"sys":{"pod":"d"},"dt_txt":"2017-03-14 15:00:00"},{"dt":1489514400,"main":{"temp":29.1,"temp_min":29.1,"temp_max":29.1,"pressure":1014.53,"sea_level":1038.37,"grnd_level":1014.53,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":68},"wind":{"speed":13.69,"deg":23.007},"snow":{"3h":0.1725},"sys":{"pod":"d"},"dt_txt":"2017-03-14 18:00:00"},{"dt":1489525200,"main":{"temp":29.06,"temp_min":29.06,"temp_max":29.06,"pressure":1015.68,"sea_level":1039.37,"grnd_level":1015.68,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":64},"wind":{"speed":16.46,"deg":7.5},"snow":{"3h":0.3},"sys":{"pod":"d"},"dt_txt":"2017-03-14 21:00:00"},{"dt":1489536000,"main":{"temp":27.21,"temp_min":27.21,"temp_max":27.21,"pressure":1017.8,"sea_level":1041.81,"grnd_level":1017.8,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":44},"wind":{"speed":22.86,"deg":346},"snow":{"3h":0.195},"sys":{"pod":"n"},"dt_txt":"2017-03-15 00:00:00"},{"dt":1489546800,"main":{"temp":25.51,"temp_min":25.51,"temp_max":25.51,"pressure":1019.15,"sea_level":1043.39,"grnd_level":1019.15,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":36},"wind":{"speed":21.07,"deg":343.504},"snow":{"3h":0.0525},"sys":{"pod":"n"},"dt_txt":"2017-03-15 03:00:00"},{"dt":1489557600,"main":{"temp":25.27,"temp_min":25.27,"temp_max":25.27,"pressure":1019.15,"sea_level":1043.67,"grnd_level":1019.15,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":44},"wind":{"speed":20.29,"deg":343.5},"snow":{"3h":0.37},"sys":{"pod":"n"},"dt_txt":"2017-03-15 06:00:00"},{"dt":1489568400,"main":{"temp":24.56,"temp_min":24.56,"temp_max":24.56,"pressure":1019.5,"sea_level":1044.14,"grnd_level":1019.5,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":44},"wind":{"speed":18.39,"deg":343.503},"snow":{"3h":1.1825},"sys":{"pod":"n"},"dt_txt":"2017-03-15 09:00:00"},{"dt":1489579200,"main":{"temp":23.59,"temp_min":23.59,"temp_max":23.59,"pressure":1020.4,"sea_level":1045.07,"grnd_level":1020.4,"humidity":100,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":36},"wind":{"speed":18.16,"deg":340.502},"snow":{"3h":0.715},"sys":{"pod":"n"},"dt_txt":"2017-03-15 12:00:00"},{"dt":1489590000,"main":{"temp":24.56,"temp_min":24.56,"temp_max":24.56,"pressure":1021.14,"sea_level":1045.33,"grnd_level":1021.14,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":14.81,"deg":332.001},"snow":{"3h":0.022500000000001},"sys":{"pod":"d"},"dt_txt":"2017-03-15 15:00:00"},{"dt":1489600800,"main":{"temp":26.96,"temp_min":26.96,"temp_max":26.96,"pressure":1020.41,"sea_level":1044.36,"grnd_level":1020.41,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":12.46,"deg":320.501},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-03-15 18:00:00"},{"dt":1489611600,"main":{"temp":28.32,"temp_min":28.32,"temp_max":28.32,"pressure":1018.51,"sea_level":1042.32,"grnd_level":1018.51,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":7.07,"deg":313.501},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-03-15 21:00:00"},{"dt":1489622400,"main":{"temp":25.46,"temp_min":25.46,"temp_max":25.46,"pressure":1017.83,"sea_level":1041.91,"grnd_level":1017.83,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":6.06,"deg":276.001},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-03-16 00:00:00"},{"dt":1489633200,"main":{"temp":23.68,"temp_min":23.68,"temp_max":23.68,"pressure":1017.84,"sea_level":1042.05,"grnd_level":1017.84,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":76},"wind":{"speed":6.73,"deg":268},"snow":{"3h":0.0024999999999995},"sys":{"pod":"n"},"dt_txt":"2017-03-16 03:00:00"},{"dt":1489644000,"main":{"temp":21.68,"temp_min":21.68,"temp_max":21.68,"pressure":1018.01,"sea_level":1042.35,"grnd_level":1018.01,"humidity":100,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":64},"wind":{"speed":7.29,"deg":267.503},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-03-16 06:00:00"},{"dt":1489654800,"main":{"temp":20.95,"temp_min":20.95,"temp_max":20.95,"pressure":1017.65,"sea_level":1042.05,"grnd_level":1017.65,"humidity":100,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":4.27,"deg":270.501},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-03-16 09:00:00"},{"dt":1489665600,"main":{"temp":17.47,"temp_min":17.47,"temp_max":17.47,"pressure":1018.62,"sea_level":1042.95,"grnd_level":1018.62,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.38,"deg":246.502},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-03-16 12:00:00"},{"dt":1489676400,"main":{"temp":23.83,"temp_min":23.83,"temp_max":23.83,"pressure":1020.09,"sea_level":1044.04,"grnd_level":1020.09,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.29,"deg":255.501},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-03-16 15:00:00"}],"city":{"id":4887398,"name":"Chicago","coord":{"lat":41.85,"lon":-87.6501},"country":"US"}}}'));
        }

        console.log('hope you are not here');
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