if(Meteor.isClient) {

  Template.body.events({
      'click .btn.btn-primary': function() {
        $(".reply-box").slideToggle({direction: 'right'});
      }
  });

}