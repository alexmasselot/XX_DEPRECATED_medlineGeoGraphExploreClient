'use strict';

angular.module('map', ['medline-geo', 'ngUnderscore', 'datamaps', 'thirdparties'])
    .controller('MapPointsCtrl', function (_, $scope, medlineGeoClient, d3) {
        $scope.selected = {
            year: 2000
        };

        var nbColors = 10;
        var countCategories = {};
        var countCategory = function (x) {
            return 'COUNT_CAT_' + Math.round(x * nbColors);
        };
        _.map(_.range(nbColors + 1), function (i) {
            var x = 1.0 * i / nbColors;
            var c = d3.interpolateRgb('blue', 'red')(x);
            countCategories[countCategory(x)] = c;
        });

        $scope.$watch('selected.year', function () {
            if($scope.data === undefined || $scope.data.coordCounts === undefined){
                return;
            }
            $scope.showYear();
        });

        $scope.mapObject = {
            scope: 'world',
            options: {
                width: 960,
                legendHeight: 60
            },
            geographyConfig: {
                popupOnHover: false,
                highlightOnHover: false
            },
            bubblesConfig: {
                borderWidth: 0,
                fillOpacity: 0.9
            },
            fills: _.extend({'defaultFill': '#DDDDDD'}, countCategories),
            data: {}
        };

        $scope.mapPlugins = {
            bubbles: {}
        };
        $scope.mapPluginData = {
            bubbles: []
        };

        medlineGeoClient.findCoordinateCount('Geneva').then(function (coordCounts) {

            var years = _.chain(coordCounts)
                .pluck('year')
                .uniq()
                .value()
                .sort();
            $scope.data = {
                years: years,
                coordCounts: _.sortBy(coordCounts, function (cc) {
                    return cc.n;
                })
            };
            $scope.showYear();

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
        });

        $scope.showYear = function () {
            var yearCoordCounts = _.filter($scope.data.coordCounts, function (cc) {
                return cc.year === $scope.selected.year;
            });
            var maxCount = Math.log(_.chain(yearCoordCounts).pluck('n').max().value());
            var bubbles = _.chain(yearCoordCounts)
                .sortBy(function (cc) {
                    return cc.n;
                })
                .map(function (cc) {
                    return {
                        latitude: cc.roundedCoords._1,
                        longitude: cc.roundedCoords._2,
                        radius: 1.5,
                        fillKey: countCategory(Math.log(cc.n) / maxCount),
                        name: cc.n
                    };
                })
                .value();
            $scope.mapPluginData.bubbles = bubbles;
        };
    })
;
