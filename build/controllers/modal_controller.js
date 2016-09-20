(function() {
    'use strict';

    angular.module('caseGalaxy')
        .controller('ModalController', ModalController)
    // $uibModalInstance comes from ui bootstrap
    ModalController.$inject = ["$uibModalInstance"];
    //the close button is calling the close() function
    function ModalController($uibModalInstance) {
      // var vm = this;
      // vm.close = function () {
      //   $uibModalInstance.close();
      // };
    }


}());
