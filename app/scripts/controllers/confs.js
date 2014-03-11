'use strict';

angular.module('ancorDashboardApp')
  .controller('ConfsCtrl', function ($scope, $window, $http) {
    // $http.get('ancor-api-sample/instances.json').success(function(data) {
    //   // get current config
    // )};

    $scope.title = 'ANCOR Configurations';
    $scope.dashboardVersion = 'v0.0.3';
    $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.data = [{name: 'My Title', contents: 'Contents'}, {name: 'Title 2', contents: 'Woot woot woot'}];

    $scope.data = [{name: 'Loading posts...', contents: ''}];

    // Load config
    $scope.confData = 'empty';

    var loadConf = function(_editor) {
      $http.get('conf-sample/fullstack.yaml').success(function(data) {
        // var _session = _editor.getSession();
        $scope.confData = data;
        _editor.insert($scope.confData);
        _editor.navigateFileStart();
        // console.log($scope.confData);
      });
    };

    $scope.loadConf = function(_editor) {
      var _session = _editor.getSession();
      // var _renderer = _editor.renderer;

      _session.setUndoManager(new ace.UndoManager());

      loadConf(_editor);
      // _editor.setValue($scope.confData);
      // console.log($scope.confData);
    };

    // POST /api/deploy
    // Take given yaml file from dashboard and send to ancor
    $scope.deploy = function (msg) {
      $window.alert(msg);
    };
  });
