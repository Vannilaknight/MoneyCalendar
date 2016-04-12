angular.module('app').controller('mcProfileCtrl', function($scope, mvAuth, mcIdentity, mcNotifier) {
  $scope.email = mcIdentity.currentUser.username;
  $scope.fname = mcIdentity.currentUser.firstName;
  $scope.lname = mcIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    mvAuth.updateCurrentUser(newUserData).then(function() {
      mcNotifier.notify('Your user account has been updated');
    }, function(reason) {
      mcNotifier.error(reason);
    })
  }
})