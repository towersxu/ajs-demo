/**
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
