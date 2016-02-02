angular.module('vbiApp')
	.controller("ModalGraphController", function($scope, $uibModalInstance, GraphService, graphData, index){
		$scope.graphArray = graphData;
		$scope.index = index;
		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		};
	});