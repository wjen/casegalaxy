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
        image: "../assets/images/iphone8 (125).jpg",
        title: "HYBRID CASES",
        text: "Dual-Layer Protection",
        sref: "itemsPage"
      },
      {
        image: "../assets/images/1.JPG",
        title: "TPU BUMPER CASES",
        text: "Protection With Style",
        sref: "itemsPage"
      },
      {
        image: "../assets/images/iphone8 (19).jpg",
        title: "PREMIUM WALLET CASES",
        text: "Protection With Convenience",
        sref: "itemsPage"
      }
    ];
  };
})();
