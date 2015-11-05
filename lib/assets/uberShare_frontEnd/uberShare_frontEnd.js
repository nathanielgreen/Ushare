if (Meteor.isClient) {

  Meteor.startup(function() {
    console.log("startup worked");
    Geolocation.error();
  });


  Template.userProfile.helpers({
    foo: function () {
      console.log("onCreated working");
      var latLng = Geolocation.latLng();
      console.log(latLng);
      setTimeout(function () {
        var map = L.map('map').setView([latLng.lat, latLng.lng], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'nathanielgreen.o2pefhj4',
            accessToken: 'pk.eyJ1IjoibmF0aGFuaWVsZ3JlZW4iLCJhIjoiY2lna3dmaXBvMDA3bHdlbTQ4bW05aHQ2ciJ9.PYKrjx24Ye5akPcNdbrwVw'
        }).addTo(map);
        var marker = L.marker([latLng.lat, latLng.lng]).addTo(map);
      }, 1000);
    },
  });

  Template.userProfile.events({
    burgerbar: function(event, template) {
      template.$("toggle").click(function() {
        $(".menu").slideToggle();
      })
    }
  });


  angular.module('uberShare-app', ['angular-meteor', 'ui.router', 'ngCookies', 'validation.match']);

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
            template: UiRouter.template('userProfile')
          });

      }
  ]);

  angular.module('uberShare-app').controller('UserAccess', function($http, $state, $cookies, $scope){
    var self = this;

    self.userSignUp = function(email, password, passwordconf) {
    var postData = { 'email': email, 'password': password, 'password_confirmation': passwordconf};
      $http.post('https://intense-escarpment-2866.herokuapp.com/users', postData, 'POST').success(function(data) {
        $cookies.put("auth_key", data.auth_key);
        $state.go('profile');
      });
    };

    self.userLogin = function(email, password) {
      var postData = { 'email': email, 'password': password};
      $http.post('https://intense-escarpment-2866.herokuapp.com/sessions', postData, 'POST').success(function(data) {
        console.log(data.auth_key);
        $cookies.put("auth_key", data.auth_key);
        $state.go('profile');
      });
    }

  });

  angular.module('uberShare-app').directive('pwCheck', [function() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
  }]);

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
