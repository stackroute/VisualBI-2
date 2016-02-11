/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan
    * 5. Arun Karthic
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
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
