if (Meteor.isClient) {
 
  angular.module('uberShare-app', ['angular-meteor', 'ui.router', 'ngCookies']);

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
          .state('profile', {
            url: "/",
            template: UiRouter.template('userProfile.html')
          });

      }
  ]);

  angular.module('uberShare-app').controller('UserAccess', function($http, $state, $cookies, $scope){
    var self = this;

    self.userSignUp = function(email, password, passwordconf) {
    var postData = { 'email': email, 'password': password, 'password_confirmation': passwordconf};
      $http.post('https://stormy-falls-9947.herokuapp.com/users', postData, 'POST').then(function() {
        $cookies.getAll();
        $state.go('profile');
      });
    };

    self.userLogin = function(email, password) {
      var postData = { 'email': email, 'password': password};
      $http.post('https://stormy-falls-9947.herokuapp.com/sessions', postData, 'POST').then(function() {
        $state.go('profile');
      });
    }

  });

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
