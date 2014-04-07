'use strict';

describe('Controller: EnvCtrl', function () {

  // load the controller's module
  beforeEach(module('ancorDashboardApp'));

  var EnvCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnvCtrl = $controller('EnvCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
