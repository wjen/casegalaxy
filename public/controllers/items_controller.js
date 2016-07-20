(function() {
  "use strict";

  angular
      .module("caseGalaxy")
      .controller("ItemsController", ItemsController);

  ItemsController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$http"];

  function ItemsController($state, authService, authToken, userDataService, $log, $http) {
    var vm = this;
    vm.items = [];

    vm.newItem = {
      category: "",
      manufacturer: "",
      type: "",
      color: "",
      price: "",
      picture: "",
      phoneModel: ""
    }
    vm.editItem = {
      category: "",
      manufacturer: "",
      type: "",
      color: "",
      price: "",
      picture: "",
      phoneModel: ""
    }

    vm.getItem       = getItem;
    // vm.deleteFish    = deleteFish;
    // vm.updateFish    = updateFish;
    // vm.postFish      = postFish;
    // vm.resetEditForm = resetEditForm;

    vm.getItem();

    function getItem() {
      $http.get('/api/items').then(function(response) {
        vm.items = response.data;
        console.log(response.data);
      }, function(errRes) {
        console.error('Error retrieving item!', errRes);
      });
    }

  }

})();
