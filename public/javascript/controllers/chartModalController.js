angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance', 'chartInfo', function($scope, $uibModalInstance, chartInfo) {
//	console.log($scope.chartInfo);
	$scope.chartInfo = chartInfo;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);