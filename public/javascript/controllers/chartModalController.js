angular.module('vbiApp').controller('chartModalController', ['$scope', '$uibModalInstance','chartInfo', function($scope, $uibModalInstance, chartInfo) {

    $scope.chartInfo = chartInfo;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
}]);