(function() {
  "use strict";

  angular.module("caseGalaxy")
    .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "$uibModal"];

  function MainController($state, userDataService, $log, authService, $uibModal) {
    var mainCtrl = this;
    mainCtrl.userService = userDataService;
    mainCtrl.logout      = authService.logout;
    mainCtrl.isLoggedIn  = authService.isLoggedIn;

    mainCtrl.$state = $state;
    //uibModal is injected and called as a ui bootstrap method
    mainCtrl.open = function() {
     var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'templates/login.html',
         controller: 'LoginController as loginCtrl'
     });
    };

    mainCtrl.openSignUp = function() {
     var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'templates/signup.html',
         controller: 'UsersController as userCtrl'
     });
    };

    mainCtrl.hello = "hello";
  };

})();
