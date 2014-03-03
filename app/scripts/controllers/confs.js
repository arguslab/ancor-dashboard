'use strict';

angular.module('ancorDashboardApp')
  .controller('ConfsCtrl', function ($scope) {
    $scope.title = 'ANCOR Configurations';
    $scope.dashboardVersion = 'v0.0.3';
    $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.data = [{name: 'My Title', contents: 'Contents'}, {name: 'Title 2', contents: 'Woot woot woot'}];

    $scope.data = [{name: 'Loading posts...', contents: ''}];

    // POST /api/deploy
    // Take given yaml file from dashboard and send to ancor
  });
