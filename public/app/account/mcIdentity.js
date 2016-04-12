angular.module('app').factory('mcIdentity', function($window, mcUser) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    currentUser = new mcUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})