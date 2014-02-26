'use strict';

angular.module('ancorDashboardApp')
  .controller('ConfsCtrl', function ($scope, $location, $http) {
    $scope.title = 'ANCOR Configurations';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.data = [{name: 'My Title', contents: 'Contents'}, {name: 'Title 2', contents: 'Woot woot woot'}];

    $scope.data = [{name: 'Loading posts...', contents: ''}];
  });
