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
      .when('/deploy', {
        templateUrl: 'views/deploy.html',
        controller: 'DeployCtrl'
      })
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl'
      })
      .when('/env', {
        templateUrl: 'views/env.html',
        controller: 'EnvCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(function ($rootScope) {
  $rootScope.adVersion = 'v0.0.3'; // ancor-dashboard version
  $rootScope.ancorIPAddress = 'http://localhost:3000'; // ip_address of ANCOR project
});
