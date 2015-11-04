describe('user landing page', function() {
  
  browser.driver.manage().window().maximize();
  
  it ('should stop users from proceeding without logging in', function() {
    browser.get('http://localhost:3000');
    element(by.id('login_button')).click();
    var item = $('.container #login_header');
    expect(item.getText()).toBe('Login');
  });

  it ('should stop users from proceeding without logging in', function() {
    browser.get('http://localhost:3000');
    element(by.css('.container #login_header')).click();
    var item = $('.container .form-actions #signup-switch');
    expect(item.getText()).toBe('Register');
  });

});
