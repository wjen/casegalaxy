angular.module('caseGalaxy')
.controller('PaginationDemoCtrl', function ($log, $anchorScroll) {
  var paginationCtrl = this;
  paginationCtrl.totalItems = 64;
  paginationCtrl.currentPage = 1;

  paginationCtrl.setPage = function (pageNo) {
    paginationCtrl.currentPage = pageNo;
  };

  paginationCtrl.pageChanged = function() {
    $log.log('Page changed to: ' + paginationCtrl.currentPage);
    $anchorScroll();

  };

  paginationCtrl.maxSize = 5;
  paginationCtrl.bigTotalItems = 75;
  paginationCtrl.bigCurrentPage = 1;
  paginationCtrl.itemsPerPage = 9;
});
