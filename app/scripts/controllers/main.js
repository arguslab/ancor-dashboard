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

    // sortable functions
    $scope.orderByField = 'name';
    $scope.reverseSort = false;

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

    $scope.checkStageLabel = function (stage) {
      if (stage === 'deploy') {
        return 'label-success';
      } else if (stage === 'undefined') {
        return 'label-warning';
      } else if (stage === 'undeploy') {
        return 'label-success';
      } else if (stage === 'error') {
        return 'label-danger';
      } else {
        return 'label-info';
      }
    };

    // Modal view of a given instance
    $scope.open = function (instance) {
      $scope.items = instance;
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

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
    ];

    // Load D3 graph
    window.setupForcedGraph();
  });
