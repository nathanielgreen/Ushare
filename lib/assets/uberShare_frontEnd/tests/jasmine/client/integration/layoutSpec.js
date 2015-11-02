describe("layout", function(){
  describe("user sign up page", function(){
    
    it("shows 'UberShare' heading", function(){
      expect($('h1').text()).toEqual('UberShare');
    });

    it("shows the correct browser title", function() {
      expect($('title').text()).toEqual('UberShare | Share your ride')
    });

    it("has a user log in form", function() {
      expect('.col-md-6').toExist();
    });

  });
});