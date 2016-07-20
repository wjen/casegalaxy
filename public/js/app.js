(function () {
  'use strict';

  angular.module('caseGalaxy', ["ui.router", "ui.bootstrap"])
    .config(function($httpProvider) {

      // attach our auth interceptor to the http requests
      $httpProvider.interceptors.push('authInterceptor');
    })

    .run(['authService', function(authService){
      if (authService.isLoggedIn()) authService.setUser();
    }]);

})();


