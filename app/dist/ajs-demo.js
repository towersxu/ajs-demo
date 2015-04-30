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
    $scope.token = $cookieStore.get('token');
    if(!$scope.token){
      var url = "/SSOServer/server/login?callback=JSON_CALLBACK&token="+$scope.token;
      $http.jsonp(url).success(function(data) {
        console.log(data);
        data= JSON.parse(data);
        $scope.setScript(data.url);
      }).error(function(data){
        data= data ||'{"url":["http://libs.baidu.com/jquery/1.9.1/jquery.min.js","http://libs.baidu.com/jquery/1.7.2/jquery.min.js"]}';
        data= JSON.parse(data);
        $scope.setScript(data.url);
      });
    }else{
      console.log("no token!");
    }
    $scope.setScript = function(url){
      var dFrag = document.createDocumentFragment();
      for(var i = 0;i < url.length; i++){
        var script = document.createElement("script");
        script.type= 'text/javascript';
        script.src= url[i];
        dFrag.appendChild(script);
      }
      var head= document.getElementsByTagName('head')[0];
      head.appendChild(dFrag);
    }
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
;/**
 * Created by taox on 15-4-27.
 */
;/**
 * Created by taox on 15-4-27.
 */
;/**
 * Created by taox on 15-4-27.
 */
