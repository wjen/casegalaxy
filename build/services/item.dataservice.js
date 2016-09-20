(function() {
  "use strict";

  angular
    .module("caseGalaxy")
    .factory("itemDataService", itemDataService);

  itemDataService.$inject = ['$http'];

  function itemDataService($http) {
    var itemFactory = {
      item: {}
    };

    // get a single item
    itemFactory.get = function(id) {
      return $http.get('/api/items/' + id);
    };

    // get all items
    itemFactory.all = function() {
      return $http.get('/api/items/');
    };

    // create a item
    itemFactory.create = function(itemData) {
      return $http.post('/api/items/', itemData);
    };

    // update a item
    itemFactory.update = function(id, itemData) {
      return $http.put('/api/items/' + id, itemData);
    };

    // delete a item
    itemFactory.delete = function(id) {
      return $http.delete('/api/items/' + id);
    };



    // return our entire itemFactory object
    return itemFactory;
  }

})();
