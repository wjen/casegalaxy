(function() {
  "use strict";

  angular
      .module("caseGalaxy")
      .controller("ItemsController", ItemsController);

  ItemsController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$http", "itemDataService"];

  function ItemsController($state, authService, authToken, userDataService, $log, $http, itemDataService) {
    var vm = this;
    // vm.items = [];

    vm.getItems      = getItems;
    // vm.deleteFish    = deleteFish;
    // vm.updateFish    = updateFish;
    // vm.postFish      = postFish;
    // vm.resetEditForm = resetEditForm;
    vm.currentItem = itemDataService.item
    vm.getItems();


    // vm.cities = getUnique(vm.items, 'manufacturer')
    // function getUnique(arr, field) {
    //   var obj = {};
    //   arr.forEach(function(e){
    //     obj[e[field]] = true;
    //   });
    //   return Object.keys(obj).sort();
    // };

    function getItems() {
      itemDataService.all().then(function(response) {
        vm.items = response.data;
        // vm.uniqueMans = getUnique(vm.items, 'manufacturer');
        console.log(response.data);
      }, function(errRes) {
        console.error('Error retrieving item!', errRes);
      });
    }


  }

})();
