angular.module('vbiApp')
.controller('menuCtrl', function($scope){
var tabClasses;
var curId = 0;

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
curId = tabNum;
tabClasses[tabNum] = "active";
};

$scope.showTab = function(tabId) {
  if(tabId == curId) {
    return true;
  } else {
    return false;
  }
}

$scope.setTab = function(tabId) {
  if(curId == tabId) {
    $scope.setActiveTab(0);
  } else {
    $scope.setActiveTab(tabId);
  }
}

//Initialize
  initTabs();
  $scope.setActiveTab(0);
});
