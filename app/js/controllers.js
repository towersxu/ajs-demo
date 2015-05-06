'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('NavCtrl', ['$scope', '$cookieStore','$cookies','$http','$window','$rootScope',
  function ($scope, $cookieStore ,$cookies ,$http ,$window,$rootScope) {
    var userinfo = $cookies.userinfo;
    userinfo ?$rootScope.userinfo = JSON.parse(userinfo) : $rootScope.userinfo = {};
    $scope.userinfo = $rootScope.userinfo;
    //$scope.logout = function() {
    //  var url = "/SSOServer/logout?callback=JSON_CALLBACK&token=" + $scope.token;
    //  $http.jsonp(url).success(function (data) {
    //    $cookieStore.remove('userinfo');
    //    $window.location.href="#login";
    //  }).error(function (data) {
    //    console.log("登出失败!");
    //    $cookieStore.remove('userinfo');
    //    $window.location.href="#login";
    //  });
    //}
  }
]);

demoControllers.controller('HomeCtrl', ['$scope', '$cookies', '$cookieStore', '$http','$rootScope',
  function ($scope, $cookies, $cookieStore, $http ,$rootScope) {
    $scope.userinfo = $rootScope.userinfo;
    ////$scope.user = $cookies.userinfo;
    //
    ////使用jsonp获取需要设置script的url地址。
    //$scope.token = $cookies.token;
    //if ($scope.token) {
    //  var url = "/SSOServer/setCookie?callback=JSON_CALLBACK&token=" + $scope.token;
    //  $http.jsonp(url).success(function (data) {
    //    $scope.setScript(data.url);
    //  }).error(function (data) {
    //    console.log("get domian error!");
    //  });
    //} else {
    //  console.log("no token!");
    //}
    ////动态创建<script>标签，用于设置其他域cookie。
    //$scope.setScript = function (urls) {
    //  var dFrag = document.createDocumentFragment();
    //  for (var i = 0; i < urls.length; i++) {
    //    var script = document.createElement("script");
    //    script.type = 'text/javascript';
    //    script.src = urls[i];
    //    dFrag.appendChild(script);
    //  }
    //  var head = document.getElementsByTagName('head')[0];
    //  head.appendChild(dFrag);
    //}
  }
]);

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
      console.log($cookieStore.get('uli'));
      return false;
    };
    ///*设在验证码*/
    //$http.get('data/verify.json').success(function (data) {
    //  $scope.location = data;
    //});
  }
]);
demoControllers.controller('DeviceList', ['$scope', '$http', '$cookies','$cookieStore',
  function ($scope, $http, $cookies ,$cookieStore) {
    //$scope.token = $cookies.token;
    //$scope.userinfo = $cookieScope.get('userinfo');
    //console.log(JSON.parse($scope.userinfo));
    //$scope.davices = ["chrome", "IE", "firefox"];
    //if ($scope.token) {
    //  var url = "/SSOServer/server/getBrowser?callback=JSON_CALLBACK&token=" + $scope.token;
    //  $http.jsonp(url).success(function (data) {
    //    $scope.davices = data;
    //    console.log("获取设备返回的数据：" + data);
    //  }).error(function (data) {
    //    console.log("获取数据失败!" + data);
    //  });
    //}
    //$scope.forceLogout = function (browser, index) {
    //  console.log(arguments);
    //  $scope.davices.splice(index, 1);
    //  var url = "/SSOServer/server/logoutBrowser?callback=JSON_CALLBACK&browser=" + browser;
    //  $http.jsonp(url).success(function (data) {
    //    $scope.davices = data;
    //    console.log("获取设备返回的数据：" + data);
    //  }).error(function (data) {
    //    console.log("获取数据失败!" + data);
    //  });
    //}
  }
]);
