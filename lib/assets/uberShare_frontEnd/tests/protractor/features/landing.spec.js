describe('user landing page', function() {

  it('user can sign up', function() {
    browser.get('http://localhost:3000')
    element(by.css('#signup-switch')).click();
    element(by.model('user.email')).sendKeys('test8888@test.com');
    element(by.model('user.username')).sendKeys('Test8888');
    element(by.model('user.password')).sendKeys('testtest');
    element(by.model('user.password_conf')).sendKeys('testtest');
    element(by.css('.btn.btn-primary')).click();
    expect(element(by.id("test")).getText()).toEqual('Find a share');
  });

  it('user can log in', function() {
    browser.get('http://localhost:3000');
    element(by.model('email')).sendKeys('test7777@test.com');
    element(by.model('password')).sendKeys('testtest');
    element(by.css('.btn.btn-primary')).click();
    expect(element(by.id("test")).getText()).toEqual('Find a share');
  });

  it('user cannot log in with wrong password', function() {
    browser.get('http://localhost:3000');
    element(by.model('email')).sendKeys('test7777@test.com');
    element(by.model('password')).sendKeys('wrongpassword');
    element(by.css('.btn.btn-primary')).click();
    expect(element(by.id("login_header")).getText()).toEqual('Login')
  });

  it('user can logout', function() {
    browser.get('http://localhost:3000');
    element(by.model('email')).sendKeys('test7777@test.com');
    element(by.model('password')).sendKeys('testtest');
    element(by.css('.btn.btn-primary')).click();
    element(by.css('#logout')).click();
    expect(element(by.id("login_header")).getText()).toEqual('Login')
  });

  it('user cannot sign up with an existing email', function() {
    browser.get('http://localhost:3000')
    element(by.css('#signup-switch')).click();
    element(by.model('user.email')).sendKeys('test7777@test.com');
    element(by.model('user.username')).sendKeys('Test8888');
    element(by.model('user.password')).sendKeys('testtest');
    element(by.model('user.password_conf')).sendKeys('testtest');
    element(by.css('.btn.btn-primary')).click();
    expect(element(by.id("signup_header")).getText()).toEqual('Register')
  });

  it('user can send a message to another user', function() {
    browser.get('http://localhost:3000');
    element(by.model('email')).sendKeys('test7777@test.com');
    element(by.model('password')).sendKeys('testtest');
    element(by.css('.btn.btn-primary')).click();
    element(by.css('#toggle')).click();
    element(by.css('#menu')).click();
    element(by.css('#messages')).click();
    element(by.css('#new-msg')).click();
    element(by.model('inviteBody')).sendKeys('Wanna share');
    element(by.model('recipient')).sendKeys('Test8888');
    expect(element(by.css('.btn.btn-primary'))).isDisplayed();
    expect(element(by.css('.btn.btn-primary'))).isEnabled();
  });

  it('user can send a message to another user', function() {
    browser.get('http://localhost:3000');
    element(by.model('email')).sendKeys('test8888@test.com');
    element(by.model('password')).sendKeys('testtest');
    element(by.css('.btn.btn-primary')).click();
    expect(element(by.className("alert-info")).getText()).toEqual('You have a new Message!')
  });

});
