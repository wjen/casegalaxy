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

    //collapse feature from ang-ui bootstrap
    function CollapseController() {
      vm.isCollapsed = false;
    };


  };

})();
