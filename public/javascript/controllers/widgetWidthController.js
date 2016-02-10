angular.module('vbiApp')
    .controller('widthController', ['$scope','$controller','$uibModalInstance', 'widthConfig', function($scope, $controller, $uibModalInstance, widthConfig) {
      var editCtrl = $scope.$new();
      $controller('editController',{$scope:editCtrl});

      $scope.showTitle = function(id) {
        if(id == 0 || id == 2) {
          return true;
        } else {
          return false;
        }
      }

      $scope.showWidth = function(id) {
        if(id == 0 || id == 1) {
          return true;
        } else {
          return false;
        }
      }

      $scope.setWidgetWidth = function(width, title, id) {
        $uibModalInstance.close();
        if(id == 2) {
          editCtrl.renameTitle(widthConfig.widgetId, title);
        } else {
          editCtrl.setWidgetWidth(widthConfig.rowIndex, widthConfig.colIndex, width, widthConfig.columnWidth, title);
        }
      }
      $scope.closeModal = function() {
        $uibModalInstance.close();
      }
      $scope.widthConfig = widthConfig;
    }]);
