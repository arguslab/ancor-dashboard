'use strict';

angular.module('ancorDashboardApp')
  .controller('ConfsCtrl', function ($scope, $window, $http, $modal) {
    // $http.get('ancor-api-sample/instances.json').success(function(data) {
    //   // get current config
    // )};

    $scope.title = 'ANCOR Enviornments';
    $scope.dashboardVersion = 'v0.0.3';
    $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.data = [{name: 'My Title', contents: 'Contents'}, {name: 'Title 2', contents: 'Woot woot woot'}];

    $scope.data = [{name: 'Loading configurations...', contents: ''}];

  });
