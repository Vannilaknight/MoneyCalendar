angular.module('app').factory('mcAuth', function($http, mcIdentity, $q, mcUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new mcUser();
          angular.extend(user, response.data.user);
          mcIdentity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },

    createUser: function(newUserData) {
      var newUser = new mcUser(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        mcIdentity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(mcIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        mcIdentity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        mcIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(mcIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    },
    authorizeAuthenticatedUserForRoute: function() {
      if(mcIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});