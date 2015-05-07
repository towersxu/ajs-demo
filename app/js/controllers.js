'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('NavCtrl', ['$scope', '$cookieStore','$cookies','$http','$window','$rootScope',
  function ($scope, $cookieStore ,$cookies ,$http ,$window,$rootScope) {
    $rootScope.coxUrl = "http://192.168.1.36:8080";
    var userinfo = $cookieStore.get("userinfo") || "{}";
    $rootScope.userinfo = JSON.parse(userinfo);
    //var userinfo = $cookies.userinfo;
    //userinfo ?$rootScope.userinfo = JSON.parse(userinfo) : $rootScope.userinfo = {};
    //$scope.userinfo = $rootScope.userinfo;
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
  function ($scope, $cookies, $cookieStore, $http, $rootScope) {
    $scope.userinfo = $rootScope.userinfo;
    //使用jsonp获取需要设置script的url地址。
    $scope.token = $cookies.token;
    if ($scope.token) {
      var url = $rootScope.coxUrl +"/SSOServer/server/setCookie?callback=JSON_CALLBACK&token=" + $scope.token;
      $http.jsonp(url).success(function (data) {
        $scope.setScript(data.url);
      }).error(function (data) {
      });
    } else {
    }
    //动态创建<script>标签，用于设置其他域cookie。
    $scope.setScript = function (urls) {
      var dFrag = document.createDocumentFragment();
      for (var i = 0; i < urls.length; i++) {
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = urls[i];
        dFrag.appendChild(script);
      }
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(dFrag);
    }
  }
]);

demoControllers.controller('DeviceList', ['$scope', '$http', '$cookies','$rootScope',
  function ($scope, $http, $cookies ,$rootScope) {
    $scope.token = $cookies.token;
    $scope.userinfo = $rootScope.userinfo;
    $scope.davices = [];
    if ($scope.token) {
      var url = $rootScope.coxUrl+"/SSOServer/server/getBrowser?callback=JSON_CALLBACK&uid=" + $scope.userinfo.userId;
      $http.jsonp(url).success(function (data) {
        $scope.davices = data || {};
      }).error(function (data) {

      });
    }
    $scope.forceLogout = function (browser, index) {
      var domian = browser.source.split("^!@#$&")[0];
      $scope.davices.splice(index, 1);
      if(domian){
        var url = domian +"/getTokenCookie?callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(data){
          var url = $rootScope.coxUrl+"/SSOServer/server/otherlogout?callback=JSON_CALLBACK&browser=" + browser.device+"&token="+data.token;
          $http.jsonp(url).success(function (data) {
            $scope.davices = data;
          }).error(function (data) {
          });
        }).error(function(data){

        });
      }
    }
  }
]);
