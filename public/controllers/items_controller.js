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
    vm.updateItem   = updateItem;
    vm.postItem     = postItem;
    // vm.resetEditForm = resetEditForm;
    vm.currentItem = itemDataService.item;
    vm.getItems();

    vm.newItem = {
      category: "",
      phoneModel: "",
      manufacturer: "",
      type: "",
      color: "",
      price: "",
      picture: "",
    }

    // Object.keys returns the unique keys of each item in array
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
        // console.log(vm.items[0]);
        vm.uniqueMans = getUnique(vm.items, 'manufacturer');
        vm.uniqueColors = getUnique(vm.items, 'color').filter(function(color) {
          return color !== 'undefined';
        });
        vm.uniqueType = getUnique(vm.items, 'type');
        vm.uniquePhoneModels = getUnique(vm.items, "phoneModel");
        vm.uniquePrices = getUnique(vm.items, "price");
        // vm.phoneModelSelect = vm.items[0].phoneModel;
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

    function postItem() {
      $http.post('/api/items', vm.newItem)
        .then(getItems)
        .then(function(response) {
          vm.newItem.picture = "";
        });
    }

    function updateItem(id) {
      $http.put('/api/items/' + id, vm.editItem)
        .then(function(response) {
          vm.editItem = {
            model: "",
            manufacturer: "",
            price: ""
          };
        }, function(errRes) {
          console.log("Error updating Item", errRes);
        }).then(getItems);
    }


  }

})();
