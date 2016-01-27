angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance','chartInfo', function($scope, $uibModalInstance, chartInfo) {
//	console.log($scope.chartInfo);
      // in controller
    
//    static data for timeline view
          $scope.events = [{
            badgeClass: 'info',
            badgeIconClass: 'glyphicon-check',
            title: 'First heading',
            content: 'Some comment.'
          }, {
            badgeClass: 'warning',
            badgeIconClass: 'glyphicon-credit-card',
            title: 'Second heading',
            content: 'Reply to comment.'
          }];
    
    
	$scope.chartInfo = chartInfo;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);