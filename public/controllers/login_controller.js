(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "userDataService", "$log", "authService", "$uibModalInstance"];

  function LoginController($state, userDataService, $log, authService, $uibModalInstance) {
    var vm = this;

    vm.login      = login;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.currentUser = userDataService.user;

    vm.close = function () {
      $uibModalInstance.close();
    };

    // Form data for login
    vm.loginData;

    function login() {
      authService.login(vm.loginData.email, vm.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          $uibModalInstance.close();
          $state.go('homePage');
        });
    };

  }

})();
