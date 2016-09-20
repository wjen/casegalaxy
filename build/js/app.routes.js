(function () {
  'use strict'

  angular.module("caseGalaxy")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "templates/home.html",
        controller: "CarouselController",
        controllerAs: "carouselCtrl"
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl:  "templates/about.html"
      })
      //used modal instead
      // .state("signUpPage", {
      //   url: "/signup",
      //   templateUrl: "/templates/signup.html",
      //   controller: "UsersController",
      //   controllerAs: "vm"
      // })
      //used modal instead
      // .state("loginPage", {
      //   url: "/login",
      //   templateUrl: "/templates/login.html",
      //   controller: "LoginController",
      //   controllerAs: "vm"
      // })
      .state("itemsPage", {
        url: "/items",
        templateUrl: "templates/items.html",
        controller: "ItemsController",
        controllerAs: "itemCtrl"
      })
      .state("cart", {
        url: "/cart",
        templateUrl: "templates/checkout.html",
        controller: "ShopCartCtrl"
      })
      .state("checkout", {
        url: "/checkout",
        templateUrl: "bower_components/ngCart/template/ngCart/checkout.html",
        controller: "CartController"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
