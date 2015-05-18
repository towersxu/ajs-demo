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
    it('karamValue equal true',function(){
      expect(scope.karamValue).toEqual(true);
    })
  });

  describe('HttpCtrl',function(){
    var scope,ctrl,httpBackend;
    beforeEach(module('demoApp'));
    beforeEach(inject(function($rootScope,$controller,$httpBackend){
      httpBackend  = $httpBackend;
      $httpBackend.expectGET('data/data.json').respond({
        "name":"taox",
        "age":"24",
        "friends":[
          {
            "name":"xt",
            "age":"24"
          },
          {
            "name":"resole",
            "age":23
          },
          {
            "name":"towersxu",
            "age":"25"
          }
        ]
      });

      scope = $rootScope.$new();
      ctrl =$controller('HttpCtrl',{$scope:scope});
    }));

    it('should show name taox',function(){
      httpBackend.flush();
      expect(scope.data.name).toEqual("taox");
    });

    it('xutao have 3 friends',function(){
      httpBackend.flush();
      expect(scope.data.friends.length).toBe(3);
    });
  })
});


