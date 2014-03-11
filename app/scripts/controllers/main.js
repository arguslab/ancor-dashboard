'use strict';

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

angular.module('ancorDashboardApp')
  .controller('MainCtrl', function ($scope, $http, $window, $modal, $log, $route) {
    $http.get('ancor-api-sample/instances.json').success(function(data) {
      $scope.instances = data;
      $scope.circles = [];

      var numDeployed = 0,
          numUndeployed = 0,
          numErrored = 0,
          numUndefined = 0,
          x = 15,
          y = 20;

      angular.forEach($scope.instances, function(value){
        $scope.circles.push({'x':x, 'y':y, 'r':15});
        x += 50;
        // y += 20;
        angular.forEach(value, function(v, k){
          // console.log('k: ' + k + '| v: ' + v);
          if (v === 'deploy' && k === 'stage') {
            numDeployed++;
          } else if (v === 'undefined' && k === 'stage') {
            numUndefined++;
          } else if (v === 'undeployed' && k === 'stage') {
            numErrored++;
          } else if (v === 'error' && k === 'stage') {
            numUndefined++;
          }

          // do checks for plannedStage here
          //
        });
      });

      $scope.totalDeployed = numDeployed;
      $scope.totalUndefined = numUndefined;
      $scope.totalUndeployed = numUndeployed;
      $scope.totalErrored = numErrored;
      $scope.totalInstances = $scope.instances.length;
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

    $scope.replaceInstance = function (id) {
      var url = '/v1/instances/' + id,
          data = { 'replace': true };
      console.log('replace ' + id);
      $window.alert('Replaced ' + id + '!');

      $http.post(url, data).success();
      $route.reload();
    };

    $scope.deleteInstance = function (id) {
      var url = '/v1/instances/' + id;
      console.log('delete ' + id);
      $window.alert('Deleted ' + id + '!');

      $http.delete(url);
      $route.reload();
    };

    // Modal view of a given instance
    $scope.open = function (instance) {
      $scope.items = instance;
      // console.log(instance);
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: ModalInstanceCtrl,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.graph = {'width': 400, 'height': 100};
    // $scope.circles = [
    //   {'x': 15, 'y':20, 'r':15},
    //   {'x': 50, 'y':60, 'r':20},
    //   {'x': 80, 'y':15, 'r':15},
    // ];

    // roles to be replaced with http get
    $scope.roles = [
      'web',
      'db',
      'weblb'
    ];

    // Data
    $scope.title = 'ANCOR Index';
    $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.dashboardVersion = 'v0.0.3'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    // $scope.instances = [{name: 'Test Name', interfaces: 'Test Interface', stage: 'Success'}, {name: 'Test 2', interfaces: '2Int 2Face', stage: 'Success'}];
  });
