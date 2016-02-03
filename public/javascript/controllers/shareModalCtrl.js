angular.module("vbiApp").controller("shareCtrl",function($scope){
    $scope.containers = [{
          name: 'Can Edit'
        }, {
          name: 'Can Comment'
        }, {
          name: 'Can View'
        }];

        $scope.select = function(container) {
        $scope.selectedItem = container;
      };
});
