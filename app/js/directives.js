/**
 * Created by taox on 15-4-27.
 */
var demoDirectives = angular.module('demoDirectives', []);
demoDirectives.directive('header', function () {
  return {
    restrict: 'E',
    templateUrl: 'demo/header.html'
    //template: '<div>Hi there</div>',
    //replace: true
  };
});
demoDirectives.controller('NavDirectiveCtrl', ['$rootScope', '$scope', '$cookieStore', '$cookies',
  function ($rootScope, $scope, $cookieStore, $cookies) {
    $rootScope.coxUrl = "http://192.168.1.36:8080";
    var userinfo = $cookieStore.get("userinfo") || $cookies.userinfo || "{}";
    typeof userinfo == "object" ? $rootScope.userinfo = userinfo : $rootScope.userinfo = JSON.parse(userinfo);
    if ($rootScope.userinfo) {
      $scope.isHidden = false;
      $scope.name = $rootScope.userinfo;
    } else {
      $scope.isHidden = true;
    }
  }
]);