angular.module('vbiApp').controller('editController', ['$scope', 'widgetManager', '$log', 'editManager', function($scope, widgetManager, $log, editManager){
  var tabClasses;

  $scope.tabs = editManager.getTabDetails();

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
            'colWidth': 4
        },{
            'colWidth': 4
        },{
            'colWidth': 4
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

    $log.log($scope.tabs);
  }

  $scope.plotWidget = function() {

  }
}]);
