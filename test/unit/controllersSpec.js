/**
 * Created by taox on 15-4-28.
 */
"use strict";
describe('ajsDemo controllers', function () {

  describe('HomeCtrl', function () {
    var scope,cookieStore,ctrl;
    beforeEach(module('demoApp'));
    beforeEach(module('ngCookies'));
    beforeEach(inject(function($rootScope, $controller,$cookieStore){
      scope = $rootScope.$new();
      cookieStore = $cookieStore;
      ctrl = $controller('HomeCtrl',{$scope:scope,$cookieStore:$cookieStore});
    }));
    it('should show',function(){
      expect(scope.karamValue).toEqual(true);
    })
  });
});


