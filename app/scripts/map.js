'use strict';

angular.module('map', ['medline-geo', 'ngUnderscore', 'datamaps'])
    .controller('MapCtrl', function (_, $scope, medlineGeoClient) {

        $scope.mapObject = {
            scope: 'world',
            options: {
                width: 960,
                legendHeight: 60
            },
            geographyConfig: {
                highlighBorderColor: '#EAA9A8',
                highlighBorderWidth: 2
            },
            fills: {
                'HIGH': '#CC4731',
                'MEDIUM': '#306596',
                'LOW': '#667FAF',
                'defaultFill': '#DDDDDD'
            },
            data: {}
        };

        $scope.mapPlugins = {
            arc: {strokeWidth: 7}
        };
        $scope.mapPluginData = {
            arc: []
        };

        medlineGeoClient.findGeoLinks('Geneva').then(function (geoLinks) {
            var arcOpts = {
                strokeWidth: 0.2,
                strokeColor: 'rgba(100, 10, 200, 0.4)',
                greatArc: true
            };
            var arcs = _.map(geoLinks, function (link) {
                return {
                    origin: {
                        latitude: link.coordsLinks._1._1,
                        longitude: link.coordsLinks._1._2
                    },
                    destination: {
                        latitude: link.coordsLinks._2._1,
                        longitude: link.coordsLinks._2._2
                    },
                    options: arcOpts
                };
            });

            //.map(function (cit) {
            //    var nbCoords = cit.coordinates.length;
            //    if (nbCoords <= 7) {
            //        _.each(cit.coordinates, function (c1, i) {
            //            _.map(_.range(i + 1, nbCoords), function (j) {
            //                var c2 = cit.coordinates[j];
            //                arcs.push(
            //
            //                );
            //            });
            //        });
            //    }
            //    return _.map(cit.coordinates, function (coords) {
            //        return _.extend(cit, {coordinates: coords});
            //    });
            //})
            //.flatten()
            //.groupBy(function (t) {
            //    return '' + t.coordinates._1 + ',' + t.coordinates._2;
            //})
            //.map(function (grpCoords) {
            //    var x0 = grpCoords[0];
            //    return {
            //        latlngs: [x0.coordinates._1, x0.coordinates._2],
            //        radius: 1000,
            //        type: 'circle',
            //        color: '#ff612f'
            //        //count: grpCoords.length,
            //        //pubmedIds: _.pluck(grpCoords, 'pubmedId')
            //
            //    };
            //})
            //.value();
            $scope.mapPluginData.arc = arcs;
        });
    })
;
