'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('NavCtrl', ['$scope', '$cookieStore',
  function ($scope, $cookieStore) {
    $scope.userinfo = $cookieStore.get('userinfo');
    console.log($scope.username)
  }]);

demoControllers.controller('HomeCtrl', ['$scope', '$cookies', '$cookieStore',
  function ($scope, $cookies, $cookieStore) {
    $scope.userinfo = $cookieStore.get('userinfo');
    console.log($scope.userinfo);
    $scope.user = $cookies.userinfo;
    console.log($scope.user);
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
      //$cookieStore.put('errorType', "NE");
      //window.location.href = "#home";
      $http({
        method:'POST',
        url:'/SSOServer/server/login',
        data:{
          "userAccount":$scope.userinfo.username,
          "userPwd" : $scope.userinfo.password,
          "url":"http://www.a.com"
        }
      }).success(function(data){
        console.log("login msg ===================》");
        console.log(data);
        console.log("《===========================");
        $scope.tipInfo = $scope.tipInfoObject[data];
      });
    };
    /*设在验证码*/
    $http.get('data/verify.json').success(function (data) {
      $scope.location = data;
    });
  }
]);
