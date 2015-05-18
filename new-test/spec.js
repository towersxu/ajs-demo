/**
 * Created by taox on 15-5-18.
 */
describe('Protractor Demo App',function(){
  it('should have a title',function(){
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
  })
});