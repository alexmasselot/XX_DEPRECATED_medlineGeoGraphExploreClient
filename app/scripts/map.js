'use strict';

angular.module('map', ['leaflet-directive', 'medline-geo', 'ngUnderscore'])
    .controller('MapCtrl', function (_, $scope, medlineGeoClient) {
        var citationCoords = [];
        $scope.paths = [];

        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false
            }
        });


        medlineGeoClient.findByAffiliation('Genentech').then(function (aCitCoords) {
            var coordsCount = _.chain(aCitCoords)
                .map(function (cit) {
                    return _.map(cit.coordinates, function (coords) {
                        return _.extend(cit, {coordinates: coords});
                    });
                })
                .flatten()
                .groupBy(function (t) {
                    return '' + t.coordinates._1 + ',' + t.coordinates._2;
                })
                .map(function (grpCoords) {
                    var x0 = grpCoords[0];
                    return {
                        latlngs: [x0.coordinates._1, x0.coordinates._2],
                        radius: 1000,
                        type: 'circle',
                        color: '#ff612f'
                        //count: grpCoords.length,
                        //pubmedIds: _.pluck(grpCoords, 'pubmedId')

                    };
                })
                .value();
            console.log(coordsCount)
            $scope.paths = coordsCount;
        });
    })
;
