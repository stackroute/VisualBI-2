angular.module('vbiApp').controller('editController', ['$scope', 'widgetManager', '$log', 'editManager', '$http', '$uibModal', '$location', '$window', '$mdDialog', '$q', function($scope, widgetManager, $log, editManager, $http, $uibModal, $location, $window, $mdDialog, $q){
  var tabClasses;
  var maxWidth = 12;

  $scope.tempId = [];
  $scope.getAllTabs = editManager.getTabDetails();
  $scope.tabIndex = editManager.getTabIndex();
  $scope.tabs = [];
  $scope.tabs.push($scope.getAllTabs[$scope.tabIndex]);

  $scope.resetPlaceHolder = function(rowId, remainingWidth) {
    var i = $scope.tabs[0].rows[rowId].columns.length;
    while (i--) {
      var column = $scope.tabs[0].rows[rowId].columns[i];
      remainingWidth -= column.colWidth
    }

    if(remainingWidth > 1) {

        var addColumn = {
            'colWidth': remainingWidth
          };

        $scope.tabs[0].rows[rowId].columns.push(addColumn);
    }
  };

  angular.forEach($scope.tabs[0].rows, function(row, rowIndex) {
    $scope.resetPlaceHolder(rowIndex, maxWidth);
  });

  widgetManager.getWidget()
    .then(function(widgets) {
      $scope.widgetItems = widgets;
    });

  function initTabs() {
    tabClasses = ["","","",""];
  }

  $scope.getTabClass = function (tabNum) {
    return tabClasses[tabNum];
  };

  $scope.getTabPaneClass = function (tabNum) {
    return "tab-pane " + tabClasses[tabNum];
  }

  $scope.setActiveTab = function (tabNum) {
    initTabs();
    tabClasses[tabNum] = "active";
  };

  initTabs();

  $scope.addRow = function() {
    addNewRow();
  }

  function addNewRow() {
    var newRow = {
        'columns' : [{
            'colWidth': maxWidth
        }]
    };
    $scope.tabs[0].rows.push(newRow);
  }

  if($scope.tabs[0].rows.length == 0) {
    addNewRow();
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
      });
    });

    $scope.getAllTabs[$scope.tabIndex] = $scope.tabs[0];

    var params={
                tabs: $scope.getAllTabs
             };

    $http({
        url: "/user/savetab",
        method: "POST",
        data: params,
        headers : {
            'Content-Type': 'application/json'
        }
    }).success(function successCallback(data, status) {
        console.log('Post successful');
        $location.url('/');
    }, function errorCallback(response) {
        console.log('Post failed');
    });
  }

  $scope.widthModal = function(event, ui, rowId, colId, colWidth) {

    var widthModalConfig = {
      templateUrl: 'customWidth',
      controller: 'widthController',
      resolve: {
        widthConfig: function() {
          return {
            rowIndex: rowId,
            colIndex: colId,
            columnWidth: colWidth,
            userData: colWidth
          };
        }
      }
    };
    $uibModal.open(widthModalConfig);
  }

  $scope.beforeDrop = function(event, ui, widgetId) {
    var deferred = $q.defer();
    var res = true;

    if(typeof widgetId !== "undefined") {
      res = confirm('Are you sure you want to overwrite the widget???');
    }
    if (res) {
      deferred.resolve();
    } else {
      deferred.reject();
    }
    return deferred.promise;
  };

  setWidgetProps = function(rowId, colId, colWidth, widgetId) {

    var widthModalConfig = {
      templateUrl: 'customWidth',
      controller: 'widthController',
      resolve: {
        widthConfig: function() {
          return {
            rowIndex: rowId,
            colIndex: colId,
            columnWidth: colWidth,
            userData: colWidth
          };
        }
      }
    };
    $uibModal.open(widthModalConfig);
  }

  $scope.setWidgetWidth = function(rowId, colId, width, columnCurWidth) {

    var remainingWidth = maxWidth;
    if(width > maxWidth || width == 0 || width == "") {
      width = maxWidth;
    }

    $scope.tabs[0].rows[rowId].columns[colId].colWidth = parseInt(width);

    if(width <= columnCurWidth) {
      $scope.resetPlaceHolder(rowId, remainingWidth)
    } else {
      $scope.resizeWidgetWidth(rowId, colId);
    }
  }

  $scope.removeWidget = function(rowIndex, colIndex,colWidth) {
    var newColumn = {
      'colWidth': colWidth
    };
    $scope.tabs[0].rows[rowIndex].columns.splice(colIndex, 1, newColumn);
  }

  $scope.resizeWidgetWidth = function(rowId, colId) {
    var len = $scope.tabs[0].rows[rowId].columns.length;
    var usedWidth = 0, i=0, newWidth=0, newRowId = rowId;
    var removePosition = [];
    while (i<len) {
      var column = $scope.tabs[0].rows[rowId].columns[i];
      if(column.hasOwnProperty('widgetId')) {
        usedWidth += parseInt(column.colWidth);

        if(usedWidth > maxWidth) {

          usedWidth -= parseInt(column.colWidth);

          if(newWidth == 0) {
            newRowId += 1;
            var newRow = {
                'columns' : [column]
            };

            $scope.tabs[0].rows.splice(newRowId, 0, newRow);
          } else {
            $scope.tabs[0].rows[newRowId].columns.push(column);
          }
          removePosition.push(i);
          newWidth += parseInt(column.colWidth);

          if(newWidth > maxWidth)
            newWidth = 0;
        }
      }
      i++;
    }

    console.log(removePosition);
    var removeLen = removePosition.length;
    for(var i=removeLen-1; i>=0; i--) {
      console.log(removePosition[i]);
      $scope.tabs[0].rows[rowId].columns.splice(removePosition[i], 1);
    }

    console.log($scope.tabs[0].rows);
  }
}]);

angular.module('vbiApp')
    .controller('widthController', ['$scope','$controller','$uibModalInstance', 'widthConfig', function($scope, $controller, $uibModalInstance, widthConfig) {
      var editCtrl = $scope.$new();
      $controller('editController',{$scope:editCtrl});

      $scope.setWidgetWidth = function(width) {
        $uibModalInstance.close();
        editCtrl.setWidgetWidth(widthConfig.rowIndex, widthConfig.colIndex, width, widthConfig.columnWidth);
      }
      $scope.closeModal = function() {
        $uibModalInstance.close();
      }
      $scope.widthConfig = widthConfig;
    }]);
