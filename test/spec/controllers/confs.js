'use strict';

describe('Controller: ConfsCtrl', function () {

  // load the controller's module
  beforeEach(module('ancorDashboardApp'));

  var ConfsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfsCtrl = $controller('ConfsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
