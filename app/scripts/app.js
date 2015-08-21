'use strict';

/**
 * @ngdoc overview
 * @name medlineGeoGraphExploreClientApp
 * @description
 * # medlineGeoGraphExploreClientApp
 *
 * Main module of the application.
 */
angular
    .module('medlineGeoGraphExploreClientApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'map',
        'datamaps',
        'ui.slider',
        'thirdparties'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/locations', {
                templateUrl: 'views/map-points.html',
                controller: 'MapPointsCtrl'
            })
            .otherwise({
                redirectTo: '/locations'
            });
    });
