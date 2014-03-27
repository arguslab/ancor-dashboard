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
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(function ($rootScope) {
  $rootScope.adVersion = 'v0.0.3'; // ancor-dashboard version
  $rootScope.ancorIPAddress = 'http://172.17.0.231:3000'; // ip_address of ANCOR project
});
