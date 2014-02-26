'use strict';

angular.module('ancorDashboardApp')
  .controller('MainCtrl', function ($scope) {
    $scope.title = 'ANCOR Index';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    $scope.instances = [{name: 'Test Name', intface: 'Test Interface', stage: 'Success'}, {name: 'Test 2', intface: '2Int 2Face', stage: 'Success'}];
  });
