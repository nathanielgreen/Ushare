describe("layout", function(){
  describe("user sign up page", function(){

    it("shows 'UShare' heading", function(){
      expect($('h1').text()).toEqual('Ushare.');
    });

    it("shows the correct browser title", function() {
      expect($('title').text()).toEqual('Ushare | Share your ride')
    });

    it("has a user log in form", function() {
      expect('.col-md-6').toExist();
    });

    it ("has a link to signup", function() {
      expect('#signup-switch').toExist();
    });

    it ("has a Login button", function() {
      expect('button.btn-primary').toExist();
    });

  });
});
