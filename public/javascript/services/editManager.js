angular.module('vbiApp').service('editManager', function() {

  var tabDetails;
  var tabIndex;
  var sharedDashboardUserId;
  var newWidgetList = [];

  var setTabDetails = function(tabs, index, sharedId) {
    tabDetails = tabs;
    tabIndex = index;
    sharedDashboardUserId = sharedId;
  };

  var getTabIndex = function() {
    return tabIndex;
  }

  var getTabDetails = function() {
    return tabDetails;
  };

  var getSharedDashboardUserId = function() {
    return sharedDashboardUserId;
  }

  var setWidgetList = function(newData) {
    newWidgetList.push(newData);
  }

  var getWidgetList = function() {
    return newWidgetList;
  }

  var clearWidgetList = function() {
    newWidgetList = [];
  }

  return {
    setTabDetails: setTabDetails,
    getTabDetails: getTabDetails,
    getTabIndex: getTabIndex,
    getSharedDashboardUserId: getSharedDashboardUserId,
    setWidgetList: setWidgetList,
    getWidgetList: getWidgetList,
    clearWidgetList: clearWidgetList
  };
});
