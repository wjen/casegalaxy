(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "userDataService", "$log", "authService", "$uibModalInstance"];

  function LoginController($state, userDataService, $log, authService, $uibModalInstance) {
    var loginCtrl = this;

    loginCtrl.login      = login;
    loginCtrl.isLoggedIn = authService.isLoggedIn;
    loginCtrl.currentUser = userDataService.user;

    loginCtrl.close = function () {
      $uibModalInstance.close();
    };

    // Form data for login
    loginCtrl.loginData;

    function login() {
      authService.login(loginCtrl.loginData.email, loginCtrl.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          $uibModalInstance.close();
          $state.go('homePage');
        });
    };

  }

})();
