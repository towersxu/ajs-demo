'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('LoginCtrl', ['$scope', '$http', '$cookieStore', '$cookies', '$location',
  function ($scope, $http, $cookieStore, $cookies, $location) {
    /*设置登陆提示信息*/
    $scope.tipInfoObject = {
      "N": "",
      "UE": "帐号或者密码不正确！",
      "VE": "验证码错误！",
      "NE": "网络出错！"
    };
    $scope.tipInfo = $scope.tipInfoObject[$cookies.errorType];
    $scope.domain = $location.search().origUrl || $location.host();

    $scope.clearTipInfo = function () {
      $scope.tipInfo = "";
    };
    ///*记住帐号和密码功能。*/
    $scope.userinfo = $cookieStore.get("uli") || {};
    $scope.isSavePw = !!$scope.userinfo.password;  //两次取反将字符串转换为boolean.
    $scope.loginHandle = function () {
      var userInfo = {};
      userInfo.username = $scope.userinfo.username;
      if ($scope.isSavePw) {
        userInfo.password = $scope.userinfo.password;
      }
      $cookieStore.put('uli', userInfo);
      $cookieStore.put('userinfo', userInfo);
      return false;
    };
  }
]);

