'use strict';

/*
 *  Environments Controller
 *
 *  TODO:
 *    - Fix ordering on table
 *
 */
angular.module('ancorDashboardApp')
  .controller('ConfsCtrl', function ($scope, $rootScope, $http, $window, $route) {
    // $http.get('ancor-api-sample/instances.json').success(function(data) {
    //   // get current config
    // )};

    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });

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

    $scope.title = 'ANCOR Enviornments';
    // $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.data = [{name: 'My Title', contents: 'Contents'}, {name: 'Title 2', contents: 'Woot woot woot'}];

    $scope.data = [{name: 'Loading configurations...', contents: ''}];

    $scope.deleteEnv = function (slug) {
      var url = $rootScope.ancorIPAddress+'/v1/environments/' + slug;
      console.log('delete ' + slug);
      $window.alert('Deleted ' + slug + '!');

      // console.log(url);
      $http.delete(url);
      $route.reload();
    };

  });
