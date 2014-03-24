'use strict';

/*
 *  Controller for view Modal
 *
 *  displays various instance information
 *  depending on which view button the user
 *  selects from the instance table
 *
 */
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

    // retrieve instances from ANCOR
    $http.get('ancor-api-sample/instances.json').success(function(data) {
      $scope.instances = data;
      $scope.circles = [];

      var numDeployed = 0,
          numUndeployed = 0,
          numErrored = 0,
          numUndefined = 0,
          numPlanDeployed = 0,
          numPlanUndeployed = 0,
          numPlanErrored = 0,
          numPlanUndefined = 0;

      // display different label color depending on
      // what stage the instance is at
      angular.forEach($scope.instances, function(value){
        angular.forEach(value, function(v, k){
          // console.log('k: ' + k + '| v: ' + v);
          if (v === 'deploy' && k === 'stage') {
            numDeployed++;
          } else if (v === 'undefined' && k === 'stage') {
            numUndefined++;
          } else if (v === 'undeployed' && k === 'stage') {
            numUndeployed++;
          } else if (v === 'error' && k === 'stage') {
            numErrored++;
          }

          // do checks for plannedStage here
          //
          if (v === 'deploy' && k === 'plannedStage') {
            numPlanDeployed++;
          } else if (v === 'undefined' && k === 'plannedStage') {
            numPlanUndefined++;
          } else if (v === 'undeployed' && k === 'plannedStage') {
            numPlanUndeployed++;
          } else if (v === 'error' && k === 'plannedStage') {
            numPlanErrored++;
          }
        });
      });

      $scope.totalDeployed = numDeployed;
      $scope.totalUndefined = numUndefined;
      $scope.totalUndeployed = numUndeployed;
      $scope.totalErrored = numErrored;
      $scope.totalPlanDeployed = numPlanDeployed;
      $scope.totalPlanUndefined = numPlanUndefined;
      $scope.totalPlanUndeployed = numPlanUndeployed;
      $scope.totalPlanErrored = numPlanErrored;

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

    // roles to be replaced with http get
    $scope.roles = [
      'web',
      'db',
      'weblb'
    ];

    // Page Data
    $scope.title = 'ANCOR Index';
    $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    // $scope.instances = [{name: 'Test Name', interfaces: 'Test Interface', stage: 'Success'}, {name: 'Test 2', interfaces: '2Int 2Face', stage: 'Success'}];
  });
