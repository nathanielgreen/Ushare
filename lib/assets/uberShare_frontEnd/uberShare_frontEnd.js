if (Meteor.isClient) {

  Users = new Mongo.Collection('users');
  Invites = new Mongo.Collection('invites');

  Meteor.startup(function() {
    Geolocation.error();
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
        var userStartIcon = L.icon({
            iconUrl: 'http://i.imgur.com/k4fijop.png',
            iconSize:     [40, 40], // size of the icon
            iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
        });
        var marker = L.marker([latLng.lat, latLng.lng], {icon: userStartIcon}).addTo(map)
                .bindPopup(
                    "<div style='width:100px; height:100px;'>Testing</div>"
                    );
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
    var otherStartIcon = L.icon({
        iconUrl: 'http://i.imgur.com/KzDiARA.png',
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
    });
    var endIcon = L.icon({
        iconUrl: 'http://i.imgur.com/h2FmEfF.png',
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [11, 34], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
    }); 

    self.userSignUp = function(email, password, passwordconf, username) {
    var postData = { 'email': email, 'password': password, 'password_confirmation': passwordconf, 'username': username};
      $http.post('https://u-share.herokuapp.com/users', postData, 'POST').success(function(data) {
        $cookies.put("auth_key", data.auth_key);
        $cookies.put("username", username);
        $cookies.put("user_id", data.user_id);
        $state.go('profile');
        Users.insert({
          'username': username,
          'user_id': $cookies.get('user_id')
        });
      });
    }; // end of userSignUp

    self.userLogin = function(email, password) {
      var postData = { 'email': email, 'password': password};
      $http.post('https://u-share.herokuapp.com/sessions', postData, 'POST').success(function(data) {
        $cookies.put("user_id", data.user_id);
        $cookies.put("username", data.username);
        $cookies.put("auth_key", data.auth_key);
        $state.go('profile');
      });
    }; // end of userLogin

    self.userLogout = function(){

      var auth = $cookies.get("auth_key");
      console.log(auth);
      var putData = { 'auth_key': auth };
      $http.post('https://u-share.herokuapp.com/logout', putData, 'POST').success(function(data) {
        console.log("logged out");
        $state.go('userLogin')
      });
    }; // end of userLogout

    self.findOthers = function(latLng = Geolocation.latLng()) {
      if (typeof(otherUserMarker) != "undefined") {
        map.removeLayer(otherUserMarker);
        map.removeLayer(otherDestinMarker);
        map.removeLayer(otherPolyLine);
        console.log("well that is fucking undefinied isnt it");
      };
      putPostCounter++;
      if (putPostCounter > 1) {
        var auth = $cookies.get("auth_key")
        var putData = { 'lat': latLng.lat, 'long': latLng.lng, 'lat_end': destinLoc.lat, 'long_end': destinLoc.lng, 'auth_key': auth };
          $http.put('https://u-share.herokuapp.com/coordinates', putData, 'PUT').success(function(data) {
            $state.go('profile');
            console.log(data);
            for (item = 0; item<= data.length-2; item++) {
              if (data[item].lat == "null") {
                console.log("that one was null because the user is logged out");
              }
              else {
              console.log(data);
              console.log(data[item].lat);
              console.log(data[item].long);
              console.log("end lat" + data[item].lat_end);
              console.log("end lng" + data[item].long_end);
              var otherUserMarker = L.marker([data[item].lat, data[item].long], {icon: otherStartIcon}).addTo(map)
                .bindPopup('This is the startpoint of: ' + data[item].username).openPopup();
              var otherDestinMarker = L.marker([data[item].lat_end, data[item].long_end], {icon: endIcon}).addTo(map)
                .bindPopup('This is the destination of: ' + data[item].username).openPopup();
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
              }
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
              if (data[item].lat == "null") {
                console.log("that one was null because the user is logged out");
              }
              else {
              console.log(data);
              console.log(data[item].lat);
              console.log(data[item].long);
              console.log("end lat" + data[item].lat_end);
              console.log("end lng" + data[item].long_end);
              var otherUserMarker = L.marker([data[item].lat, data[item].long], {icon: otherStartIcon}).addTo(map)
                .bindPopup('This is the startpoint of: ' + data[item].username).openPopup();
              var otherDestinMarker = L.marker([data[item].lat_end, data[item].long_end], {icon: endIcon}).addTo(map)
                .bindPopup('This is the destination of: ' + data[item].username).openPopup();
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
              }
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
          destinMarker = L.marker([jsonLat,jsonLng], { icon: endIcon }).addTo(map)
                .bindPopup('This is your destination').openPopup();
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

  myApp.controller("notificationsCtrl", ['$scope', '$meteor', '$cookies',
    function($scope, $meteor, $cookies) {
      var user = $cookies.get('username');
      $scope.newMessages = Invites.find({to: user, unread: true}).fetch().length > 0
  }]);

  myApp.controller('sendInviteCtrl', function($scope, $meteor, $cookies) {
    var self = this;
    self.submitInvite = function(inviteBody, recipient) {
      Invites.insert({
        'from': $cookies.get('username'),
        'to': recipient,
        'body': inviteBody,
        'date': new Date(),
        'unread': true
      });
    };

  });

  myApp.controller('messageBoardCtrl', function($scope, $meteor, $cookies) {
    var self = this;
    var user = $cookies.get('username');
    self.messages = Invites.find({to: user}).fetch();
    self.userList = Invites.find().fetch()
    // self.messages = $meteor.collection(Invites)
  })

  // myApp.controller('messageBoardCtrl', ['$scope', '$meteor', '$cookies',
  //   function($scope, $meteor, $cookies) {
  //     var user = $cookies.get('username');
  //     $scope.messages = Invites.find({to: user}).fetch()
  // }]);

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Users = new Mongo.Collection('users');
    Invites = new Mongo.Collection('invites');
  });
}
