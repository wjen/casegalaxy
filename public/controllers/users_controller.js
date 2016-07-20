(function() {

  angular.module("caseGalaxy")
         .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$uibModalInstance"];

  function UsersController($state, authService, authToken, userDataService, $log, $uibModalInstance) {
    var vm = this;

    vm.currentUser = userDataService.user;
    // attaching functions to controller
    vm.createUser = createUser;


    // defining function declarations
    function createUser() {
      vm.message = '';
      // use the create function in the userService
      userDataService.create(vm.userData)
        .success(function(data) {
          authToken.setToken(data.token);
          // set userDataService.user to the logged in user
          userDataService.user = data.user;
          vm.userData = data.user;
          vm.message = data.message;
          console.log(vm.message);
          $uibModalInstance.close();
        });

        $state.go('homePage');
    };
  };
})();
