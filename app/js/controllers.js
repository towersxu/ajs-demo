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
demoControllers.controller('RegisterCtrl',['$scope','$http','$location',
  function($scope,$http,$location){
    $scope.domain = $location.search().origUrl || $location.host();
    $scope.isEmailVailed = true;
    $scope.isPasswordVailed = true;
    $scope.isPassword1Vailed = true;
    $scope.isInValid = true;

    function getFormValidStatus(){
      if($scope.isEmailVailed && $scope.isPasswordVailed && $scope.isPassword1Vailed && $scope.password && $scope.password1 && $scope.email){
        $scope.registerForm.$invalid = false;
      }else{
        $scope.registerForm.$invalid = true;
      }
    }
    $scope.postUrl = '/SSOServer/server/reg?url="'+($location.search().origUrl || $location.host())+'"';
    $scope.keyupEmail = function(){
      if($scope.email){
        $http.post('/SSOServer/server/validateemail', {userEmail:$scope.email}).
          success(function(data, status, headers, config) {
            if(data && (data.status == "pass")){
              $scope.isEmailVailed = true;
              $scope.emailErrorResult = "";
            }else{
              $scope.isEmailVailed = false;
              $scope.emailErrorResult = "(exist)";
            }

          }).
          error(function(data, status, headers, config) {
            $scope.isEmailVailed = false;
            $scope.emailErrorResult = "(server error)";
          });
      }else{
        $scope.isEmailVailed = false;
        $scope.emailErrorResult = "(email invalid)";
      }
      getFormValidStatus();
    };
    $scope.keyupPassword = function(){
      if($scope.password && $scope.password.length>6 && $scope.password.length<32){
        $scope.passwordErrorInfo = "";
        $scope.isPasswordVailed = true;
      }else{
        $scope.isPasswordVailed = false;
        $scope.passwordErrorInfo = "(password length should between 6-32)";
      }
      $scope.keyupPassword1();
      getFormValidStatus();
    };
    $scope.keyupPassword1 = function(){
      if($scope.password && ($scope.password1==$scope.password)){
        $scope.isPassword1Vailed = true;
        $scope.password1ErrorInfo = "";
      }else{
        $scope.isPassword1Vailed = false;
        $scope.password1ErrorInfo = "(retype password not equal password)";
      }
      getFormValidStatus();
    };

    $scope.registerHandle = function(){
      if($scope.isEmailVailed && $scope.isPasswordVailed && $scope.isPassword1Vailed){
        $scope.isInValid = false;
      }else{
        $scope.isInValid = true;
      }
    }
  }
]);

demoControllers.filter('trusted',['$sce',function($sce){
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  }
}]);