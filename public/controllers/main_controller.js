(function () {
  "use strict";

  angular.module("caseGalaxy")
    .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "$uibModal"];

  function MainController($state, userDataService, $log, authService, $uibModal) {
    var vm = this;
    vm.userService = userDataService;
    vm.logout      = authService.logout;
    vm.isLoggedIn  = authService.isLoggedIn;

    vm.$state = $state;
    //uibModal is injected and called as a ui bootstrap method
    vm.open = function() {
     var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'templates/login.html',
         controller: 'LoginController as vm'
     });
    };
    vm.openSignUp = function() {
     var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'templates/signup.html',
         controller: 'UsersController as vm'
     });
    };

    //collapse feature from ang-ui bootstrap
    function CollapseController() {
      vm.isCollapsed = false;
    };



  };

})();
