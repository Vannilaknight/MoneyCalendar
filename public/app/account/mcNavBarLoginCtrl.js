angular.module('app').controller('mcNavBarLoginCtrl', function($scope, $http, mcIdentity, mcNotifier, mcAuth, $location) {
  $scope.identity = mcIdentity;
  $scope.signin = function(username, password) {
    mcAuth.authenticateUser(username, password).then(function(success) {
      if(success) {
        mcNotifier.notify('You have successfully signed in!');
      } else {
        mcNotifier.notify('Username/Password combination incorrect');
      }
    });
  }

  $scope.signout = function() {
    mcAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      mcNotifier.notify('You have successfully signed out!');
      $location.path('/');
    })
  }
});