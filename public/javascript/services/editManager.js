angular.module('vbiApp').service('editManager', function() {

  var tabDetails;
  var tabIndex;
  var sharedDashboardUserId;

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

  return {
    setTabDetails: setTabDetails,
    getTabDetails: getTabDetails,
    getTabIndex: getTabIndex,
    getSharedDashboardUserId: getSharedDashboardUserId
  };
});
