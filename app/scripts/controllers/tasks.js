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

    $scope.quantity = 15;

    $scope.getData = function() {
      $http.get($rootScope.ancorIPAddress+'/v1/tasks').success(function(data) {
        $scope.tasks = data;
        $scope.keys = [];

        angular.forEach($scope.tasks[0], function(value, key) {
          $scope.keys.push(key);
        });

        $scope.predicate = '-updated_at';
      });
    };

    $scope.getData();

    // Function to replicate setInterval using $timeout service.
    //
    // Problem with this is it gets called when user isn't on tasks page
    // $scope.intervalFunction = function(){
    //   $timeout(function() {
    //     $scope.getData();
    //     $scope.intervalFunction();
    //   }, 10000);
    // };

    // Kick off the interval
    // $scope.intervalFunction();

    $scope.title = 'ANCOR Tasks';
  });
