exports.config = {
  framework: 'jasmine2',

  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  chromeOnly: false,

  baseUrl: 'http://localhost:8000/',
  onPrepare:function(){
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath:"test/e2e/"
    }));
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
