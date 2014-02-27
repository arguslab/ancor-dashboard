'use strict';

angular.module('ancorDashboardApp')
  .controller('MainCtrl', function ($scope, $http, $window) {
    $http.get('ancor-api-sample/instances.json').success(function(data) {
      $scope.instances = data;
    });

    // GET api/instances/x
    // Query ancor for specific instance for detailed view
    // Will be invoked when instance is clicked on the table

    // Will be able to take id from given msg to do
    // http get call on specific instance for more info
    //
    // Look up info on angularjs generating modal views on TWBS
    $scope.sendAlert = function (msg) {
      var str = 'id: ' + msg.id + '\nname:' + msg.name + '\ninterface: ' + msg.interfaces + '\nstage: ' + msg.stage + '\nplannedStage: ' + msg.plannedStage;
      $window.alert(str);
    };

    $scope.title = 'ANCOR Index';
    $scope.version = '0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    // $scope.instances = [{name: 'Test Name', interfaces: 'Test Interface', stage: 'Success'}, {name: 'Test 2', interfaces: '2Int 2Face', stage: 'Success'}];
  });
