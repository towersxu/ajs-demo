/**
 * Created by taox on 15-4-27.
 */
;/**
 * @fileOverview app.js
 * @author taox
 * @version 0.1
 */

'use strict';

angular.module('demoApp', [
  'ngRoute',
  'demoControllers',
  'demoDirectives',
  'ngCookies'
]).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/login',{
      templateUrl:'demo/login.html',
      controller:'LoginCtrl'
    }).when('/register',{
      templateUrl:"demo/register.html",
      controller:"RegisterCtrl"
    }).otherwise({
      redirectTo:'/login'
    });
  }
]);;'use strict';

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
demoControllers.controller('RegisterCtrl',['$scope','$http',
  function($scope,$http){
    $scope.isEmailVailed = true;
    $scope.isPasswordVailed = true;
    $scope.isPassword1Vailed = true;
    $scope.isInValid = true;
    $scope.blurEmail = function(){
      if($scope.email){
        $http.post('/SSOServer/server/validateemail', {userEmail:$scope.email}).
          success(function(data, status, headers, config) {
            if(data && (data.status == "pass")){
              $scope.registerForm.$invalid = false;
              $scope.isEmailVailed = true;
              $scope.emailErrorResult = "";
            }else{
              $scope.registerForm.$invalid = true;
              $scope.isEmailVailed = false;
              $scope.emailErrorResult = "(exist)";
            }
          }).
          error(function(data, status, headers, config) {
            $scope.registerForm.$invalid = true;
            $scope.isEmailVailed = false;
            $scope.emailErrorResult = "(server error)";
          });
      }else{
        $scope.isEmailVailed = false;
        $scope.registerForm.$invalid = true;
        $scope.emailErrorResult = "(empty)";
      }
    };
    $scope.keyupPassword = function(){
      if($scope.password && $scope.password.length>6 && $scope.password.length<32){
        $scope.passwordErrorInfo = "";
        $scope.isPasswordVailed = true;
        $scope.registerForm.$invalid = false;
      }else{
        $scope.registerForm.$invalid = true;
        $scope.isPasswordVailed = false;
        $scope.passwordErrorInfo = "(password length should between 6-32)";
      }
    };
    $scope.keyupPassword1 = function(){
      if($scope.password && ($scope.password1==$scope.password)){
        $scope.isPassword1Vailed = true;
        $scope.password1ErrorInfo = "";
        $scope.registerForm.$invalid = false;
      }else{
        $scope.isPassword1Vailed = false;
        $scope.password1ErrorInfo = "(retype password not equal password)";
        $scope.registerForm.$invalid = true;
      }
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

;/**
 * @namespace demoDirectives
 * @desc 顶部导航条模板
 * @memberof angular_module.demoApp
 */
var demoDirectives = angular.module('demoDirectives', []);
/**
 * @namespace header
 * @desc 自定义angular指令<header>
 * @example <caption>Example usage of header.</caption>
 * // html
 *&lt;div header class="nav" ng-controller="NavDirectiveCtrl" &gt;&lt;/div&gt;
 * @memberof angular_module.demoApp.demoDirectives
 */
demoDirectives.directive('header', function () {
  return {
    restrict:'A',
    templateUrl: 'demo/header.html',
    link:function(scope,el,attrs){
      console.log(arguments);
    }
  };
});
/**
 * @namespace NavDirectiveCtrl
 * @memberof angular_module.demoApp.demoDirectives
 */
demoDirectives.controller('NavDirectiveCtrl', ['$rootScope', '$scope', '$cookieStore', '$cookies','$location',
  /**
   * @function NavDirectiveCtrlInjectConstruct
   * @param {$rootScope} $rootScope 注入全局作用域，用于设置登陆页面地址
   * @param {$scope} $scope 注入局部作用域，用于绑定header内容
   * @param {$cookieStore} $cookieStore 注入$cookieStore，用于获取网络cookie
   * @param {$cookies} $cookies 注入$cookie,用于备份获取cookie
   * @memberof angular_module.demoApp.demoDirectives.NavDirectiveCtrl
   */
  function ($rootScope, $scope, $cookieStore, $cookies,$location) {
	  $rootScope.coxUrl = "http://192.168.1.36:8080";
    $scope.domain = $location.search().origUrl || $location.host();
    var userinfo = $cookieStore.get("userinfo") || $cookies.userinfo || "{}";
    typeof userinfo == "object" ? $rootScope.userinfo = userinfo : $rootScope.userinfo = JSON.parse(userinfo);
    $scope.isHidden = true;
    if ($rootScope.userinfo && $rootScope.userinfo.username) {
      $scope.isHidden = false;
      $scope.name = $rootScope.userinfo;
    } else {
      $scope.isHidden = true;
    }
  }
]);;/**
 * Created by taox on 15-4-27.
 */
;/**
 * Created by taox on 15-4-27.
 */
