angular.module('vbiApp')
    .controller('titleController', ['$scope','$controller','$uibModalInstance', 'tabTitle', function($scope, $controller, $uibModalInstance, tabTitle) {
      var homeCtrl = $scope.$new();
      $controller('homeController',{$scope:homeCtrl});

      $scope.setTabTitle = function(title) {
        $uibModalInstance.close();
        if(tabTitle.setType == 1) {
          homeCtrl.createTab(title);
        } else {
          homeCtrl.renameTab(title, tabTitle.tabIndex)
        }
      }
      $scope.closeModal = function() {
        $uibModalInstance.close();
      }
    }]);
