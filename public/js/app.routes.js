(function () {
  'use strict'

  angular.module("caseGalaxy")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/home.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl:  "/templates/about.html"
      })
      .state("signUpPage", {
        url: "/signup",
        templateUrl: "/templates/signup.html",
        controller: "UsersController",
        controllerAs: "vm"
      });
      // .state("triumphs", {
      //   url: "/triumphs",
      //   templateUrl: "/templates/triumphs.html",
      //   controller: "TriumphsController",
      //   controllerAs: "vm"
      // });

    $urlRouterProvider.otherwise("/");
  }

})();
