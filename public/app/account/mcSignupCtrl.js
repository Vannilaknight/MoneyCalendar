angular.module('app').controller('mcSignupCtrl', function($scope, mcUser, mcNotifier, $location, mcAuth) {

  $scope.signup = function() {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    mcAuth.createUser(newUserData).then(function() {
      mcNotifier.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      mcNotifier.error(reason);
    })
  }
})