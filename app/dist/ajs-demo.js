/**
 * Created by taox on 15-4-27.
 */
;/**
 * @namespace demoApp
 * @memberOf angular_module
 * @see module:
 */
'use strict';
angular.module('demoApp', [
  'ngRoute',
  'demoControllers',
  'demoDirectives',
  'karamControllers',
  'ngCookies'
]).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/home',{
      templateUrl:'demo/home.html',
      controller:'HomeCtrl'
    }).when('/DeviceList',{
      templateUrl:'demo/device-list.html',
      controller:'DeviceList'
    }).when('/Http-test',{
      templateUrl:'demo/http-test.html',
      controller:'HttpCtrl'
    }).otherwise({
      redirectTo:'/home'
    });
  }
]);;'use strict';

/**
 * @namespace demoControllers
 * @memberof angular_module.demoApp
 */
var demoControllers = angular.module('demoControllers', []);
/**
 * @namespace HomeCtrl
 * @desc 主页的控制器
 * @memberof angular_module.demoApp.demoControllers
 */
demoControllers.controller('HomeCtrl', ['$scope', '$cookies', '$cookieStore', '$http', '$rootScope',
  /**
   * @function HomeCtrlInjectConstructor
   * @desc 初始化控制器HomeCtrl
   * @param {$scope} $scope 注入局部作用域
   * @param {$cookies} $cookies 注入cookies
   * @param {$cookieStore} $cookieStore 注入cookieStore
   * @param {$http} $http 注入http用于进行jsonp数据获取
   * @param {$rootScope} $rootScope 注入全局作用域，用于获获取登陆页面地址。
   * @memberof angular_module.demoApp.demoControllers.HomeCtrl
   */
  function ($scope, $cookies, $cookieStore, $http, $rootScope) {
    $scope.userinfo = $rootScope.userinfo;
    $scope.karamValue = true;
    //使用jsonp获取需要设置script的url地址。
    $scope.token = $cookies.token || $cookieStore.get("token");
    if ($scope.token) {
      $http.jsonp($rootScope.coxUrl + "/SSOServer/server/setCookie?callback=JSON_CALLBACK&token=" + $scope.token).success(function (data) {
        $scope.setScript(data.url);
      }).error(function (data) {
      });
    } else {
    }
    /**
     * @function $scope.setScript
     * @desc 动态创建script标签，用于设置其他域cookie。
     * @param {String} urls 设置域的地址
     * @memberof angular_module.demoApp.demoControllers.HomeCtrl
     */
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
/**
 * @namespace DeviceList
 * @desc 查看上线设备列表的控制器
 * @memberof angular_module.demoApp.demoControllers
 */
demoControllers.controller('DeviceList', ['$scope', '$http', '$cookies','$rootScope',
  /**
   * @function DeviceListInjectConstructor
   * @desc 初始化控制器DeviceList
   * @param {$scope} $scope 注入局部作用域
   * @param {$http} $http 注入http用于进行jsonp数据获取
   * @param {$cookies} $cookies $cookies 注入cookies
   * @param {$rootScope} $rootScope $rootScope 注入全局作用域，用于获获取登陆页面地址。
   * @memberof angular_module.demoApp.demoControllers.DeviceList
   */
  function ($scope, $http, $cookies ,$rootScope) {
    var url;
    $scope.token = $cookies.token;
    $scope.userinfo = $rootScope.userinfo;
    $scope.davices = [];
    if ($scope.token) {
      url = $rootScope.coxUrl + "/SSOServer/server/getBrowser?callback=JSON_CALLBACK&uid=" + $scope.userinfo.userId;
      $http.jsonp(url).success(function (data) {
        $scope._setDevice(data);
      }).error(function (data) {

      });
    }
    /**
     * @function $scope._setDevice
     * @desc 将设备的设备列表与DOM进行双向绑定
     * @param {Array} data 当前用户所有的登陆信息
     * @memberof angular_module.demoApp.demoControllers.DeviceList
     * @private
     */
    $scope._setDevice = function(data){
      $scope.davices = [];
      var davice,
        agent,
        regSys = /windows|linux/,
        regMobile = /android|iphone/,
        regBoweser = /ie|chrome|trident|firefox/,
        regSecond = /qq|micromessenger|bidu|uc/;
      for (var i = 0; i < data.length; i++) {
        davice = {};
        davice.agent = data[i].device;
        davice.token = data[i].token;
        davice.ip = data[i].ip;
        davice.loginTime = data[i].logintime;
        davice.region = data[i].region;

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
        $scope.davices.push(davice);
      }
    };
    /**
     * @function $scope.forceLogout
     * @desc 强制下线某个登陆角色
     * @param {String} agent 登陆浏览器请求头
     * @param {String} token 登陆验证令牌三
     * @param {String} ip 登陆地址服务器
     * @param {String} loginTime 登陆时间
     * @param {int} index 在所有登陆信息中的位置
     * @memberof angular_module.demoApp.demoControllers.DeviceList
     */
    $scope.forceLogout = function (agent, token,ip,loginTime, index) {
      $scope.davices.splice(index, 1);
      var url = $rootScope.coxUrl + "/SSOServer/server/otherlogout?callback=JSON_CALLBACK&device=" + agent + "&token=" + token +"&ip="+ip+"&logintime="+loginTime;
      $http.jsonp(url).success(function (data) {
        $scope._setDevice(data);
      }).error(function (data) {
      });
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
    templateUrl: 'demo/header.html'
  };
});
/**
 * @namespace NavDirectiveCtrl
 * @memberof angular_module.demoApp.demoDirectives
 */
demoDirectives.controller('NavDirectiveCtrl', ['$rootScope', '$scope', '$cookieStore', '$cookies','$http','$window',
  /**
   * @function NavDirectiveCtrlInjectConstruct
   * @param {$rootScope} $rootScope 注入全局作用域，用于设置登陆页面地址
   * @param {$scope} $scope 注入局部作用域，用于绑定header内容
   * @param {$cookieStore} $cookieStore 注入$cookieStore，用于获取网络cookie
   * @param {$cookies} $cookies 注入$cookie,用于备份获取cookie
   * @memberof angular_module.demoApp.demoDirectives.NavDirectiveCtrl
   */
  function ($rootScope, $scope, $cookieStore, $cookies ,$http ,$window) {
	  $rootScope.coxUrl = "http://192.168.1.36:8080";

    var userinfo = $cookieStore.get("userinfo") || $cookies.userinfo || "{}";
    typeof userinfo == "object" ? $rootScope.userinfo = userinfo : $rootScope.userinfo = JSON.parse(userinfo);
    $scope.isHidden = true;
    if ($rootScope.userinfo) {
      $scope.isHidden = false;
      $scope.name = $rootScope.userinfo;
    } else {
      $scope.isHidden = true;
    }

    $scope.logout = function(){
      var url = $rootScope.coxUrl + "/SSOServer/server/logout?callback=JSON_CALLBACK";
      $scope.isHidden = true;
      $http.jsonp(url).success(function (data) {
        $window.location.reload();
      }).error(function (data) {
      });
    }
  }
]);;/**
 * Created by taox on 15-4-27.
 */
;/**
 * Created by taox on 15-5-18.
 */
var karamControllers = angular.module('karamControllers', ['ngResource']);

karamControllers.factory('jsonData',['$resource',
  function($resource){
    return $resource('data/:url',{},{
      query: {method:'GET', params:{url:'urls'}, isArray:true}
    });
  }
]);

karamControllers.controller('HttpCtrl',['$scope','jsonData',
  function($scope,jsonData){
    $scope.data = jsonData.get({url:"data.json"},function(data){

    });
    console.log($scope.data)
  }
]);
;/**
 * Created by taox on 15-4-27.
 */
