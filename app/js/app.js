/**
 * @fileOverview app.js
 * @author taox
 * @version 0.1
 */

'use strict';

angular.module('demoApp', [
  'ngRoute',
  'demoControllers',
  'demoDirectives',
  'ngCookies'
]).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/login',{
      templateUrl:'demo/login.html',
      controller:'LoginCtrl'
    }).otherwise({
      redirectTo:'/login'
    });
  }
]);