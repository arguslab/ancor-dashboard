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
  .controller('MainCtrl', function ($scope, $rootScope, $http, $window, $modal, $log, $route) {

    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });

    $http.get($rootScope.ancorIPAddress+'/v1/goals').success(function(data) {
      if (data.length >= 1) {
        $scope.goalName = data[0].name;
      }
    });

    $http.get($rootScope.ancorIPAddress+'/v1/roles').success(function(data) {
      $scope.fullRoles = data;
      $scope.roles = [];
      angular.forEach(data, function(value) {
        $scope.roles.push(value.slug);
      });
    });

    // retrieve instances from ANCOR
    $http.get($rootScope.ancorIPAddress+'/v1/instances').success(function(data) {
      $scope.instances = data;

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

          // do checks for planned_stage here
          //
          if (v === 'deploy' && k === 'planned_stage') {
            numPlanDeployed++;
          } else if (v === 'undefined' && k === 'planned_stage') {
            numPlanUndefined++;
          } else if (v === 'undeployed' && k === 'planned_stage') {
            numPlanUndeployed++;
          } else if (v === 'error' && k === 'planned_stage') {
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

    // Define custom entries for instance table view
    $scope.instanceColumnEntries = [
      'Name',
      'Interface',
      'Stage',
      'Planned Stage',
      'More Info',
      'Operations'
    ];

    // sortable functions
    $scope.orderByField = 'name';
    $scope.reverseSort = false;

    // GET api/instances/x
    // Query ancor for specific instance for detailed view
    // Will be invoked when instance is clicked on the table

    // Will be able to take id from given msg to do
    // http get call on specific instance for more info
    //
    // $scope.sendAlert = function (msg) {
    //   var str = 'id: ' + msg.id + '\nname:' + msg.name + '\ninterface: ' + msg.interfaces + '\nstage: ' + msg.stage + '\nplanned_stage: ' + msg.planned_stage;
    //   $window.alert(str);
    // };

    $scope.replaceInstance = function (id) {
      var url = $rootScope.ancorIPAddress+'/v1/instances/' + id,
          data = { 'replace': true };
      console.log('replace ' + id);
      $window.alert('Replaced ' + id + '!');

      $http.post(url, data);
      $route.reload();
    };

    $scope.deleteInstance = function (id) {
      var url = $rootScope.ancorIPAddress+'/v1/instances/' + id;
      console.log('delete ' + id);
      $window.alert('Deleted ' + id + '!');

      $http.delete(url);
      $route.reload();
    };

    $scope.addNewRole = function (roleSlug) {
      var url = $rootScope.ancorIPAddress+'/v1/instances',
          newRole = { 'role': roleSlug };

      console.log(newRole);

      $http.post(url, newRole);
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

    // Page Data
    $scope.title = 'ANCOR Index';

    // $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    // Load D3 graph
    window.setupForcedGraph();

    // $scope.instances = [{name: 'Test Name', interfaces: 'Test Interface', stage: 'Success'}, {name: 'Test 2', interfaces: '2Int 2Face', stage: 'Success'}];
  });
