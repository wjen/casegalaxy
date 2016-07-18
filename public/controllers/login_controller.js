(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .controller("LoginController", LoginController);

  LoginController.$inject = [];

  function LoginController() {
    var vm = this;

    // vm.login      = login;
    // vm.isLoggedIn = authService.isLoggedIn;
    // vm.currentUser = userDataService.user;

    // // Form data for login
    // vm.loginData;

    // function login() {
    //   authService.login(vm.loginData.phoneNumber, vm.loginData.password)
    //     .then(function(res) {
    //       $log.log(res.data);
    //       $state.go('triumphs');
    //     });
    // };

  }

})();
