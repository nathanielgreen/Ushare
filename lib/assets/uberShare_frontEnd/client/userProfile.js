if (Meteor.isClient) {

    Template.body.events({
        'click .toggle': function() {
          $(".menu").slideToggle();
        }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
