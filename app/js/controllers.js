'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('HomeCtrl', ['$scope', '$cookies',
  function ($scope) {
    $scope.orderProp = 'login';
  }]);

demoControllers.controller('LoginCtrl', ['$scope', '$http', '$cookies', '$cookieStore',
  function ($scope, $http, $cookies, $cookieStore) {
    $http.get('data/verify.json').success(function (data) {
      $scope.location = data;
    });

    /*记住帐号和密码功能。*/
    $scope.userinfo = $cookieStore.get('userinfo') || {};
    $scope.isSavePw = !!$scope.userinfo.password;  //两次取反将字符串转换为boolean.
    $scope.loginHandle = function () {
      var userInfo = {};
      userInfo.username = $scope.userinfo.username;
      if ($scope.isSavePw) {
        userInfo.password = $scope.userinfo.password;
      }
      $cookieStore.put('userinfo', userInfo);
    }

  }]);
