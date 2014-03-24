'use strict';

var app = angular.module('ancorDashboardApp', [
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
      .when('/deploy', {
        templateUrl: 'views/deploy.html',
        controller: 'DeployCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(function ($rootScope) {
  $rootScope.adVersion = 'v0.0.3';
});
