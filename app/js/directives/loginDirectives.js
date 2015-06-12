/**
 * Created by taox on 15-6-12.
 */
angular.module('loginDirectives', []).directive('register',function(){
  return {
    replace:true,
    restrict:'E',
    templateUrl: '../../demo/register.html'
  };
});