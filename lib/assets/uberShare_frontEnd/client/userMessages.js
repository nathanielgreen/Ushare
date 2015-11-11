if(Meteor.isClient) {

  Template.body.events({
    'click #reply-msg': function() {
      $(".reply-box").slideToggle({direction: 'right'});
    }
  });

  Template.body.events({
    'click #new-msg': function() {
      $("#new-msg-box").slideToggle({direction: 'right'});
    }
  });

}