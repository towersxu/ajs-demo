'use strict';

/* Controllers */

var demoControllers = angular.module('demoControllers', []);


demoControllers.controller('HomeCtrl', ['$scope', '$cookies', '$cookieStore', '$http', '$rootScope',
  function ($scope, $cookies, $cookieStore, $http, $rootScope) {
    $rootScope.coxUrl = "http://192.168.1.36:8080";

    $scope.userinfo = $rootScope.userinfo;
    //使用jsonp获取需要设置script的url地址。
    $scope.token = $cookies.token || $cookieStore.get("token");
    if ($scope.token) {
      $http.jsonp($rootScope.coxUrl + "/SSOServer/server/setCookie?callback=JSON_CALLBACK&token=" + $scope.token).success(function (data) {
        $scope.setScript(data.url);
      }).error(function (data) {
      });
    } else {
    }
    //动态创建<script>标签，用于设置其他域cookie。
    $scope.setScript = function (urls) {
      var dFrag = document.createDocumentFragment(),
        head = document.getElementsByTagName('head')[0];
      for (var i = 0; i < urls.length; i++) {
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = urls[i];
        dFrag.appendChild(script);
      }
      head.appendChild(dFrag);
    };

    $scope.setCookie = function () {
      var user = {};
      user.userNickName = "towersxu";
      $cookieStore.put("userinfo", user);
    }
  }
]);

demoControllers.controller('DeviceList', ['$scope', '$http', '$cookies', '$rootScope',
  function ($scope, $http, $cookies, $rootScope) {
    var url;
    $scope.token = $cookies.token;
    $scope.userinfo = $rootScope.userinfo;
    $scope.davices = [];
    if ($scope.token) {
      url = $rootScope.coxUrl + "/SSOServer/server/getBrowser?callback=JSON_CALLBACK&uid=" + $scope.userinfo.userId;
      $http.jsonp(url).success(function (data) {
        var davice,
          agent,
          regSys = /windows|linux/,
          regMobile = /android|iphone/,
          regBoweser = /ie|chrome|trident/,
          regSecond = /qq|micromessenger|bidu|uc/,
          reg = /###(.+)###(.+)/;
        $scope.davices = [];
        for (var i = 0; i < data.length; i++) {
          davice = {};
          davice.agent = data[i].device;
          davice.source = data[i].source;
          agent = davice.agent.toLowerCase();
          davice.sys = agent.match(regSys);
          davice.sys ? davice.sys = davice.sys[0] : davice.sys = "unknown";
          if (agent.match(regMobile)) {
            davice.sys = agent.match(regMobile)[0];
          }
          davice.software = agent.match(regBoweser);
          davice.software ? davice.software = davice.software[0] : davice.software = "unknown";
          if (agent.match(regSecond)) {
            davice.software = agent.match(regSecond)[0];
          }
          davice.ip = agent.match(reg)[1] || "unknown";
          davice.time = agent.match(reg)[2] || "unknown";
          $scope.davices.push(davice);
        }
      }).error(function (data) {

      });
    }
    $scope.forceLogout = function (browser, index) {
      var domian = browser.source.split("^!@#$&")[0],
        url = domian + "/makeCommunicate?callback=JSON_CALLBACK?url=" + domian;
      $scope.davices.splice(index, 1);
      if (domian) {
        $http.jsonp(url).success(function (data) {
          url = $rootScope.coxUrl + "/SSOServer/server/otherlogout?callback=JSON_CALLBACK&browser=" + browser.device + "&token=" + data.token;
          $http.jsonp(url).success(function (data) {
            $scope.davices = data;
          }).error(function (data) {
          });
        }).error(function (data) {

        });
      }
    }
  }
]);
