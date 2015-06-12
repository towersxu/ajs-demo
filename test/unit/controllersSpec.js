/**
 * Created by taox on 15-4-28.
 */
"use strict";
describe('ajsDemo controllers', function () {

  describe('LoginCtrl', function () {
    var scope,cookieStore,ctrl;
    beforeEach(module('demoApp'));
    beforeEach(module('ngCookies'));
    beforeEach(inject(function($rootScope, $controller,$cookieStore){
      scope = $rootScope.$new();
      cookieStore = $cookieStore;
      ctrl = $controller('LoginCtrl',{$scope:scope,$cookieStore:$cookieStore});
    }));
    it('should show',function(){
      expect(scope.isSavePw).toEqual(false);
    })
  });
});


describe('login controllers',function(){
  describe('RegisterCtrl',function() {
    var scope,ctrl;
    beforeEach(module('demoApp'));
    beforeEach(inject(function($rootScope,$controller){
      scope = $rootScope.$new();
      ctrl = $controller('RegisterCtrl',{$scope:scope})
    }));
    it('Email default is vaild.',function(){
      expect(scope.isEmailVailed).toEqual(true);
    })
  });
});