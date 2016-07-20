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
        controller: "CarouselController",
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
      })
      .state("loginPage", {
        url: "/login",
        templateUrl: "/templates/login.html",
        controller: "LoginController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
