'use strict';

angular.module('ancorDashboardApp')
  .controller('TasksCtrl', function ($scope, $rootScope, $http) {
    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });

    $scope.title = 'ANCOR Tasks';
  });
