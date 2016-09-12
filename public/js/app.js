(function () {
  'use strict';

  angular.module('caseGalaxy', ["ui.router", "ngAnimate", "ui.bootstrap", "ngCart"])
    .config(function($httpProvider) {

      // attach our auth interceptor to the http requests
      $httpProvider.interceptors.push('authInterceptor');
    })

    .run(['authService', function(authService){
      if (authService.isLoggedIn()) authService.setUser();
    }])



    .controller ('CCartController', ['$scope', '$http', 'ngCart', function($scope, $http, ngCart) {
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
}]);


})();


