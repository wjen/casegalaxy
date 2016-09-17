(function(){
  'use strict';

  angular.module('caseGalaxy')
    .controller('ShopCartCtrl', ['$scope', 'ngCart', '$http', function ($scope, ngCart, $http) {

    ngCart.setTaxRate(9.5);
    ngCart.setShipping(2.99);

  }]);

})();

