(function() {
  "use strict";

  angular
      .module("caseGalaxy")
      .controller("ItemsController", ItemsController);

  ItemsController.$inject = ['$state', 'authService', 'authToken', 'userDataService', '$log', "$http", "itemDataService"];

  function ItemsController($state, authService, authToken, userDataService, $log, $http, itemDataService) {
    var itemCtrl = this;
    itemCtrl.items = [];

    itemCtrl.getItems      = getItems;
    itemCtrl.deleteItem    = deleteItem;
    itemCtrl.updateItem   = updateItem;
    itemCtrl.postItem     = postItem;
    itemCtrl.resetEditForm = resetEditForm;
    itemCtrl.currentItem = itemDataService.item;
    itemCtrl.getItems();

    itemCtrl.newItem = {
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
        itemCtrl.items = response.data;
        // console.log(itemCtrl.items[0]);
        itemCtrl.uniqueMans = getUnique(itemCtrl.items, 'manufacturer');
        itemCtrl.uniqueColors = getUnique(itemCtrl.items, 'color').filter(function(color) {
          return color !== 'undefined';
        });
        itemCtrl.uniqueType = getUnique(itemCtrl.items, 'type');
        itemCtrl.uniquePhoneModels = getUnique(itemCtrl.items, "phoneModel");
        itemCtrl.uniquePrices = getUnique(itemCtrl.items, "price");
        // itemCtrl.phoneModelSelect = itemCtrl.items[0].phoneModel;
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
      $http.post('/api/items', itemCtrl.newItem)
        .then(getItems)
        .then(function(response) {
          itemCtrl.newItem.picture = "";
        });
    }

    function updateItem(id) {
      $http.put('/api/items/' + id, itemCtrl.editItem)
        .then(function(response) {
          itemCtrl.editItem = {
            model: "",
            manufacturer: "",
            price: ""
          };
        }, function(errRes) {
          console.log("Error updating Item", errRes);
        }).then(getItems);
    }

    function resetEditForm() {
      itemCtrl.editItem = {
        model: "",
        manufacturer: "",
        price: ""
      };
    }


  }

})();
