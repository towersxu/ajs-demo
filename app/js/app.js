/**
 * Created by taox on 15-4-27.
 */
;'use strict';
/**
 * @namespace demoApp
 * @memberOf angular_module
 * @see module:
 */
angular.module('demoApp', [
  'ngRoute',
  'demoControllers',
  'demoDirectives',
  'ngCookies'
]).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/home',{
      templateUrl:'demo/home.html',
      controller:'HomeCtrl'
    }).when('/DeviceList',{
      templateUrl:'demo/device-list.html',
      controller:'DeviceList'
    }).otherwise({
      redirectTo:'/home'
    });
  }
]);