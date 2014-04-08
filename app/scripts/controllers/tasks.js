'use strict';

/*
 *  Task Controller
 *
 *  TODO:
 *    - Add modal to view for args
 */
angular.module('ancorDashboardApp')
  .controller('TasksCtrl', function ($scope, $rootScope, $http) {

    /*
     *  REST API calls to ancor
     */

    // Get ancor version
    //
    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });

    // Obtain tasks from ancor
    //
    $scope.getData = function() {
      $http.get($rootScope.ancorIPAddress+'/v1/tasks').success(function(data) {
        $scope.tasks = data;
        $scope.keys = [];

        angular.forEach($scope.tasks[0], function(value, key) {
          if (key != 'arguments') {
            $scope.keys.push(key);
          }
        });

        // sort by updated_at with newest first
        $scope.predicate = '-updated_at';
      });
    };

    $scope.getData();

    $scope.quantity = 15;

    // Function to replicate setInterval using $timeout service.
    //
    // Problem with this is it gets called when user moves away
    // from task page
    //
    // $scope.intervalFunction = function(){
    //   $timeout(function() {
    //     $scope.getData();
    //     $scope.intervalFunction();
    //   }, 10000);
    // };

    // Kick off the interval
    // $scope.intervalFunction();

    // Page title
    $scope.title = 'ANCOR Tasks';

    // Helper to generate correct label for task state
    //
    $scope.checkStateLabel = function (state) {
      if (state === 'suspended') {
        return 'label-warning';
      } else if (state === 'completed') {
        return 'label-success';
      } else if (state === 'pending') {
        return 'label-info';
      } else if (state === 'in_progress') {
        return 'label-primary';
      } else if (state === 'error') {
        return 'label-danger';
      } else {
        return 'label-info';
      }
    };
  });
