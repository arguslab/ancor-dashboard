'use strict';

/*
 *  Task Controller
 *
 *  TODO:
 *    - Add modal to view for args
 */
angular.module('ancorDashboardApp')
  .controller('TasksCtrl', function ($scope, $rootScope, $http) {
    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });


    $http.get($rootScope.ancorIPAddress+'/v1/tasks').success(function(data) {
      $scope.tasks = data;
      $scope.keys = [];

      angular.forEach($scope.tasks[0], function(value, key) {
        $scope.keys.push(key);
      });

      $scope.predicate = '-updated_at';
    });

    $scope.title = 'ANCOR Tasks';
  });
