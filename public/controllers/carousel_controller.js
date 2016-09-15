(function () {
  'use strict'

  angular.module('caseGalaxy')
    .controller('CarouselController', CarouselController);

  CarouselController.$inject = [];

  function CarouselController() {
    var carouselCtrl = this;
    carouselCtrl.myInterval = 4000;
    carouselCtrl.noWrapSlides = false;
    carouselCtrl.active = 0;
    var slides = carouselCtrl.slides = [
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
        image: "https://masetv.com/wp-content/uploads/2014/09/spigen-wallet-case-iphone-6.jpg",
        title: "PREMIUM WALLET CASES",
        text: "Protection With Convenience",
      }
    ];
  };
})();
