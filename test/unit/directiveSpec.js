/**
 * Created by taox on 15-6-15.
 */
describe('Directive unit test',function(){
  //beforeEach(module('demoApp'));
  beforeEach(module('demoDirectives'));
  describe('header directive',function(){
    var rootScope,compile;
    //beforeEach(module('demo/header.html'));
    beforeEach(inject(function(_$compile_,_$rootScope_){
      compile = _$compile_;
      rootScope = _$rootScope_;
    }));

    it('replace the header with navigation',function(){
      //var elem = "<div header class=\"navbar navbar-inverse\" ng-controller=\"NavDirectiveCtrl\"></div>";
      //var header = compile(elem)(rootScope);
      rootScope.$digest();
    });
  })
});