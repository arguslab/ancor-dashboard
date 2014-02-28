'use strict';

angular.module('ancorDashboardApp')
  .controller('MainCtrl', function ($scope, $http, $window, $modal, $log) {
    $http.get('ancor-api-sample/instances.json').success(function(data) {
      $scope.instances = data;
    });

    // $scope.items = ['item1', 'item2', 'item3'];

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

    // Modal view of a given instance
    $scope.open = function (instance) {
      $scope.items = instance;
      console.log(instance);
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
}
