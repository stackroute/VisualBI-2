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
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
angular.module('vbiApp').controller('editController', ['$rootScope', '$scope', 'widgetManager', 'editManager', '$http', '$uibModal', '$location', '$window', function($rootScope, $scope, widgetManager, editManager, $http, $uibModal, $location, $window){
  var tabClasses;
  var maxWidth = 12;
  draggerId = 0;

  $scope.getAllTabs = editManager.getTabDetails();
  $scope.tabIndex = editManager.getTabIndex();
  var sharedDashboardUserId = editManager.getSharedDashboardUserId();
  $scope.selectedTab = [];
  $scope.userWidgetItems = [];
  $rootScope.newWidgetList = [];

  if((typeof $scope.getAllTabs === 'undefined') || (typeof $scope.tabIndex === 'undefined')) {
    $location.url('/');
  }

  $scope.selectedTab.push($scope.getAllTabs[$scope.tabIndex]);

  angular.forEach($scope.getAllTabs, function(tab, tabIndex) {
    angular.forEach(tab.rows, function(row, rowIndex) {
      angular.forEach(row.columns, function(col, colIndex) {
        $scope.userWidgetItems.push(col.widgetId);
      });
    });
  });

  $scope.resetPlaceHolder = function(rowId, remainingWidth) {
    var i = $scope.selectedTab[0].rows[rowId].columns.length;
    while (i--) {
      var column = $scope.selectedTab[0].rows[rowId].columns[i];
      remainingWidth -= column.colWidth
    }

    if(remainingWidth > 1) {

        var addColumn = {
            'colWidth': remainingWidth
          };

        $scope.selectedTab[0].rows[rowId].columns.push(addColumn);
    }
  };

  angular.forEach($scope.selectedTab[0].rows, function(row, rowIndex) {
    $scope.resetPlaceHolder(rowIndex, maxWidth);
  });

  widgetManager.getWidget()
    .then(function(widgets) {
      $scope.widgetItems = widgets;
    });

  widgetManager.getAllWidgets()
    .then(function(allWidgets) {
      $scope.allWidgetItems = allWidgets;
    });

  $scope.addRow = function() {
    addNewRow();
  }

  function addNewRow() {
    var newRow = {
        'columns' : [{
            'colWidth': maxWidth
        }]
    };
    $scope.selectedTab[0].rows.push(newRow);
  }

  if($scope.selectedTab[0].rows.length == 0) {
    addNewRow();
  }

  $scope.widthModal = function(event, ui, rowId, colId, col, calledFrom) {

    var widthModalConfig = {
      templateUrl: 'customWidth',
      controller: 'widthController',
      resolve: {
        widthConfig: function() {
          return {
            rowIndex: rowId,
            colIndex: colId,
            columnWidth: col.colWidth,
            setWidth: col.colWidth,
            setTitle: col.widgetId.title,
            calledFor: calledFrom,
            widgetId: col.widgetId._id
          };
        }
      }
    };
    $uibModal.open(widthModalConfig);
  }

  $scope.startDrag = function(event, ui, value) {
    draggerId = value;
  }

  $scope.beforeDrop = function(event, ui, widgetId) {

    if(typeof widgetId === 'undefined' || draggerId === 2) {
      return new Promise(function(resolve, reject){
        resolve('success');
      });
    } else {
      var modalInstance = $uibModal.open({
        templateUrl: 'overwritePopup',
        controller: function ($scope, $uibModalInstance) {
          $scope.ok = function () {
            $uibModalInstance.close();
          };
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

        }
      });
      return modalInstance.result;
    }
  };

  $scope.isExists = function(title) {
    if(typeof title === 'undefined')
      return false;
    else
      return true;
  }

  // setWidgetProps = function(rowId, colId, colWidth, widgetId) {
  //
  //   var widthModalConfig = {
  //     templateUrl: 'customWidth',
  //     controller: 'widthController',
  //     resolve: {
  //       widthConfig: function() {
  //         return {
  //           rowIndex: rowId,
  //           colIndex: colId,
  //           columnWidth: colWidth,
  //           userData: colWidth
  //         };
  //       }
  //     }
  //   };
  //   $uibModal.open(widthModalConfig);
  // }

  $scope.setWidgetWidth = function(rowId, colId, width, columnCurWidth, title) {

    var remainingWidth = maxWidth;
    if(width > maxWidth || width == 0 || width == "") {
      width = maxWidth;
    }

    $scope.selectedTab[0].rows[rowId].columns[colId].colWidth = parseInt(width);
    $scope.selectedTab[0].rows[rowId].columns[colId].widgetId.title = title;

    if($scope.selectedTab[0].rows[rowId].columns[colId].widgetId._id.length == 0) {

      widgetManager.getNewWidgetId()
          .then(function(data) {
            $scope.selectedTab[0].rows[rowId].columns[colId].widgetId._id = data.data;
          }, function(error) {
          });


      $rootScope.newWidgetList.push($scope.selectedTab[0].rows[rowId].columns[colId].widgetId);
    }

    if(width <= columnCurWidth) {
      $scope.resetPlaceHolder(rowId, remainingWidth)
    } else {
      $scope.resizeWidgetWidth(rowId, colId);
    }
  }

  $scope.renameTitle = function(widgetId, title) {
    widgetManager.renameTitle(widgetId, title)
      .then(function() {

      });
  }

  $scope.removeWidget = function(rowIndex, colIndex,colWidth) {
    var newColumn = {
      'colWidth': colWidth
    };
    $scope.selectedTab[0].rows[rowIndex].columns.splice(colIndex, 1, newColumn);
  }

  $scope.resizeWidgetWidth = function(rowId, colId) {
    var len = $scope.selectedTab[0].rows[rowId].columns.length;
    var usedWidth = 0, i=0, newWidth=0, newRowId = rowId;
    var removePosition = [];
    while (i<len) {
      var column = $scope.selectedTab[0].rows[rowId].columns[i];
      if(column.hasOwnProperty('widgetId')) {
        usedWidth += parseInt(column.colWidth);

        if(usedWidth > maxWidth) {

          usedWidth -= parseInt(column.colWidth);

          if(newWidth == 0) {
            newRowId += 1;
            var newRow = {
                'columns' : [column]
            };

            $scope.selectedTab[0].rows.splice(newRowId, 0, newRow);
          } else {
            $scope.selectedTab[0].rows[newRowId].columns.push(column);
          }
          removePosition.push(i);
          newWidth += parseInt(column.colWidth);

          if(newWidth > maxWidth)
            newWidth = 0;
        }
      }
      i++;
    }
    var removeLen = removePosition.length;
    for(var i=removeLen-1; i>=0; i--) {
      $scope.selectedTab[0].rows[rowId].columns.splice(removePosition[i], 1);
    }
  }

  $scope.saveRow = function() {

    angular.forEach($scope.tabs, function(tab, tabIndex) {
      angular.forEach(tab.rows, function(row, rowIndex) {
        var i = $scope.tabs[tabIndex].rows[rowIndex].columns.length;
        while (i--) {
          var column = $scope.tabs[tabIndex].rows[rowIndex].columns[i];
          if(!column.hasOwnProperty('widgetId')) {
              $scope.tabs[tabIndex].rows[rowIndex].columns.splice(i, 1);
          }
        }
        var newLen = $scope.tabs[tabIndex].rows[rowIndex].columns.length;

        if(newLen == 0) {
          $scope.tabs[tabIndex].rows.splice(rowIndex, 1);
        }
      });
    });

    $scope.getAllTabs[$scope.tabIndex] = $scope.selectedTab[0];

    var allparams={
                tabs: $scope.getAllTabs,
                tabIndex: $scope.tabIndex,
                userid: sharedDashboardUserId,
                widgetList: $rootScope.newWidgetList
             };

             widgetManager.saveWidget(allparams);
  }

  $scope.showPanel = function(col) {
    if(typeof col.widgetId === 'undefined') {
      return false;
    } else {
      return true
    }
  }

}]);
