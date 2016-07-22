(function () {
  'use strict'

  angular.module('caseGalaxy')
    .controller('CarouselController', CarouselController);

  CarouselController.$inject = [];

  function CarouselController() {
    var vm = this;
    vm.myInterval = 4000;
    vm.noWrapSlides = false;
    vm.active = 0;
    var slides = vm.slides = [
      {
        image: "//i.imgur.com/0oIek4C.jpg?1%3E%3C/div%3E%3Cdiv%20style=",
        title: "HYBRID CASES",
        text: "Dual-Layer Protection",
      },
      {
        image: "http://store.imore.com/images/product_images/accessories/additional_images/18500/large/1.jpg",
        title: "TPU BUMPER CASES",
        text: "Protection With Style",
      },
      {
        image: "//www.androidcentral.com/sites/androidcentral.com/files/styles/xlarge/public/article_images/2015/03/galaxy-s6-spigen-wallet-case-brown-2QL.jpg?itok=MDJQKjhK",
        title: "PREMIUM WALLET CASES",
        text: "Protection With Convenience",
      }
    ];
  };
})();
