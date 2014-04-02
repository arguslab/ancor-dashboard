'use strict';

/*
 *  Controller for help Modal
 *
 *  Makes a few blocks of text available for
 *  modal to display when user clicks 'help'
 *
 *  http get retrieves the example.yaml config
 *  to display to the user
 */
var ConfHelpCtrl = function($scope, $modalInstance, $http) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  var loadExampleConf = function() {
      $http.get('example.yaml').success(function(data) {
        $scope.exampleConf = data;
      });
    };

  $scope.helpText = 'Below is an example of how you should create your config file...';
  $scope.fileExtHelp = 'Make sure your file has an extension! (i.e. sample.yaml)';
  $scope.roleInfo = 'These roles are just examples. The attributes for a given role are different depending on which role you are configuring. Please refer to the documentation for an example of various roles';
  loadExampleConf();
};

angular.module('ancorDashboardApp')
  .controller('DeployCtrl', function ($scope, $rootScope, $window, $http, $modal) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $http.get($rootScope.ancorIPAddress+'/v1').success(function(data) {
      $scope.version = data.version;
    });


    $http.get($rootScope.ancorIPAddress+'/v1/environments').success(function(data) {
      $scope.env = data;
      $scope.totalEnv = $scope.env.length;
    });

    $scope.title = 'ANCOR Deploy';
    // $scope.version = 'v0.0.1'; // will be replaced by HTTP GET /api/version

    // function used when help button is clicked
    //
    // will open modal through ConfHelpCtrl
    $scope.help = function() {
      var modalInstance = $modal.open({
        templateUrl: 'confHelp.html',
        controller: ConfHelpCtrl
      });
    };

    // Validates that the user has a conf file
    // name that has a .yaml file extension
    $scope.confFileValidation = (function() {
      var regexp = /^[\w,\s-]+\.yaml$/;
      return {
        test: function(value) {
          return regexp.test(value);
        }
      };
    })();

    // ARML Load config Methods
    $scope.confData = 'empty';
    $scope.submitData = '';

    // Function to retrieve a full example
    // config. It will then place it inside
    // the ACE editor
    var loadConf = function(_editor) {
      $http.get('conf-sample/fullstack.yaml').success(function(data) {
        // var _session = _editor.getSession();
        $scope.confData = data;
        _editor.insert($scope.confData);
        _editor.navigateFileStart();
        // console.log($scope.confData);
      });
    };

    // an onLoad function for ACE editor
    $scope.loadConf = function(_editor) {
      var _session = _editor.getSession();
      // var _renderer = _editor.renderer;

      _session.setUndoManager(new ace.UndoManager());

      loadConf(_editor);
      // _editor.setValue($scope.confData);
      // console.log($scope.confData);
    };

    // For each change made in the ACE editor,
    // set the submitData to the new change
    $scope.confChange = function(e, _editor) {
      $scope.submitData = _editor.getValue();
    };

    // Function called when user wants a
    // goal template inserted into ACE
    $scope.goalTemplate = function() {
      var editor = ace.edit('editor'),
          session = editor.getSession(),
          msg = 'goals:\n  example_goal:\n  name: Template Name\n  roles:\n    - template_role';

      editor.insert(msg);
      $scope.submitData = editor.getValue();
    };

    // Function called when user wants a
    // role template inserted into ACE
    $scope.roleTemplate = function(e, _editor) {
      var editor = ace.edit('editor'),
          session = editor.getSession(),
          msg = '\n  example_role:\n    name: Template Name\n    min: 1\n    exports:\n      - export_example\n      - export_example_two\n    imports:\n      - example_import';

      editor.insert(msg);
      $scope.submitData = editor.getValue();
    };

    $scope.confFileName = 'newConfiguration.yaml';

    // Take given yaml file from dashboard and send to ancor
    //
    $scope.deploy = function () {
      if ($scope.submitData === '') {
        $scope.submitData = $scope.confData;
      }

      if ($scope.confFileName === undefined) {
        $scope.confFileName = 'blankConfig.yaml';
      }

      // change url for deployment
      // /v1/environments/???/$scope.confName
      var data = $scope.submitData,
          id = 'production',
          planURL = $rootScope.ancorIPAddress+'/v1/environments/'+id+'/plan',
          header = { 'Content-Type': 'application/yaml' },
          commitURL = $rootScope.ancorIPAddress+'/v1/environments/'+id,
          commitData = { 'commit': true };

      $window.alert('Please go to Tasks to watch ANCOR work\n\n' + 'Config File Name: ' + $scope.confFileName + '\n\n' + $scope.submitData);

      $http({
        url: planURL,
        dataType: 'yaml',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'application/yaml'
        }
      });

      $http.put(commitURL, commitData);
    };

  });
