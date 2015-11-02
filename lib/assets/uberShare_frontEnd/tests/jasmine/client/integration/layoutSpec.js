describe("layout", function(){
  describe("user sign up page", function(){
    it("shows 'uberShare' heading", function(){
      expect($('h1').text()).toEqual('UberShare');
    });
  });
});