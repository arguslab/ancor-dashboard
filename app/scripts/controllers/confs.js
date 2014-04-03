'use strict';

/*
 *  Environments Controller
 *
 */
angular.module('ancorDashboardApp')
  .controller('ConfsCtrl', function ($scope, $rootScope, $http, $window, $route) {

    /*
     *  REST API calls to ANCOR
     */

    // Get Version
    //
    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });

    // Get all environments
    //
    $http.get($rootScope.ancorIPAddress+'/v1/environments').success(function(data) {
      $scope.env = data;
      $scope.keys = [];

      angular.forEach($scope.env[0], function(value, key) {
        $scope.keys.push(key);
      });

      if ($scope.keys.length > 1) {
        $scope.keys.push('Delete');
      }
    });

    // Page Title
    $scope.title = 'ANCOR Enviornments';

    $scope.data = [{name: 'Loading configurations...', contents: ''}];

    // Delete Environment
    //
    $scope.deleteEnv = function (slug) {
      var url = $rootScope.ancorIPAddress+'/v1/environments/' + slug;
      console.log('delete ' + slug);
      $window.alert('Deleted ' + slug + '!');

      $http.delete(url);
      $route.reload();
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
