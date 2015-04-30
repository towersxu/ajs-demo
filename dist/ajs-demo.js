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
  'ngCookies'
]).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/home',{
      templateUrl:'demo/home.html',
      controller:'HomeCtrl'
    }).when('/login',{
      templateUrl:'demo/login.html',
      controller:'LoginCtrl'
    }).otherwise({
      redirectTo:'/home'
    });
  }
]);;'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('HomeCtrl', ['$scope', '$cookies',
  function ($scope) {
    $scope.orderProp = 'login';
  }]);

demoControllers.controller('LoginCtrl', ['$scope', '$http', '$cookieStore',
  function ($scope, $http, $cookieStore) {
    /*设置登陆提示信息*/
    $scope.tipInfoObject = {
      "N":"",
      "UE":"帐号或者密码不正确！",
      "VE":"验证码错误！",
      "NE":"网络出错！"
    };
    $scope.tipInfo = $scope.tipInfoObject[$cookieStore.get('errorType')];
    $scope.clearTipInfo = function(){
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
      $cookieStore.put('errorType', "NE");
      window.location.reload();
    };
    /*设在验证码*/
    $http.get('data/verify.json').success(function (data) {
      $scope.location = data;
    });
  }
]);
;/**
 * Created by taox on 15-4-27.
 */
;/**
 * Created by taox on 15-4-27.
 */
;/**
 * Created by taox on 15-4-27.
 */
