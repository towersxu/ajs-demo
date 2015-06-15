'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */



describe('SSO server',function(){
  describe('Register page', function() {

    beforeEach(function() {
      browser.get('app/index.html#/register');
    });


    it('should display Email address', function() {
      expect(element(by.css('.form-group')).getText()).toBe('Email address');
    });


    it('should not has class has-error',function() {
      expect(element(by.id('exampleInputEmail1')).getAttribute('class').toBe('form-group has-error'));
    });

    //it('should display the first phone image as the main phone image', function() {
    //  expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    //});
    //
    //
    //it('should swap main image if a thumbnail image is clicked on', function() {
    //  element(by.css('.phone-thumbs li:nth-child(3) img')).click();
    //  expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);
    //
    //  element(by.css('.phone-thumbs li:nth-child(1) img')).click();
    //  expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    //});
  });
});