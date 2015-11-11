describe('user landing page', function() {

  it ('validates login input', function() {
    browser.get('http://localhost:3000');
    element(by.id('login_button')).click();
    var item = $('.container #login_header');
    expect(item.getText()).toBe('Login');
  });

  it ('validates signup input', function() {
    browser.get('http://localhost:3000');
    element(by.css('#signup-switch')).click();
    var item = $('#signup_button');
    expect(item.getText()).toBe('Register');
  });

  it('user can login in', function() {
    browser.get('http://localhost:3000')
    element(by.css('#signup-switch')).click();
    element(by.model('user.model')).sendKeys('test@test.com')
  });

});
