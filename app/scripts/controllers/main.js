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
  });
