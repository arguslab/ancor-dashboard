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

/*
 *  Main index controller
 */
angular.module('ancorDashboardApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $window, $modal, $log, $route) {

    /*
     *  ANCOR REST API calls
     */

    // Gets version from ANCOR
    //
    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });

    // Gets GOALS from ANCOR
    // Currently only supports 1 goal
    //
    $http.get($rootScope.ancorIPAddress+'/v1/goals').success(function(data) {
      if (data.length >= 1) {
        $scope.goalName = data[0].name;
      }
    });

    // Gets all ROLES from Ancor
    // For adding new instances, just needs role slug
    //
    $http.get($rootScope.ancorIPAddress+'/v1/roles').success(function(data) {
      $scope.fullRoles = data;
      $scope.roles = [];
      angular.forEach(data, function(value) {
        $scope.roles.push(value.slug);
      });
    });

    // retrieve instances from ANCOR
    //
    $http.get($rootScope.ancorIPAddress+'/v1/instances').success(function(data) {
      $scope.instances = data;

      var d3InstanceLinks = [];

      // Calculate how many instances are in a certain state
      //
      var numDeployed = 0,
          numUndeployed = 0,
          numErrored = 0,
          numUndefined = 0,
          numPlanDeployed = 0,
          numPlanUndeployed = 0,
          numPlanErrored = 0,
          numPlanUndefined = 0;

      angular.forEach($scope.instances, function(value){
        angular.forEach(value, function(v, k){

          // do checks for stage
          //
          if (v === 'deploy' && k === 'stage') {
            numDeployed++;
          } else if (v === 'undefined' && k === 'stage') {
            numUndefined++;
          } else if (v === 'undeployed' && k === 'stage') {
            numUndeployed++;
          } else if (v === 'error' && k === 'stage') {
            numErrored++;
          }

          // do checks for planned_stage
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

          // create array set for d3 graph
          //
          if (k === 'depends_on') {
            angular.forEach(v, function(dependOnIds) {
              var elem = { source: value.name, target: dependOnIds.name, type: 'direct', sid: value.id };

              d3InstanceLinks.push(elem);
            });
          }
        });
      });

      // Set scope vars for main view to access
      //
      $scope.totalDeployed = numDeployed;
      $scope.totalUndefined = numUndefined;
      $scope.totalUndeployed = numUndeployed;
      $scope.totalErrored = numErrored;
      $scope.totalPlanDeployed = numPlanDeployed;
      $scope.totalPlanUndefined = numPlanUndefined;
      $scope.totalPlanUndeployed = numPlanUndeployed;
      $scope.totalPlanErrored = numPlanErrored;

      $scope.totalInstances = $scope.instances.length;

      // Load D3 graph with new instance relation set
      //
      window.setupForcedGraph(d3InstanceLinks);
    });

    // Replace instance function
    //
    // Currently not implemented in ancor but functionality
    // here should work once implemented in ancor
    //
    $scope.replaceInstance = function (id) {
      var url = $rootScope.ancorIPAddress+'/v1/instances/' + id,
          data = { 'replace': true };
      // console.log('replace ' + id);
      // $window.alert('Replaced ' + id + '!');
      $window.alert('Replace instance function not implemented in ANCOR yet!');

      // $http.post(url, data);
      // $route.reload();
    };

    // Delete a given instance
    //
    $scope.deleteInstance = function (id) {
      var url = $rootScope.ancorIPAddress+'/v1/instances/' + id;
      console.log('delete ' + id);
      $window.alert('Deleted ' + id + '!');

      $http.delete(url);
      $route.reload();
    };

    // Add a new role to ancor
    //
    $scope.addNewRole = function (roleSlug) {
      var url = $rootScope.ancorIPAddress+'/v1/instances',
          newRole = { 'role': roleSlug };

      $window.alert('New role ' + roleSlug + ' added!');

      $http.post(url, newRole);
      $route.reload();
    };

    // Helper function to give label to stage and
    // planned stage in instance table
    //
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
    //
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

  });
