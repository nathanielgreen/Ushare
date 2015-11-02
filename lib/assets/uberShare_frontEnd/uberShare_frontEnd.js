if (Meteor.isClient) {
 
  angular.module('uberShare-app', ['angular-meteor', 'ui.router']);

  angular.module("uberShare-app").config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise("/");

          $stateProvider
              .state('userLogin', {
                  url: "/",
                  template: UiRouter.template('userLogin.html')
              })
              .state('userSignUp', {
                  url: "/",
                  template: UiRouter.template('userSignUp.html')
              })
              .state('landingPage', {
                url: "/",
                template: UiRouter.template('uberShare_frontEnd.html')
              })
      }
  ]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
