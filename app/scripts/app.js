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
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MapCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
