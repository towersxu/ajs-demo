'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.orderProp = 'login';
  }]);

demoControllers.controller('LoginCtrl', ['$scope','$http',
  function($scope,$http) {
    $http.get('data/verify.json').success(function(data){
      $scope.location = data;
    });
    $scope.phoneId = 'name'
  }]);
