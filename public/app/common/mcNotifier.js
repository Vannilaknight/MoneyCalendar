angular.module('app').value('mcToastr', toastr);

angular.module('app').factory('mcNotifier', function(mcToastr) {
  return {
    notify: function(msg) {
      mcToastr.success(msg);
      console.log(msg);
    }
  }
})