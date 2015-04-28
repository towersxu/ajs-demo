/**
 * Created by taox on 15-4-27.
 */

'use strict';

var demoApp = angular.module('demoApp', [
  'ngRoute',
  'demoControllers',
  'ngCookies'
]);
demoApp.config(['$routeProvider',
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
]);