exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./features/*.spec.js'],  
  onPrepare: function() {
    browser.manage().window().setSize(1600, 1000);
  }
}