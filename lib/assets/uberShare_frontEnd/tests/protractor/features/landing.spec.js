describe('user landing page', function() {

  // it ('validates login input', function() {
  //   browser.get('http://localhost:3000');
  //   element(by.id('login_button')).click();
  //   var item = $('.container #login_header');
  //   expect(item.getText()).toBe('Login');
  // });
  //
  // it ('validates signup input', function() {
  //   browser.get('http://localhost:3000');
  //   element(by.css('#signup-switch')).click();
  //   var item = $('#signup_button');
  //   expect(item.getText()).toBe('Register');
  // });

  it('user can sign up', function() {
    browser.get('http://localhost:3000')
    element(by.css('#signup-switch')).click();
    element(by.model('user.email')).sendKeys('test5555@test.com')
    element(by.model('user.username')).sendKeys('Test')
    element(by.model('user.password')).sendKeys('testtest')
    element(by.model('user.password_conf')).sendKeys('testtest')
    element(by.css('.btn.btn-primary')).click();


    expect(element(by.id("test")).getText()).toEqual('Find a share')

  });

  it('user can log in', function() {
    browser.get('http://localhost:3000');
    element(by.model('email')).sendKeys('test5555@test.com');
    element(by.model('password')).sendKeys('testtest');
    element(by.css('.btn')).click();
    expect(element(by.id("test")).getText()).toEqual('Find a share');
  });

});
