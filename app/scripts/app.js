'use strict';

angular.module('ancorDashboardApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.ace'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/confs', {
        templateUrl: 'views/confs.html',
        controller: 'ConfsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
