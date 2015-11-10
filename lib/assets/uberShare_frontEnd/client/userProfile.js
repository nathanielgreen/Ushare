if (Meteor.isClient) {

  Meteor.startup.function() {
  }

  Template.body.events({
      'click .toggle': function() {
        $(".menu").slideToggle();
      }
  });

  Template.body.events({
    'click .sendNotification': function() {
      userNotifications.insert({ name: "Bob", score: 0 });
      userNotifications.find().fetch();
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
