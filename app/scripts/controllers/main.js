'use strict';

angular.module('ancorDashboardApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('ancor-api-sample/instances.json').success(function(data) {
      $scope.instances = data;
    });

    $scope.title = 'ANCOR Index';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    // $scope.instances = [{name: 'Test Name', interfaces: 'Test Interface', stage: 'Success'}, {name: 'Test 2', interfaces: '2Int 2Face', stage: 'Success'}];
  });
