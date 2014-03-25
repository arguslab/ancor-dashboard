'use strict';

angular.module('ancorDashboardApp')
  .controller('TasksCtrl', function ($scope, $rootScope, $http) {
    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });


    $http.get($rootScope.ancorIPAddress+'/v1/tasks').success(function(data) {
      $scope.tasks = data;
    });

    $scope.title = 'ANCOR Tasks';
  });
