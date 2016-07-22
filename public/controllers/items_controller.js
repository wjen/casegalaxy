(function() {
  "use strict";

  angular
      .module("caseGalaxy")
      .controller("ItemsController", ItemsController);

  ItemsController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$http", "itemDataService"];

  function ItemsController($state, authService, authToken, userDataService, $log, $http, itemDataService) {
    var vm = this;
    vm.items = [];

    vm.getItems      = getItems;
    vm.deleteItem    = deleteItem;
    // vm.updateFish    = updateFish;
    // vm.postFish      = postFish;
    // vm.resetEditForm = resetEditForm;
    vm.currentItem = itemDataService.item
    vm.getItems();


    function getUnique(arr, field) {
      var obj = {};
      arr.forEach(function(e){
        obj[e[field]] = true;
      });
      return Object.keys(obj).sort();
    };

    function getItems() {
      itemDataService.all().then(function(response) {
        vm.items = response.data;
        vm.uniqueMans = getUnique(vm.items, 'manufacturer');
        vm.uniqueColors = getUnique(vm.items, 'color').filter(function(color) {
          return color !== 'undefined';
        });
        vm.uniqueType = getUnique(vm.items, 'type');
        vm.uniquePhoneModels = getUnique(vm.items, "phoneModel");
        vm.uniquePrices = getUnique(vm.items, "price");

        // vm.uniqueColor = getUnique(vm.items,"color");
        console.log(response.data);
      }, function(errRes) {
        console.error('Error retrieving item!', errRes);
      });
    }

    function deleteItem(id) {
      itemDataService.delete(id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deleting Item!', errRes);
      }).then(getItems);
    }

  }

})();
