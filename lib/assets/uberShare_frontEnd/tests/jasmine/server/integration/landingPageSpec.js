wdio = Package['xolvio:webdriver'].wdio

beforeAll(function (done) {
  var self = this;
  wdio.getGhostDriver(function (browser) {
    self.browser = browser;
    done();
  });
});

describe('Browser testing', function() {
  it('should have the correct title', function (done) {
    this.browser
      .init()
      .url('http://localhost:3000')
      .title(function(err, res) {
        console.log('Title was: ' + res.value);
        expect(res.value).toBe('UberShare | Share your ride');
      })
      .end()
      .call(done);
  });
});