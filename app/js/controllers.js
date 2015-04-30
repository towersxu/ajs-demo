'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('NavCtrl', ['$scope', '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.userinfo = $cookieStore.get('userinfo');
    console.log($scope.username)
  }]);

demoControllers.controller('HomeCtrl', ['$scope', '$cookies', '$cookieStore','$http',
  function ($scope, $cookies, $cookieStore ,$http) {
    $scope.userinfo = $cookieStore.get('userinfo');
    console.log($scope.userinfo);
    $scope.user = $cookies.userinfo;
    console.log($scope.user);

    //使用jsonp获取url
    $http.jsonp("/SSOServer/server/login?callback=JSON_CALLBACK",{
      "token": $cookieStore.get('token')
    }).success(function(data) {
      console.log(data);
    }).error(function(data){
      console.log(data);
    });

  }]);
demoControllers.controller('LoginCtrl', ['$scope', '$http', '$cookieStore',
  function ($scope, $http, $cookieStore) {
    /*设置登陆提示信息*/
    $scope.tipInfoObject = {
      "N": "",
      "UE": "帐号或者密码不正确！",
      "VE": "验证码错误！",
      "NE": "网络出错！"
    };
    $scope.tipInfo = $scope.tipInfoObject[$cookieStore.get('errorType')];
    $scope.clearTipInfo = function () {
      $scope.tipInfo = "";
    };
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
      return false;
    };
    /*设在验证码*/
    $http.get('data/verify.json').success(function (data) {
      $scope.location = data;
    });
  }
]);
