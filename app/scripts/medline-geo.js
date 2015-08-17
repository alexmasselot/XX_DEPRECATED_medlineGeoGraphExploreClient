'use strict';

/**
 * @ngdoc overview
 * @name medline-geo
 * @description
 *
 */
angular
    .module('medline-geo', [
    ])
    .factory('medlineGeoClient', function ($http) {
        var MedlineGeoClient = function () {
            var _this = this;

            return _this;
        };

        MedlineGeoClient.prototype.findByAffiliation= function(q){
          return $http.get('http://localhost:9000/filter/'+q)
              .then(function(response){
                  return response.data;
              });
        };

        return new MedlineGeoClient();
    })
;
