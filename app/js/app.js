/**
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
]);