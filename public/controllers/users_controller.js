(function() {

  angular.module("caseGalaxy")
         .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$uibModalInstance"];

  function UsersController($state, authService, authToken, userDataService, $log, $uibModalInstance) {
    var userCtrl = this;

    userCtrl.currentUser = userDataService.user;
    // attaching functions to controller
    userCtrl.createUser = createUser;


    // defining function declarations
    function createUser() {
      userCtrl.message = '';
      // use the create function in the userService
      userDataService.create(userCtrl.userData)
        .success(function(data) {
          authToken.setToken(data.token);
          // set userDataService.user to the logged in user
          userDataService.user = data.user;
          userCtrl.userData = data.user;
          userCtrl.message = data.message;
          console.log(userCtrl.message);
          $uibModalInstance.close();
        });

        $state.go('homePage');
    };

    userCtrl.close = function () {
      $uibModalInstance.close();
    };
  };
})();
