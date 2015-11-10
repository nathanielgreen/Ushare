if (Meteor.isClient) {

  Meteor.startup(function() {
    Geolocation.error();
    userNotifications = new Mongo.Collection('userNotifications');
  });


  Template.userProfile.helpers({
    foo: function () {
      putPostCounter = 0;
      latLng = Geolocation.latLng();
      console.log(latLng);
      setTimeout(function () {
        map = L.map('map').setView([latLng.lat, latLng.lng], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'nathanielgreen.o2pefhj4',
            accessToken: 'pk.eyJ1IjoibmF0aGFuaWVsZ3JlZW4iLCJhIjoiY2lna3dmaXBvMDA3bHdlbTQ4bW05aHQ2ciJ9.PYKrjx24Ye5akPcNdbrwVw'
        }).addTo(map);
        var marker = L.marker([latLng.lat, latLng.lng]).addTo(map);
      }, 1000);
    },
  });

  myApp = angular.module('uberShare-app', ['angular-meteor', 'ui.router', 'ngCookies', 'validation.match']);

  myApp.config(['$stateProvider', '$urlRouterProvider',
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
          })
          .state('userUniqueProfile', {
            url: "/",
            template: UiRouter.template('userUniqueProfile')
          })
          .state('userMessages', {
            url: "/",
            template: UiRouter.template('userMessages')
          })
          .state('userAccount', {
            url: "/",
            template: UiRouter.template('userAccount')
          })
          .state('userSettings', {
            url: "/",
            template: UiRouter.template('userSettings')
          });
      }
  ]);

  myApp.controller('UserAccess', function($http, $state, $cookies, $scope){
    var self = this;

    self.userSignUp = function(email, password, passwordconf, username) {
    var postData = { 'email': email, 'password': password, 'password_confirmation': passwordconf, 'username': username};
      $http.post('https://u-share.herokuapp.com/users', postData, 'POST').success(function(data) {
        $cookies.put("auth_key", data.auth_key);
        $state.go('profile');
      });
    }; // end of userSignUp

    self.userLogin = function(email, password) {
      var postData = { 'email': email, 'password': password};
      $http.post('https://u-share.herokuapp.com/sessions', postData, 'POST').success(function(data) {
        console.log(data.auth_key);
        $cookies.put("auth_key", data.auth_key);
        $state.go('profile');
      });
    }; // end of userLogin

    self.findMe = function(latLng = Geolocation.latLng()) {
      putPostCounter++;
      if (putPostCounter > 1) {
        var auth = $cookies.get("auth_key")
        var putData = { 'lat': latLng.lat, 'long': latLng.lng, 'lat_end': destinLoc.lat, 'long_end': destinLoc.lng, 'auth_key': auth };
          $http.put('https://u-share.herokuapp.com/coordinates', putData, 'PUT').success(function(data) {
            $state.go('profile');
            console.log(data);
            for (item = 0; item<= data.length-2; item++) {
              console.log(data);
              console.log(data[item].lat);
              console.log(data[item].long);
              console.log("end lat" + data[item].lat_end);
              console.log("end lng" + data[item].long_end);
              L.marker([data[item].lat, data[item].long]).addTo(map);
              L.marker([data[item].lat_end, data[item].long_end]).addTo(map);
              var otherUserLoc = new L.latLng(data[item].lat, data[item].long);
              var otherDestinLoc = new L.latLng(data[item].lat_end, data[item].long_end);
              var otherPath = [otherUserLoc, otherDestinLoc]
              var otherPolyLine = new L.polyline(otherPath, {
                color: 'blue',
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
              });
              otherPolyLine.addTo(map);
            }; // end of for loop
          }); // end of post request
      } // end of if
      else {
        var auth = $cookies.get("auth_key")
        var postData = { 'lat': latLng.lat, 'long': latLng.lng, 'lat_end': destinLoc.lat, 'long_end': destinLoc.lng, 'auth_key': auth };
          $http.post('https://u-share.herokuapp.com/coordinates', postData, 'POST').success(function(data) {
            $state.go('profile');
            console.log(data);
            for (item = 0; item<= data.length-2; item++) {
              console.log(data);
              console.log(data[item].lat);
              console.log(data[item].long);
              console.log("end lat" + data[item].lat_end);
              console.log("end lng" + data[item].long_end);
              L.marker([data[item].lat, data[item].long]).addTo(map);
              L.marker([data[item].lat_end, data[item].long_end]).addTo(map);
              var otherUserLoc = new L.latLng(data[item].lat, data[item].long);
              var otherDestinLoc = new L.latLng(data[item].lat_end, data[item].long_end);
              var otherPath = [otherUserLoc, otherDestinLoc]
              var otherPolyLine = new L.polyline(otherPath, {
                color: 'blue',
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
              });
              otherPolyLine.addTo(map);
            }; // end of for loop
          }); // end of post request
      }; // end of else
    }; // end of findMe

    self.chooseDestin = function(userInput) {
      if (typeof(destinMarker) != "undefined") {
        map.removeLayer(destinMarker)
        map.removeLayer(userPolyLine)
      };

        var connectedLink =
          "https://maps.googleapis.com/maps/api/geocode/json?address="
          + userInput
          + apiKey;

        $.getJSON(connectedLink, function(json){
          myjson = json;
          var jsonLat = JSON.stringify(myjson.results[0].geometry.location.lat);
          var jsonLng = JSON.stringify(myjson.results[0].geometry.location.lng);
          var userLoc = new L.latLng(latLng.lat,latLng.lng);
          destinLoc = new L.LatLng(jsonLat,jsonLng);
          destinMarker = L.marker([jsonLat,jsonLng]).addTo(map);
          var userPath = [userLoc, destinLoc];
          userPolyLine = new L.polyline(userPath, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
          });
          userPolyLine.addTo(map);
        }); // end of getJSON

    }; // end of chooseDestin

  }); // end of angular.module


  myApp.directive('pwCheck', [function() {
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
    userNotifications = new Mongo.Collection('userNotifications');
  });
}
