/**
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
demoDirectives.controller('NavDirectiveCtrl', ['$rootScope', '$scope', '$cookieStore', '$cookies',
  /**
   * @function NavDirectiveCtrlInjectConstruct
   * @param {$rootScope} $rootScope 注入全局作用域，用于设置登陆页面地址
   * @param {$scope} $scope 注入局部作用域，用于绑定header内容
   * @param {$cookieStore} $cookieStore 注入$cookieStore，用于获取网络cookie
   * @param {$cookies} $cookies 注入$cookie,用于备份获取cookie
   * @memberof angular_module.demoApp.demoDirectives.NavDirectiveCtrl
   */
  function ($rootScope, $scope, $cookieStore, $cookies) {
	  $rootScope.coxUrl = "http://192.168.1.36:8080";

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
]);