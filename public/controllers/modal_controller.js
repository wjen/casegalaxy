(function () {
    'use strict';

    angular.module('caseGalaxy')
        .controller('ModalCtrl', ['$uibModalInstance', function ($uibModalInstance) {
            var vm = this;

            vm.close = function () {
              $uibModalInstance.close();
            };

        }]);

}());
